// Premium Main JavaScript with Advanced Interactions
class EcoSteelApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupNavInteractions();
        this.setupAnimations();
        this.setupFormHandlers();
        this.initializeSimulation();
        this.setupParallaxEffects();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupNavInteractions() {
        const nav = document.querySelector('.glass-nav');
        const navLinks = document.querySelectorAll('.nav-link');

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Header background effect
            if (scrollY > 100) {
                nav.style.background = 'rgba(15, 23, 42, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(15, 23, 42, 0.8)';
            }

            // Update active section
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    this.currentSection = sectionId;

                    // Update nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Add specific animations based on element type
                    if (entry.target.classList.contains('floating-card')) {
                        entry.target.style.animation = 'float 6s ease-in-out infinite';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.glass-card, .floating-card, .chain-node').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    setupFormHandlers() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
        }

        // Form input animations
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleContactSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

            // Reset form
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    initializeSimulation() {
        // Scrap quality slider
        const scrapSlider = document.querySelector('.param-slider');
        const scrapValue = document.getElementById('scrap-value');

        if (scrapSlider && scrapValue) {
            scrapSlider.addEventListener('input', () => {
                scrapValue.textContent = `${scrapSlider.value}%`;
            });
        }

        // Scale buttons
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');

            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Utility function for scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new EcoSteelApp();
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 4px solid var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--glass-shadow);
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left-color: var(--secondary);
    }
    
    .notification i {
        font-size: 1.25rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);