// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  document.body.appendChild(container);
  return container;
}

// Add toast styles
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  .toast {
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  }
  
  .toast.show {
    opacity: 1;
    transform: translateX(0);
  }
  
  .toast-success {
    background-color: #10b981;
    color: white;
  }
  
  .toast-error {
    background-color: #ef4444;
    color: white;
  }
  
  .toast-info {
    background-color: #3b82f6;
    color: white;
  }
  
  .toast-warning {
    background-color: #f59e0b;
    color: white;
  }
`;
document.head.appendChild(toastStyle);

// Category Icons
const categoryIcons = {
    'Financial Assets': '💰',
    'Real Estate': '🏠',
    'Digital Assets': '💻',
    'Personal Property': '👔',
    'Business Interests': '💼',
    'Intellectual Property': '🎨'
};

const relationshipIcons = {
    'Spouse': '💑',
    'Child': '👶',
    'Parent': '👨‍👩',
    'Sibling': '👫',
    'Friend': '👥',
    'Attorney': '⚖️',
    'Executor': '📋',
    'Advisor': '💼'
};

let people = [];

let assets = [];

let documents = [];

const knowledgeBase = [];

// Initialize
async function loadDataFromAPI() {
    try {
        console.log('Loading data from API...');
        const response = await fetch('/api/v1/data');
        const result = await response.json();
        
        if (result.success && result.data) {
            // Load people data
            if (result.data.people && Array.isArray(result.data.people)) {
                people = result.data.people;
            }
            
            // Load assets data
            if (result.data.assets && Array.isArray(result.data.assets)) {
                assets = result.data.assets.map(asset => ({
                    ...asset,
                    icon: categoryIcons[asset.category] || '📦'
                }));
            }
            
            // Load documents data
            if (result.data.documents && Array.isArray(result.data.documents)) {
                documents = result.data.documents;
            }
            
            // Load knowledge base data
            if (result.data.knowledgeBase && Array.isArray(result.data.knowledgeBase)) {
                knowledgeBase = result.data.knowledgeBase.map(item => ({
                    ...item,
                    icon: categoryIcons[item.category] || '📚'
                }));
            }
            
            console.log('✅ Data loaded successfully from API');
        }
    } catch (error) {
        console.warn('Could not load data from API, using local data:', error.message);
        // Continue with existing local data if API fails
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    initializeNavigation();
    await loadDataFromAPI();
    renderDashboard();
    renderAssets();
    renderPeople();
    renderDocuments();
    renderKnowledgeBase();
    initializeSearch();
});

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const screen = this.dataset.screen;
            showScreen(screen);

            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');

        // Update page title
        const titles = {
            'home': 'Dashboard',
            'assets': 'Assets',
            'people': 'People',
            'documents': 'Documents',
            'services': 'Services',
            'knowledgebase': 'Knowledge Base',
            'settings': 'Settings'
        };
        document.getElementById('pageTitle').textContent = titles[screenName] || 'Dashboard';
    }
}

// Dashboard
function renderDashboard() {
    // Update stats
    document.getElementById('totalAssets').textContent = assets.length;
    document.getElementById('totalLocations').textContent = new Set(assets.map(a => a.country)).size;
    document.getElementById('totalPeople').textContent = people.length;
    document.getElementById('totalDocuments').textContent = documents.length;

    // Category breakdown
    const categoryBreakdown = {};
    assets.forEach(asset => {
        categoryBreakdown[asset.category] = (categoryBreakdown[asset.category] || 0) + 1;
    });

    const categoryContainer = document.getElementById('categoryBreakdown');
    categoryContainer.innerHTML = Object.entries(categoryBreakdown)
        .map(([category, count]) => `
            <div class="category-item">
                <div class="category-info">
                    <span class="category-icon">${categoryIcons[category] || '📦'}</span>
                    <span class="category-name">${category}</span>
                </div>
                <span class="category-count">${count}</span>
            </div>
        `).join('');

    // Recent activity
    const recentActivity = document.getElementById('recentActivity');
    recentActivity.innerHTML = `
        <div class="activity-item">
            <div class="activity-icon">💰</div>
            <div class="activity-content">
                <div class="activity-title">Chase Account - Added as inheritor</div>
                <div class="activity-time">2 days ago</div>
            </div>
        </div>
        <div class="activity-item">
            <div class="activity-icon">👤</div>
            <div class="activity-content">
                <div class="activity-title">Jane Smith - Added as person</div>
                <div class="activity-time">3 days ago</div>
            </div>
        </div>
        <div class="activity-item">
            <div class="activity-icon">🏠</div>
            <div class="activity-content">
                <div class="activity-title">Family Home - Asset details updated</div>
                <div class="activity-time">1 week ago</div>
            </div>
        </div>
    `;
}

// Assets
function renderAssets(filter = '') {
    const tbody = document.getElementById('assetsTableBody');
    const filteredAssets = assets.filter(asset => {
        const matchesSearch = filter === '' ||
            asset.name.toLowerCase().includes(filter.toLowerCase()) ||
            asset.category.toLowerCase().includes(filter.toLowerCase()) ||
            asset.type.toLowerCase().includes(filter.toLowerCase());

        const categoryFilter = document.getElementById('categoryFilter')?.value || '';
        const matchesCategory = categoryFilter === '' || asset.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    tbody.innerHTML = filteredAssets.map(asset => `
        <tr>
            <td>
                <div class="table-cell-with-icon">
                    <span class="table-icon">${categoryIcons[asset.category] || '📦'}</span>
                    <strong>${asset.name}</strong>
                </div>
            </td>
            <td>${asset.category}</td>
            <td>${asset.type}</td>
            <td>${asset.country}</td>
            <td>${asset.inheritor}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" onclick="editAsset(${asset.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                    </button>
                    <button class="btn-icon delete" onclick="deleteAsset(${asset.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddAssetForm() {
    document.getElementById('assetModalTitle').textContent = 'Add New Asset';
    document.getElementById('assetForm').reset();
    document.getElementById('assetId').value = '';
    populateAssetRoleSelects();
    openModal('assetModal');
}

function editAsset(id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    document.getElementById('assetModalTitle').textContent = 'Edit Asset';
    document.getElementById('assetId').value = asset.id;
    document.getElementById('assetName').value = asset.name;
    document.getElementById('assetCategory').value = asset.category;
    document.getElementById('assetType').value = asset.type;
    document.getElementById('assetCountry').value = asset.country;
    document.getElementById('assetDescription').value = asset.description;
    document.getElementById('assetAccessDetails').value = asset.accessDetails;

    populateAssetRoleSelects();
    document.getElementById('assetInheritor').value = asset.inheritor;
    document.getElementById('assetExecutor').value = asset.executor;
    document.getElementById('assetRecipient').value = asset.recipient;

    openModal('assetModal');
}

function deleteAsset(id) {
    const asset = assets.find(a => a.id == id); // Use == instead of === for flexible comparison
    
    if (!asset) {
        showToast('Asset not found', 'error');
        return;
    }
    
    showConfirmModal(
        'Delete Asset',
        `Are you sure you want to delete "${asset.name}"? This action cannot be undone.`,
        async () => {
            try {
                // Remove from local array
                assets = assets.filter(a => a.id != id); // Use != instead of !== for flexible comparison
                
                // Save updated assets to API (which will replace all assets with current array)
                const response = await fetch('/api/v1/assets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(assets)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to delete asset');
                }

                renderAssets();
                renderDashboard();
                closeModal('confirmModal');
                showToast('Asset deleted successfully!', 'success');
                console.log('Asset deleted from Google Sheets');
            } catch (error) {
                console.error('Error deleting asset:', error);
                showToast('Error deleting asset: ' + error.message, 'error');
                // Reload data in case of error
                location.reload();
            }
        }
    );
}

function populateAssetRoleSelects() {
    const options = '<option value="">Select person...</option>' +
        people.map(p => {
            const icon = relationshipIcons[p.relationship] || '👤';
            return `<option value="${p.name}">${icon} ${p.name} (${p.relationship})</option>`;
        }).join('');

    document.getElementById('assetInheritor').innerHTML = options;
    document.getElementById('assetExecutor').innerHTML = options;
    document.getElementById('assetRecipient').innerHTML = options;
}

// People
function renderPeople(filter = '') {
    const tbody = document.getElementById('peopleTableBody');
    const filteredPeople = people.filter(p =>
        filter === '' ||
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.email.toLowerCase().includes(filter.toLowerCase())
    );

    tbody.innerHTML = filteredPeople.map(person => {
        const icon = relationshipIcons[person.relationship] || '👤';
        return `
        <tr>
            <td>
                <div class="table-cell-with-icon">
                    <div class="table-avatar">${person.name.charAt(0)}</div>
                    <strong>${person.name}</strong>
                </div>
            </td>
            <td>${icon} ${person.relationship}</td>
            <td>${person.email}</td>
            <td>${person.phone}</td>
            <td>${person.country}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" onclick="editPerson(${person.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                    </button>
                    <button class="btn-icon delete" onclick="deletePerson(${person.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    `}).join('');
}

function showAddPersonForm() {
    document.getElementById('personModalTitle').textContent = 'Add New Person';
    document.getElementById('personForm').reset();
    document.getElementById('personId').value = '';
    openModal('personModal');
}

function editPerson(id) {
    const person = people.find(p => p.id === id);
    if (!person) return;

    document.getElementById('personModalTitle').textContent = 'Edit Person';
    document.getElementById('personId').value = person.id;
    document.getElementById('personName').value = person.name;
    document.getElementById('personRelationship').value = person.relationship;
    document.getElementById('personEmail').value = person.email;
    document.getElementById('personPhone').value = person.phone;
    document.getElementById('personCountry').value = person.country;
    document.getElementById('personNotes').value = person.notes;

    openModal('personModal');
}

function deletePerson(id) {
    const person = people.find(p => p.id == id); // Use == instead of === for flexible comparison
    
    if (!person) {
        showToast('Person not found', 'error');
        return;
    }
    
    showConfirmModal(
        'Delete Person',
        `Are you sure you want to delete "${person.name}"? This action cannot be undone.`,
        async () => {
            try {
                // Remove from local array
                people = people.filter(p => p.id != id); // Use != instead of !== for flexible comparison
                
                // Save updated people to API (which will replace all people with current array)
                const response = await fetch('/api/v1/people', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(people)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to delete person');
                }

                renderPeople();
                renderDashboard();
                closeModal('confirmModal');
                showToast('Person deleted successfully!', 'success');
                console.log('Person deleted from Google Sheets');
            } catch (error) {
                console.error('Error deleting person:', error);
                showToast('Error deleting person: ' + error.message, 'error');
                // Reload data in case of error
                location.reload();
            }
        }
    );
}

// Documents
function renderDocuments() {
    const tbody = document.getElementById('documentsTableBody');
    tbody.innerHTML = documents.map(doc => `
        <tr>
            <td><strong>${doc.name}</strong></td>
            <td>${doc.sharedWith}</td>
            <td><span class="info-badge">${doc.accessLevel}</span></td>
            <td>${doc.lastModified}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" onclick="alert('This would open the Google Sheet in a new tab')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        View
                    </button>
                    <button class="btn-icon delete" onclick="removeDocumentAccess('${doc.name}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Remove
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function removeDocumentAccess(docName) {
    showConfirmModal(
        'Remove Document Access',
        `Remove access to "${docName}"? The recipient will no longer be able to view this document.`,
        () => {
            alert('Document access removed (demo only)');
            closeModal('confirmModal');
        }
    );
}

// Knowledge Base
function renderKnowledgeBase(filter = '') {
    const grid = document.getElementById('knowledgeGrid');
    const categoryFilter = document.getElementById('knowledgeCategoryFilter')?.value || '';

    const filteredKnowledge = knowledgeBase.filter(item => {
        const matchesSearch = filter === '' ||
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.description.toLowerCase().includes(filter.toLowerCase());

        const matchesCategory = categoryFilter === '' || item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    grid.innerHTML = filteredKnowledge.map(item => `
        <div class="knowledge-card">
            <div class="knowledge-header">
                <span class="knowledge-icon">${item.icon}</span>
                <h4 class="knowledge-title">${item.name}</h4>
            </div>
            <div class="knowledge-category">${item.category}</div>
            <p class="knowledge-description">${item.description}</p>
            <p class="knowledge-description" style="margin-top: var(--spacing-md); font-weight: var(--font-weight-medium);">
                <strong>Reclamation:</strong> ${item.reclamation}
            </p>
        </div>
    `).join('');
}

// Search functionality
function initializeSearch() {
    document.getElementById('assetSearch')?.addEventListener('input', (e) => {
        renderAssets(e.target.value);
    });

    document.getElementById('categoryFilter')?.addEventListener('change', () => {
        const searchValue = document.getElementById('assetSearch')?.value || '';
        renderAssets(searchValue);
    });

    document.getElementById('peopleSearch')?.addEventListener('input', (e) => {
        renderPeople(e.target.value);
    });

    document.getElementById('knowledgeSearch')?.addEventListener('input', (e) => {
        renderKnowledgeBase(e.target.value);
    });

    document.getElementById('knowledgeCategoryFilter')?.addEventListener('change', () => {
        const searchValue = document.getElementById('knowledgeSearch')?.value || '';
        renderKnowledgeBase(searchValue);
    });
}

// Form submissions
document.getElementById('assetForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('assetId').value;
    const assetId = id ? parseInt(id) : Date.now().toString();
    
    const assetData = {
        id: assetId,
        name: document.getElementById('assetName').value,
        category: document.getElementById('assetCategory').value,
        type: document.getElementById('assetType').value,
        country: document.getElementById('assetCountry').value,
        description: document.getElementById('assetDescription').value,
        accessDetails: document.getElementById('assetAccessDetails').value,
        inheritor: document.getElementById('assetInheritor').value,
        executor: document.getElementById('assetExecutor').value,
        recipient: document.getElementById('assetRecipient').value
    };

    try {
        // Save to Google Sheets via API
        const response = await fetch('/api/v1/assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([assetData])
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to save asset to Google Sheets');
        }

        const result = await response.json();
        console.log('Asset saved to Google Sheets:', result);

        // Update local array for UI
        const assetWithIcon = {
            ...assetData,
            icon: categoryIcons[assetData.category] || '📦'
        };

        if (id) {
            const index = assets.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                assets[index] = assetWithIcon;
            }
        } else {
            assets.push(assetWithIcon);
        }

        renderAssets();
        renderDashboard();
        closeModal('assetModal');
        showToast('Asset saved successfully to Google Sheets!', 'success');
    } catch (error) {
        console.error('Error saving asset:', error);
        showToast('Error saving asset: ' + error.message, 'error');
    }
});

document.getElementById('personForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('personId').value;
    const personId = id ? parseInt(id) : Date.now().toString();
    
    const personData = {
        id: personId,
        name: document.getElementById('personName').value,
        relationship: document.getElementById('personRelationship').value,
        email: document.getElementById('personEmail').value,
        phone: document.getElementById('personPhone').value,
        country: document.getElementById('personCountry').value,
        notes: document.getElementById('personNotes').value
    };

    try {
        // Save to Google Sheets via API
        const response = await fetch('/api/v1/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([personData])
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to save person to Google Sheets');
        }

        const result = await response.json();
        console.log('Person saved to Google Sheets:', result);

        // Update local array for UI
        const personWithId = {
            ...personData
        };

        if (id) {
            const index = people.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                people[index] = personWithId;
            }
        } else {
            people.push(personWithId);
        }

        renderPeople();
        renderDashboard();
        closeModal('personModal');
        showToast('Person saved successfully to Google Sheets!', 'success');
    } catch (error) {
        console.error('Error saving person:', error);
        showToast('Error saving person: ' + error.message, 'error');
    }
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showConfirmModal(title, message, onConfirm) {
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    document.getElementById('confirmModalBtn').onclick = onConfirm;
    openModal('confirmModal');
}

// Settings functions
function confirmResetData() {
    showConfirmModal(
        'Reset All Data',
        'This will permanently delete all assets, people, and documents. This action cannot be undone. Are you absolutely sure?',
        () => {
            assets = [];
            people = [];
            documents = [];
            renderAssets();
            renderPeople();
            renderDocuments();
            renderDashboard();
            closeModal('confirmModal');
            alert('All data has been reset (demo only)');
        }
    );
}

function confirmDeleteAccount() {
    showConfirmModal(
        'Delete Account',
        'This will permanently delete your account and all associated data. This action cannot be undone. Are you absolutely sure?',
        () => {
            closeModal('confirmModal');
            alert('Account deletion requested (demo only). In production, this would delete your account.');
        }
    );
}

// Close modals when clicking outside
window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
