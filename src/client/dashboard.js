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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
    background-color: #1a1a1a;
    color: white;
    border: 1px solid #333;
  }
  
  .toast.show {
    opacity: 1;
    transform: translateX(0);
  }
  
  .toast-success {
    background-color: #1a1a1a;
    color: white;
    border-left: 4px solid #10b981;
  }
  
  .toast-error {
    background-color: #1a1a1a;
    color: white;
    border-left: 4px solid #ef4444;
  }
  
  .toast-info {
    background-color: #1a1a1a;
    color: white;
    border-left: 4px solid #3b82f6;
  }
  
  .toast-warning {
    background-color: #1a1a1a;
    color: white;
    border-left: 4px solid #f59e0b;
  }
`;
document.head.appendChild(toastStyle);

// Relationship Icons
const relationshipIcons = {
    "Spouse": "💍",
    "Child": "👶",
    "Parent": "👴",
    "Sibling": "👫",
    "Partner": "❤️",
    "Friend": "🤝",
    "Attorney": "⚖️",
    "Advisor": "💼",
    "Other": "👤"
};

// Category Icons
const categoryIcons = {
    "Financial Assets": "💰",
    "Real Estate": "🏠",
    "Digital Assets": "💻",
    "Personal Property": "💎",
    "Business Interests": "💼",
    "Intellectual Property": "💡",
    "Other": "📦"
};

// Sub-Category Icons
const subCategoryIcons = {
    // Financial Assets
    "Bank Account": "🏦",
    "Investment Account": "📈",
    "Retirement Fund": "🏖️",
    "Insurance Policy": "🛡️",
    "Cryptocurrency": "🪙",
    "Cash": "💵",
    "Credit Card": "💳",
    "Retirement Account": "🏖️",
    "Life Insurance": "🛡️",

    // Real Estate
    "Residential Property": "🏡",
    "Commercial Property": "🏢",
    "Industrial Property": "🏭",
    "Land": "🏞️",
    "Vacation Home": "🏖️",

    // Digital Assets
    "Cryptocurrency Wallet": "🪙",
    "Domain Names": "🌐",
    "Social Media Accounts": "📱",
    "Cloud Storage": "☁️",
    "NFTs": "🖼️",
    "Code Repository": "👨‍💻",
    "Email Account": "📧",

    // Personal Property
    "Vehicle": "🚗",
    "Jewelry": "💍",
    "Art & Collectibles": "🎨",
    "Furniture": "🛋️",
    "Electronics": "🔌",
    "Watch": "⌚",
    "Art": "🎨",
    "Collectibles": "🧸",

    // Business Interests
    "Company Shares": "📊",
    "Partnership Interest": "🤝",
    "Sole Proprietorship": "👤",
    "Franchise": "🏪",
    "LLC": "🏢",
    "Corporation": "🏭",

    // Intellectual Property
    "Patents": "📜",
    "Trademarks": "™️",
    "Copyrights": "©️",
    "Trade Secrets": "🔐",
    "Patent": "📜",
    "Copyright": "©️",
    "Trademark": "™️"
};

const relationshipIconsExtended = {
    "Spouse": "💍",
    "Partner": "❤️",
    "Child": "👶",
    "Parent": "👴",
    "Sibling": "👫",
    "Friend": "🤝",
    "Attorney": "⚖️",
    "Advisor": "💼",
    "Executor": "📜",
    "Trustee": "🏛️",
    "Colleague": "👔",
    "Other": "👤"
};

const countryIcons = {
    "USA": "🇺🇸",
    "United States": "🇺🇸",
    "UK": "🇬🇧",
    "United Kingdom": "🇬🇧",
    "India": "🇮🇳",
    "Canada": "🇨🇦",
    "Australia": "🇦🇺",
    "Germany": "🇩🇪",
    "France": "🇫🇷",
    "Japan": "🇯🇵",
    "China": "🇨🇳",
    "Singapore": "🇸🇬",
    "UAE": "🇦🇪",
    "Switzerland": "🇨🇭",
    "Global": "🌍",
    "Other": "🏳️"
};

let assets = [
    {
        id: 1,
        name: "Chase Business Checking",
        category: "Financial Assets",
        type: "Bank Account",
        country: "USA",
        inheritor: "Jane Smith",
        description: "Primary business account",
        accessDetails: "Account #123456789, routing #021000021",
        icon: "💰"
    },
    {
        id: 2,
        name: "Family Home",
        category: "Real Estate",
        type: "Residential Property",
        country: "USA",
        inheritor: "Jane Smith",
        description: "Primary residence",
        accessDetails: "123 Main St, Springfield, IL 62701",
        icon: "🏠"
    },
    {
        id: 3,
        name: "Apple Stock Portfolio",
        category: "Financial Assets",
        type: "Investment Account",
        country: "USA",
        inheritor: "John Jr.",
        description: "Brokerage account with stocks",
        accessDetails: "Fidelity account #789456123",
        icon: "💰"
    }
];

let people = [
    {
        id: 1,
        name: "Jane Smith",
        relationship: "Spouse",
        email: "jane.smith@example.com",
        phone: "+1 (555) 123-4567",
        country: "USA",
        notes: "Primary beneficiary"
    },
    {
        id: 2,
        name: "John Jr.",
        relationship: "Child",
        email: "john.jr@example.com",
        phone: "+1 (555) 234-5678",
        country: "USA",
        notes: "Secondary beneficiary"
    },
    {
        id: 3,
        name: "Michael Chen",
        relationship: "Attorney",
        email: "mchen@law.com",
        phone: "+1 (555) 345-6789",
        country: "USA",
        notes: "Estate planning attorney"
    }
];

let documents = [
    {
        id: 1,
        name: "Master Asset Inventory",
        sharedWith: "Jane Smith, John Jr.",
        accessLevel: "View Only",
        lastModified: "2025-11-20",
        url: "#"
    },
    {
        id: 2,
        name: "Estate Planning Guide",
        sharedWith: "Michael Chen",
        accessLevel: "Editor",
        lastModified: "2025-11-15",
        url: "#"
    }
];

let sharedItems = [
    {
        id: 1,
        name: "Smith Family Trust Assets",
        owner: "Robert Smith",
        description: "Complete asset inventory shared with you",
        accessLevel: "View Only",
        lastModified: "2025-11-22",
        sharedDate: "2025-11-20"
    },
    {
        id: 2,
        name: "Johnson Estate Portfolio",
        owner: "Margaret Johnson",
        description: "Real estate and investment portfolio",
        accessLevel: "View Only",
        lastModified: "2025-11-18",
        sharedDate: "2025-11-15"
    },
    {
        id: 3,
        name: "Digital Assets Inventory",
        owner: "David Chen",
        description: "Social media, crypto wallets, and accounts",
        accessLevel: "View Only",
        lastModified: "2025-11-10",
        sharedDate: "2025-11-05"
    }
];

let knowledgeBase = {
    "asset_types": [
        {
            "name": "Financial Institution",
            "description": "Financial institutions are entities that provide banking, investment, loan, or insurance products and services essential to economic development and asset management. They are central to the handling of money for individuals and businesses.",
            "sub_types": [
                {
                    "name": "Bank",
                    "description": "Banks are licensed institutions that accept deposits, provide checking and savings accounts, offer loans, and facilitate financial transactions for the public and businesses."
                },
                {
                    "name": "Non-Banking Financial Company (NBFC)",
                    "description": "NBFCs provide financial services like loans, asset financing, investment products, and insurance but do not hold a full banking license, often specializing in certain financial activities or customer segments."
                },
                {
                    "name": "Insurance Company",
                    "description": "Insurance companies provide coverage against specific risks such as health, property, or life, collecting premiums and offering financial protection through policies."
                },
                {
                    "name": "Mutual Fund",
                    "description": "Mutual funds pool money from investors to purchase a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers."
                }
            ]
        },
        {
            "name": "Real Estate",
            "description": "Real estate assets relate to land and any structures attached to it, such as buildings. These assets can serve residential, commercial, industrial, or agricultural purposes and are significant for wealth creation and infrastructure.",
            "sub_types": [
                {
                    "name": "Residential Property",
                    "description": "Residential properties include houses, apartments, condos, and other dwellings designed for people to live in."
                },
                {
                    "name": "Commercial Property",
                    "description": "Commercial properties are used for business activities, such as office buildings, shopping centers, hotels, and retail outlets."
                },
                {
                    "name": "Industrial Property",
                    "description": "Industrial properties are used for manufacturing, warehousing, logistics, or research and development activities."
                },
                {
                    "name": "Land",
                    "description": "Raw or undeveloped land may be used for agriculture, future construction, or investment."
                }
            ]
        },
        {
            "name": "Legal Document",
            "description": "Legal documents are formal records that establish, govern, or clarify legal rights and obligations. They are critical in business, property, and personal affairs.",
            "sub_types": [
                {
                    "name": "Contract",
                    "description": "Contracts are agreements between parties that create legally binding obligations, outlining responsibilities and remedies."
                },
                {
                    "name": "Deed",
                    "description": "Deeds are documents evidencing the transfer or creation of legal rights in property, often relating to real estate."
                },
                {
                    "name": "Will",
                    "description": "A will is a legal statement of an individual's wishes regarding distribution of assets after death."
                },
                {
                    "name": "Affidavit",
                    "description": "Affidavits are written sworn statements used as evidence in legal proceedings."
                }
            ]
        }
    ],
    "people": [
        {
            "name": "Relationships",
            "description": "Family members and trusted individuals who play a role in your life and asset management.",
            "sub_types": [
                { "name": "Spouse", "description": "Your legally married partner." },
                { "name": "Child", "description": "Your biological or adopted son or daughter." },
                { "name": "Parent", "description": "Your mother or father." },
                { "name": "Sibling", "description": "Your brother or sister." },
                { "name": "Partner", "description": "Your domestic or romantic partner." },
                { "name": "Friend", "description": "A trusted friend." },
                { "name": "Other", "description": "Any other relationship." }
            ]
        },
        {
            "name": "Legal Functionaries",
            "description": "Professionals who assist with legal and financial matters.",
            "sub_types": [
                { "name": "Attorney", "description": "A lawyer who provides legal advice and representation." },
                { "name": "Advisor", "description": "A financial advisor or planner." },
                { "name": "Notary Public", "description": "An official who authenticates documents." },
                { "name": "Judge", "description": "A public officer appointed to decide cases in a law court." },
                { "name": "Company Secretary", "description": "An officer responsible for compliance and governance." }
            ]
        }
    ],
    "geographies": [
        {
            "name": "India",
            "description": "India has a mixed legal and financial system based on common law with specific regulatory frameworks for banking, finance, property transactions, and legal documentation.",
            "icon": "🇮🇳"
        },
        {
            "name": "Canada",
            "description": "Canada combines common law (except Quebec's civil law) with modern regulatory systems, offering a robust environment for finance, real estate, and legal processes.",
            "icon": "🇨🇦"
        },
        {
            "name": "United Kingdom",
            "description": "The UK has a long-established common law system and mature markets for finance, real estate, and legal services, with well-defined legal document and asset handling.",
            "icon": "🇬🇧"
        },
        {
            "name": "United States",
            "description": "The USA has a federal system with common law roots, advanced financial and real estate markets, and diverse legal and regulatory practices across states.",
            "icon": "🇺🇸"
        },
        {
            "name": "Australia",
            "description": "Australia operates under common law and offers vigorous financial, property, and legal frameworks, supported by national and state regulations.",
            "icon": "🇦🇺"
        },
        {
            "name": "New Zealand",
            "description": "New Zealand has a common law heritage and modernized frameworks for finance, real estate, and legal proceedings, ensuring transparency in asset management.",
            "icon": "🇳🇿"
        }
    ]
};

// Sub-Category Mapping for Dynamic Dropdowns
const subCategoryMap = {
    "Financial Assets": ["Bank Account", "Investment Account", "Retirement Fund", "Insurance Policy", "Cryptocurrency", "Cash", "Credit Card", "Retirement Account", "Life Insurance", "Other"],
    "Real Estate": ["Residential Property", "Commercial Property", "Industrial Property", "Land", "Vacation Home", "Other"],
    "Digital Assets": ["Cryptocurrency Wallet", "Domain Names", "Social Media Accounts", "Cloud Storage", "NFTs", "Code Repository", "Email Account", "Other"],
    "Personal Property": ["Vehicle", "Jewelry", "Art & Collectibles", "Furniture", "Electronics", "Watch", "Art", "Collectibles", "Other"],
    "Business Interests": ["Company Shares", "Partnership Interest", "Sole Proprietorship", "Franchise", "LLC", "Corporation", "Other"],
    "Intellectual Property": ["Patents", "Trademarks", "Copyrights", "Trade Secrets", "Patent", "Copyright", "Trademark", "Other"],
    "Other": ["Other"]
};


// Initialize
async function loadDataFromAPI() {
    try {
        const response = await fetch('/api/v1/data');
        if (!response.ok) {
            console.error('API error:', response.status);
            throw new Error(`API error: ${response.status}`);
        }
        const result = await response.json();
        
        if (result.success && result.data) {
            // Load people data from API
            if (result.data.people && Array.isArray(result.data.people) && result.data.people.length > 0) {
                people = result.data.people;
            }
            
            // Load assets data from API
            if (result.data.assets && Array.isArray(result.data.assets) && result.data.assets.length > 0) {
                assets = result.data.assets.map(asset => ({
                    ...asset,
                    icon: categoryIcons[asset.category] || '📦'
                }));
            }
            
            // Load documents data from API
            if (result.data.documents && Array.isArray(result.data.documents) && result.data.documents.length > 0) {
                documents = result.data.documents;
            }
            
            // NOTE: sharedItems and knowledgeBase are always loaded from local constants, never from API
        }
    } catch (error) {
        console.error('Error loading data from API:', error);
        // Continue with existing local data if API fails
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        initializeNavigation();
        await loadDataFromAPI();
        renderDashboard();
        renderAssets();
        renderPeople();
        renderDocuments();
        renderSharedItems();
        renderKnowledgeBase();
        initializeSearch();
        initializeDropdownHandlers();
        
        // Handle route-based navigation
        const pathname = window.location.pathname;
        if (pathname === '/dashboard') {
            showScreen('home');
        }
        
        setTimeout(() => {
            const welcomeModal = document.getElementById('demoWelcomeModal');
            if (welcomeModal) {
                welcomeModal.classList.add('active');
            }
        }, 500);
    } catch (error) {
        console.error('Error during page initialization:', error);
    }
    
    // Form event listeners - must be inside DOMContentLoaded to ensure DOM is ready
    document.getElementById('assetForm')?.addEventListener('submit', async function (e) {
        e.preventDefault();

        const id = document.getElementById('assetId').value;
        const assetId = id ? id : Date.now().toString();
        
        const assetData = {
            id: assetId,
            name: document.getElementById('assetName').value,
            category: document.getElementById('assetCategory').value,
            type: document.getElementById('assetSubCategory').value,
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

            // Update local array for UI
            const assetWithIcon = {
                ...assetData,
                icon: categoryIcons[assetData.category] || '📦'
            };

            if (id) {
                const index = assets.findIndex(a => String(a.id) === String(id));
                if (index !== -1) {
                    assets[index] = assetWithIcon;
                } else {
                    assets.push(assetWithIcon);
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
        const personId = id ? id : Date.now().toString();
        
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

            // Update local array for UI
            const personWithId = {
                ...personData
            };

            if (id) {
                const index = people.findIndex(p => String(p.id) === String(id));
                if (index !== -1) {
                    people[index] = personWithId;
                } else {
                    people.push(personWithId);
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
            'settings': 'Settings',
            'profile': 'Profile',
            'shared': 'Incoming'
        };
        document.getElementById('pageTitle').textContent = titles[screenName] || 'Dashboard';

        // Update sidebar navigation highlighting
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(nav => nav.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-screen="${screenName}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    }
}

// Dashboard
function renderDashboard() {
    try {
        // Update stats with actual data counts
        const totalAssetsEl = document.getElementById('totalAssets');
        if (totalAssetsEl) totalAssetsEl.textContent = assets.length;
        
        const assetsChange = document.getElementById('assetsChange');
        if (assetsChange) assetsChange.textContent = assets.length > 0 ? `${assets.length} ${assets.length === 1 ? 'asset' : 'assets'} tracked` : 'No assets yet';
        
        const totalIncomingEl = document.getElementById('totalIncoming');
        if (totalIncomingEl) totalIncomingEl.textContent = sharedItems.length;
        
        const totalPeopleEl = document.getElementById('totalPeople');
        if (totalPeopleEl) totalPeopleEl.textContent = people.length;
        
        const totalDocumentsEl = document.getElementById('totalDocuments');
        if (totalDocumentsEl) totalDocumentsEl.textContent = documents.length;

        // Category breakdown
        const categoryBreakdown = {};
        assets.forEach(asset => {
            categoryBreakdown[asset.category] = (categoryBreakdown[asset.category] || 0) + 1;
        });

        const categoryContainer = document.getElementById('categoryBreakdown');
    categoryContainer.innerHTML = Object.entries(categoryBreakdown)
        .map(([category, count]) => `
            <div class="category-item" onclick="document.getElementById('categoryFilter').value='${category}'; renderAssets(); showScreen('assets');" style="cursor: pointer;">
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
    } catch (error) {
        console.error('Error in renderDashboard:', error);
    }
}

// Assets
function renderAssets(filter = '') {
    try {
        const tbody = document.getElementById('assetsTableBody');
        if (!tbody) {
            console.error('assetsTableBody element not found');
            return;
        }
    
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
    } catch (error) {
        console.error('Error in renderAssets:', error);
    }
}

function showAddAssetForm() {
    document.getElementById('assetModalTitle').textContent = 'Add New Asset';
    document.getElementById('assetForm').reset();
    document.getElementById('assetId').value = '';
    populateAssetRoleSelects();
    openModal('assetModal');
}

function editAsset(id) {
    const asset = assets.find(a => String(a.id) === String(id));
    if (!asset) {
        showToast('Asset not found', 'error');
        return;
    }

    document.getElementById('assetModalTitle').textContent = 'Edit Asset';
    document.getElementById('assetId').value = asset.id;
    document.getElementById('assetName').value = asset.name || '';
    document.getElementById('assetCategory').value = asset.category || '';
    updateSubCategoryDropdown(asset.category);
    document.getElementById('assetSubCategory').value = asset.type || '';
    document.getElementById('assetCountry').value = asset.country || '';
    document.getElementById('assetDescription').value = asset.description || '';
    document.getElementById('assetAccessDetails').value = asset.accessDetails || '';

    populateAssetRoleSelects();
    document.getElementById('assetInheritor').value = asset.inheritor || '';
    document.getElementById('assetExecutor').value = asset.executor || '';
    document.getElementById('assetRecipient').value = asset.recipient || '';

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
            const icon = relationshipIconsExtended[p.relationship] || '👤';
            return `<option value="${p.name}">${icon} ${p.name} (${p.relationship})</option>`;
        }).join('');

    document.getElementById('assetInheritor').innerHTML = options;
    document.getElementById('assetExecutor').innerHTML = options;
    document.getElementById('assetRecipient').innerHTML = options;
}

// People
function renderPeople(filter = '') {
    try {
        const tbody = document.getElementById('peopleTableBody');
        if (!tbody) {
            console.error('peopleTableBody element not found');
            return;
        }
        
        const filteredPeople = people.filter(p =>
            filter === '' ||
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.email.toLowerCase().includes(filter.toLowerCase())
        );

        tbody.innerHTML = filteredPeople.map(person => {
            const icon = relationshipIconsExtended[person.relationship] || '👤';
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
    } catch (error) {
        console.error('Error in renderPeople:', error);
    }
}

function showAddPersonForm() {
    document.getElementById('personModalTitle').textContent = 'Add New Person';
    document.getElementById('personForm').reset();
    document.getElementById('personId').value = '';
    openModal('personModal');
}

function editPerson(id) {
    const person = people.find(p => String(p.id) === String(id));
    if (!person) {
        showToast('Person not found', 'error');
        return;
    }

    document.getElementById('personModalTitle').textContent = 'Edit Person';
    document.getElementById('personId').value = person.id;
    document.getElementById('personName').value = person.name || '';
    document.getElementById('personRelationship').value = person.relationship || '';
    document.getElementById('personEmail').value = person.email || '';
    document.getElementById('personPhone').value = person.phone || '';
    document.getElementById('personCountry').value = person.country || '';
    document.getElementById('personNotes').value = person.notes || '';

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
    if (!tbody) {
        console.error('documentsTableBody element not found');
        return;
    }
    
    tbody.innerHTML = documents.map(doc => `
        <tr>
            <td><strong>${doc.name}</strong></td>
            <td>${doc.sharedWith}</td>
            <td><span class="info-badge">${doc.accessLevel}</span></td>
            <td>${doc.lastModified}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" onclick="showToast('This would open the Google Sheet in a new tab', 'info')">
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
            showToast('This will remove access for the document.', 'info');
            closeModal('confirmModal');
        }
    );
}

// Knowledge Base
function renderKnowledgeBase(filter = '') {
    const container = document.getElementById('knowledgeContainer');
    if (!container) return;

    let html = '';

    Object.entries(knowledgeBase).forEach(([section, items]) => {
        // Check if items is an array, if not, skip
        if (!Array.isArray(items)) {
            return;
        }
        
        html += `<div class="knowledge-section"><h3>${section.replace('_', ' ').toUpperCase()}</h3><div class="knowledge-grid">`;
        
        items.forEach((item, index) => {
            const match = filter === '' || 
                (item.name && item.name.toLowerCase().includes(filter.toLowerCase())) ||
                (item.description && item.description.toLowerCase().includes(filter.toLowerCase())) ||
                (item.title && item.title.toLowerCase().includes(filter.toLowerCase())) ||
                (item.content && item.content.toLowerCase().includes(filter.toLowerCase()));
            
            if (match) {
                const icon = item.icon ?? getIconForType(section);
                const title = item.name || item.title || 'Unknown';
                const desc = item.description || item.content || '';
                
                html += `
                    <div class="knowledge-card" onclick="openKnowledgeModal('${section}', ${index})">
                        <div class="knowledge-icon">${icon}</div>
                        <div class="knowledge-title">${title}</div>
                        <p class="knowledge-description">${desc.substring(0, 100)}...</p>
                    </div>
                `;
            }
        });
        html += `</div></div>`;
    });

    container.innerHTML = html || '<p>No knowledge base items available</p>';
}

function getIconForType(type) {
    const icons = {
        'asset_types': '💼',
        'people': '👥',
        'geographies': '🌍'
    };
    return icons[type] || '📋';
}

function openKnowledgeModal(type, index) {
    const items = knowledgeBase[type];
    if (!Array.isArray(items) || !items[index]) {
        showToast('Error loading knowledge base item', 'error');
        return;
    }
    
    const item = items[index];
    const content = document.getElementById('knowledgeModalContent');
    
    // Handle different item structures
    const title = item.name || item.title || 'Unknown';
    const description = item.description || item.content || '';
    
    let html = `<h3>${title}</h3><p>${description}</p>`;
    
    if (item.sub_types && Array.isArray(item.sub_types)) {
        html += '<h4>Sub-types:</h4><ul>';
        item.sub_types.forEach(sub => {
            html += `<li><strong>${sub.name}:</strong> ${sub.description}</li>`;
        });
        html += '</ul>';
    }
    
    if (item.url) {
        html += `<p><a href="${item.url}" target="_blank">Learn more →</a></p>`;
    }
    
    content.innerHTML = html;
    document.getElementById('knowledgeModalTitle').textContent = title;
    openModal('knowledgeModal');
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

    document.getElementById('sharedSearch')?.addEventListener('input', (e) => {
        renderSharedItems(e.target.value);
    });

    document.getElementById('knowledgeSearch')?.addEventListener('input', (e) => {
        renderKnowledgeBase(e.target.value);
    });
}

// Dropdown Handlers for Dynamic Sub-Categories and "Other" Options
function initializeDropdownHandlers() {
    document.getElementById('assetCategory')?.addEventListener('change', function() {
        updateSubCategoryDropdown(this.value);
        handleOtherOption('assetCategory', 'assetCategoryOther');
    });

    document.getElementById('assetSubCategory')?.addEventListener('change', function() {
        handleOtherOption('assetSubCategory', 'assetSubCategoryOther');
    });

    document.getElementById('assetCountry')?.addEventListener('change', function() {
        handleOtherOption('assetCountry', 'assetCountryOther');
    });

    document.getElementById('personRelationship')?.addEventListener('change', function() {
        handleOtherOption('personRelationship', 'personRelationshipOther');
    });

    document.getElementById('personCountry')?.addEventListener('change', function() {
        handleOtherOption('personCountry', 'personCountryOther');
    });
}

function updateSubCategoryDropdown(category) {
    const subCategorySelect = document.getElementById('assetSubCategory');
    if (!subCategorySelect) return;
    
    const subCategories = subCategoryMap[category] || [];
    subCategorySelect.innerHTML = '<option value="">Select sub-category...</option>' +
        subCategories.map(sub => {
            const icon = subCategoryIcons[sub] || '📦';
            return `<option value="${sub}">${icon} ${sub}</option>`;
        }).join('');
}

function handleOtherOption(selectId, textFieldId) {
    const selectElement = document.getElementById(selectId);
    const textField = document.getElementById(textFieldId);
    
    if (!selectElement || !textField) return;

    if (selectElement.value === 'Other') {
        textField.style.display = 'block';
    } else {
        textField.style.display = 'none';
    }
}

// Shared Items (Incoming)
function renderSharedItems(filter = '') {
    const tbody = document.getElementById('sharedTableBody');
    if (!tbody) {
        console.error('sharedTableBody element not found');
        return;
    }

    try {
        const filteredItems = sharedItems.filter(item =>
            filter === '' ||
            (item.name && item.name.toLowerCase().includes(filter.toLowerCase())) ||
            (item.owner && item.owner.toLowerCase().includes(filter.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(filter.toLowerCase()))
        );

        tbody.innerHTML = filteredItems.map(item => `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.owner}</td>
                <td><span class="info-badge">${item.accessLevel || 'Viewer'}</span></td>
                <td>${item.lastModified}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="showToast('This will open ${item.name} Sheet', 'info')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            View
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error in renderSharedItems:', error);
        tbody.innerHTML = '<tr><td colspan="5">Error loading shared items</td></tr>';
    }
}


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
            showToast('All data has been reset (demo only)', 'info');
        }
    );
}

function confirmDeleteAccount() {
    showConfirmModal(
        'Delete Account',
        'This will permanently delete your account and all associated data. This action cannot be undone. Are you absolutely sure?',
        () => {
            closeModal('confirmModal');
            showToast('Account deletion requested (demo only). In production, this would delete your account.', 'info');
        }
    );
}

// Close modals when clicking outside
window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

function setDropdownValue(selectId, otherId, value) {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
        selectElement.value = value;
        handleOtherOption(selectId, otherId);
    }
}

function closeDemoWelcome() {
    const modal = document.getElementById('demoWelcomeModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleJoinBeta() {
    // Open beta signup in new tab
    window.open('/#beta-signup', '_blank');
    // Close the overlay
    closeDemoWelcome();
}

function showComingSoon() {
    openModal('comingSoonModal');
}
