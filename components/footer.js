// Advanced Footer Component
class FooterManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNewsletter();
        this.setupSocialInteractions();
        this.setupBackToTop();
        this.setupCurrentYear();
    }

    setupNewsletter() {
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();

        const emailInput = e.target.querySelector('input[type="email"]');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        if (!this.validateEmail(emailInput.value)) {
            this.showFooterNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showFooterNotification('Successfully subscribed to our newsletter!', 'success');
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    setupSocialInteractions() {
        // Add hover effects to social links
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
    }

    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        document.body.appendChild(backToTop);
    }

    setupCurrentYear() {
        const yearElement = document.querySelector('.current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    showFooterNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `footer-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        const footer = document.querySelector('.footer');
        footer.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Footer HTML (to be added to index.html)
const footerHTML = `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <div class="logo-icon">
                    <i class="fas fa-industry"></i>
                </div>
                <div>
                    <h3>EcoSteel<span class="ai-text">AI</span></h3>
                    <p>Revolutionizing steel production through AI and blockchain technology for a sustainable future.</p>
                </div>
            </div>
            
            <div class="footer-grid">
                <div class="footer-section">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#simulation">AI Simulation</a></li>
                        <li><a href="#blockchain">Blockchain</a></li>
                        <li><a href="#impact">Impact Analytics</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#careers">Careers</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#press">Press</a></li>
                        <li><a href="#partners">Partners</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#documentation">Documentation</a></li>
                        <li><a href="#api">API</a></li>
                        <li><a href="#support">Support</a></li>
                        <li><a href="#status">System Status</a></li>
                        <li><a href="#community">Community</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms of Service</a></li>
                        <li><a href="#cookies">Cookie Policy</a></li>
                        <li><a href="#security">Security</a></li>
                        <li><a href="#compliance">Compliance</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-newsletter">
                <h4>Stay Updated</h4>
                <p>Get the latest news and updates about EcoSteel AI</p>
                <form class="newsletter-form" id="newsletter-form">
                    <div class="newsletter-input">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit">
                            <i class="fas fa-paper-plane"></i>
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-copyright">
                <p>&copy; <span class="current-year">2024</span> EcoSteel AI. All rights reserved. Built for IIT Bombay ECell Hackathon.</p>
            </div>
            
            <div class="footer-social">
                <div class="social-links">
                    <a href="#" aria-label="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="#" aria-label="YouTube">
                        <i class="fab fa-youtube"></i>
                    </a>
                    <a href="#" aria-label="Medium">
                        <i class="fab fa-medium"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
`;

// Footer Styles
const footerStyles = `
.footer {
    background: linear-gradient(135deg, var(--darker) 0%, #0a0f1c 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 4rem 0 2rem;
    position: relative;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 3fr 1.5fr;
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-brand {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.footer-brand h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.footer-brand p {
    color: var(--gray);
    line-height: 1.6;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
}

.footer-section h4 {
    color: var(--light);
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section li {
    margin-bottom: 0.5rem;
}

.footer-section a {
    color: var(--gray);
    text-decoration: none;
    transition: var(--transition);
    font-size: 0.9rem;
}

.footer-section a:hover {
    color: var(--primary);
    padding-left: 0.5rem;
}

.footer-newsletter {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
}

.footer-newsletter h4 {
    margin-bottom: 0.5rem;
    color: var(--light);
}

.footer-newsletter p {
    color: var(--gray);
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.newsletter-input {
    display: flex;
    gap: 0.5rem;
}

.newsletter-input input {
    flex: 1;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius-sm);
    color: var(--light);
    font-size: 0.9rem;
}

.newsletter-input input:focus {
    outline: none;
    border-color: var(--primary);
}

.newsletter-input button {
    padding: 0.75rem 1rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.9rem;
    white-space: nowrap;
}

.newsletter-input button:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright p {
    color: var(--gray);
    font-size: 0.9rem;
}

.footer-social .social-links {
    display: flex;
    gap: 1rem;
}

.footer-social a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray);
    text-decoration: none;
    transition: var(--transition);
}

.footer-social a:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
    border-color: var(--primary);
}

/* Back to Top Button */
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition);
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(37, 99, 235, 0.4);
}

/* Footer Notifications */
.footer-notification {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-left: 4px solid var(--primary);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--glass-shadow);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-notification.success {
    border-left-color: var(--secondary);
}

.footer-notification.error {
    border-left-color: #ef4444;
}

.footer-notification.show {
    transform: translateX(-50%) translateY(0);
}

.notification-close {
    background: none;
    border: none;
    color: var(--gray);
    cursor: pointer;
    padding: 0.25rem;
    margin-left: auto;
}

.notification-close:hover {
    color: var(--light);
}

@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .newsletter-input {
        flex-direction: column;
    }
}
`;

// Initialize footer manager
document.addEventListener('DOMContentLoaded', () => {
    new FooterManager();
});

// Add footer styles to document
const footerStyleSheet = document.createElement('style');
footerStyleSheet.textContent = footerStyles;
document.head.appendChild(footerStyleSheet);