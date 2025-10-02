// Advanced Header Component with Mobile Navigation
class HeaderManager {
    constructor() {
        this.isMobileMenuOpen = false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupNavInteractions();
        this.setupStickyHeader();
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navActions = document.querySelector('.nav-actions');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.isMobileMenuOpen = !this.isMobileMenuOpen;
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    this.isMobileMenuOpen = false;
                    this.toggleMobileMenu();
                }
            });
        });
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const navActions = document.querySelector('.nav-actions');
        const mobileToggle = document.querySelector('.mobile-toggle');

        if (this.isMobileMenuOpen) {
            navLinks.style.display = 'flex';
            navActions.style.display = 'flex';
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navLinks.style.display = 'none';
            navActions.style.display = 'none';
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.glass-nav');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Header background effect
            if (scrollY > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.8)';
                header.style.boxShadow = 'none';
            }

            // Hide/show header on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;
        });
    }

    setupNavInteractions() {
        const navLinks = document.querySelectorAll('.nav-link');

        // Update active link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scrolling with offset
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupStickyHeader() {
        const header = document.querySelector('.glass-nav');
        let isSticky = false;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50 && !isSticky) {
                header.classList.add('sticky');
                isSticky = true;
            } else if (window.scrollY <= 50 && isSticky) {
                header.classList.remove('sticky');
                isSticky = false;
            }
        });
    }
}

// Header HTML (to be added to index.html if not present)
const headerHTML = `
<nav class="glass-nav">
    <div class="nav-container">
        <div class="nav-logo">
            <div class="logo-icon">
                <i class="fas fa-industry"></i>
            </div>
            <span>EcoSteel<span class="ai-text">AI</span></span>
        </div>
        
        <div class="nav-links">
            <a href="#home" class="nav-link active">
                <i class="fas fa-home"></i>
                Home
            </a>
            <a href="#simulation" class="nav-link">
                <i class="fas fa-brain"></i>
                AI Simulation
            </a>
            <a href="#blockchain" class="nav-link">
                <i class="fas fa-link"></i>
                Blockchain
            </a>
            <a href="#impact" class="nav-link">
                <i class="fas fa-chart-line"></i>
                Impact
            </a>
            <a href="#contact" class="nav-link">
                <i class="fas fa-envelope"></i>
                Contact
            </a>
        </div>

        <div class="nav-actions">
            <button class="btn-outline" onclick="openModal('demo-modal')">
                <i class="fas fa-play-circle"></i>
                Demo
            </button>
            <button class="btn-primary" onclick="openModal('contact-modal')">
                <i class="fas fa-rocket"></i>
                Get Started
            </button>
        </div>

        <div class="mobile-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>
`;

// Add header styles
const headerStyles = `
.glass-nav.sticky {
    background: rgba(15, 23, 42, 0.98) !important;
    backdrop-filter: blur(20px);
}

.nav-links .nav-link i {
    margin-right: 0.5rem;
    font-size: 0.9rem;
}

.mobile-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 0.5rem;
}

.mobile-toggle span {
    width: 25px;
    height: 3px;
    background: var(--light);
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.mobile-toggle.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.mobile-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

@media (max-width: 768px) {
    .mobile-toggle {
        display: flex;
    }
    
    .nav-links, .nav-actions {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-links {
        align-items: stretch;
    }
    
    .nav-link {
        padding: 1rem;
        border-radius: var(--border-radius-sm);
        margin-bottom: 0.5rem;
    }
    
    .nav-actions {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
}
`;

// Initialize header manager
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
});

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = headerStyles;
document.head.appendChild(styleSheet);