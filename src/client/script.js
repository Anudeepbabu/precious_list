// Header Scroll Effect
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  }
});

// Scroll Animation with IntersectionObserver
const animateOnScroll = () => {
  const elements = document.querySelectorAll('[data-animate]');
  
  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  }
};

// Toast Notification System for Beta Signup
function showBetaToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container') || createBetaToastContainer();
  
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

function createBetaToastContainer() {
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

// Beta Signup Form Handler
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  animateOnScroll();
  
  const signupForm = document.getElementById('signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('email-input');
      const email = emailInput.value.trim();
      
      if (!email) {
        showBetaToast('Please enter your email address', 'warning');
        return;
      }
      
      try {
        const response = await fetch('/api/v1/beta-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Success - update UI
          emailInput.value = '';
          showBetaToast('Thank you for signing up! Check your email for updates.', 'success');
          
          // Update waitlist count
          const trustBadgeNumber = document.querySelector('.trust-badge-number');
          if (trustBadgeNumber) {
            const currentCount = parseInt(trustBadgeNumber.textContent);
            trustBadgeNumber.textContent = currentCount + 1;
          }
        } else {
          showBetaToast(data.message || 'Error signing up. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showBetaToast('Error signing up. Please try again.', 'error');
      }
    });
  }
});
