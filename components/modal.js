// Advanced Modal Management System
class ModalManager {
    constructor() {
        this.currentModal = null;
        this.init();
    }

    init() {
        this.setupModalTriggers();
        this.setupEscapeKey();
        this.setupOutsideClick();
        this.createModalContainer();
    }

    createModalContainer() {
        // Create modal backdrop container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalContainer.style.display = 'none';
        document.body.appendChild(modalContainer);
    }

    setupModalTriggers() {
        // Add click handlers for all modal triggers
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal]');
            if (trigger) {
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            }
        });

        // Close modal buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.modal-close') || e.target.closest('.modal-cancel')) {
                this.closeModal();
            }
        });
    }

    setupEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
    }

    setupOutsideClick() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-container')) {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        this.closeModal(); // Close any existing modal

        const modalHTML = this.getModalHTML(modalId);
        if (!modalHTML) return;

        const modalContainer = document.querySelector('.modal-container');
        modalContainer.innerHTML = modalHTML;
        modalContainer.style.display = 'flex';

        // Add animation class
        setTimeout(() => {
            modalContainer.classList.add('active');
            const modalContent = modalContainer.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('active');
            }
        }, 10);

        this.currentModal = modalId;
        document.body.style.overflow = 'hidden';

        // Initialize modal-specific functionality
        this.initializeModal(modalId);
    }

    closeModal() {
        const modalContainer = document.querySelector('.modal-container');
        if (!modalContainer) return;

        modalContainer.classList.remove('active');
        const modalContent = modalContainer.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('active');
        }

        setTimeout(() => {
            modalContainer.style.display = 'none';
            modalContainer.innerHTML = '';
            this.currentModal = null;
            document.body.style.overflow = '';
        }, 300);
    }

    getModalHTML(modalId) {
        const modals = {
            'demo-modal': `
                <div class="modal-content glass-card">
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <i class="fas fa-play-circle"></i>
                        <h2>Live Demo</h2>
                    </div>
                    <div class="modal-body">
                        <div class="demo-video">
                            <div class="video-placeholder">
                                <i class="fas fa-play"></i>
                                <p>EcoSteel AI Platform Overview</p>
                            </div>
                        </div>
                        <div class="demo-features">
                            <div class="demo-feature">
                                <i class="fas fa-brain"></i>
                                <div>
                                    <h4>AI Simulation</h4>
                                    <p>Real-time optimization algorithms</p>
                                </div>
                            </div>
                            <div class="demo-feature">
                                <i class="fas fa-link"></i>
                                <div>
                                    <h4>Blockchain Tracking</h4>
                                    <p>End-to-end supply chain transparency</p>
                                </div>
                            </div>
                            <div class="demo-feature">
                                <i class="fas fa-chart-bar"></i>
                                <div>
                                    <h4>Live Analytics</h4>
                                    <p>Real-time performance metrics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-outline modal-cancel">Close</button>
                        <button class="btn-primary" onclick="startDemo()">
                            <i class="fas fa-rocket"></i>
                            Start Demo
                        </button>
                    </div>
                </div>
            `,

            'contact-modal': `
                <div class="modal-content glass-card">
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <i class="fas fa-envelope"></i>
                        <h2>Get Started</h2>
                        <p>Schedule a personalized demo with our experts</p>
                    </div>
                    <div class="modal-body">
                        <form class="contact-modal-form" id="contact-modal-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" id="modal-name" required>
                                    <label for="modal-name">Full Name</label>
                                </div>
                                <div class="form-group">
                                    <input type="email" id="modal-email" required>
                                    <label for="modal-email">Work Email</label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" id="modal-company" required>
                                    <label for="modal-company">Company</label>
                                </div>
                                <div class="form-group">
                                    <input type="tel" id="modal-phone">
                                    <label for="modal-phone">Phone Number</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <select id="modal-interest" class="glass-select">
                                    <option value="">What are you interested in?</option>
                                    <option value="simulation">AI Simulation</option>
                                    <option value="blockchain">Blockchain Tracking</option>
                                    <option value="analytics">Impact Analytics</option>
                                    <option value="enterprise">Enterprise Solution</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <textarea id="modal-message" rows="4" placeholder="Tell us about your specific needs..."></textarea>
                            </div>
                            <div class="form-agreement">
                                <input type="checkbox" id="modal-agreement" required>
                                <label for="modal-agreement">
                                    I agree to receive communications about EcoSteel AI
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-outline modal-cancel">Cancel</button>
                        <button type="submit" form="contact-modal-form" class="btn-primary">
                            <i class="fas fa-paper-plane"></i>
                            Schedule Demo
                        </button>
                    </div>
                </div>
            `,

            'simulation-modal': `
                <div class="modal-content glass-card large">
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <i class="fas fa-brain"></i>
                        <h2>Advanced Simulation</h2>
                        <p>Configure detailed parameters for precise optimization</p>
                    </div>
                    <div class="modal-body">
                        <div class="simulation-tabs">
                            <button class="tab-btn active" data-tab="parameters">Parameters</button>
                            <button class="tab-btn" data-tab="optimization">Optimization</button>
                            <button class="tab-btn" data-tab="results">Results</button>
                        </div>
                        
                        <div class="tab-content active" id="parameters-tab">
                            <!-- Advanced parameter controls would go here -->
                        </div>
                        
                        <div class="tab-content" id="optimization-tab">
                            <!-- Optimization settings would go here -->
                        </div>
                        
                        <div class="tab-content" id="results-tab">
                            <!-- Results visualization would go here -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-outline modal-cancel">Close</button>
                        <button class="btn-primary" onclick="runAdvancedSimulation()">
                            <i class="fas fa-cogs"></i>
                            Run Advanced Simulation
                        </button>
                    </div>
                </div>
            `
        };

        return modals[modalId] || null;
    }

    initializeModal(modalId) {
        switch (modalId) {
            case 'contact-modal':
                this.initializeContactModal();
                break;
            case 'demo-modal':
                this.initializeDemoModal();
                break;
            case 'simulation-modal':
                this.initializeSimulationModal();
                break;
        }
    }

    initializeContactModal() {
        const form = document.getElementById('contact-modal-form');
        if (form) {
            form.addEventListener('submit', this.handleContactModalSubmit.bind(this));
        }
    }

    initializeDemoModal() {
        // Initialize demo modal specific functionality
        console.log('Demo modal initialized');
    }

    initializeSimulationModal() {
        // Initialize tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');

                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show corresponding content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    handleContactModalSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showModalNotification('Demo scheduled successfully! We will contact you within 24 hours.', 'success');

            // Reset form
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Close modal after success
            setTimeout(() => {
                this.closeModal();
            }, 2000);
        }, 3000);
    }

    showModalNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `modal-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
            <span>${message}</span>
        `;

        const modalContent = document.querySelector('.modal-content');
        modalContent.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Global functions for modal access
function openModal(modalId) {
    if (window.modalManager) {
        window.modalManager.openModal(modalId);
    }
}

function closeModal() {
    if (window.modalManager) {
        window.modalManager.closeModal();
    }
}

// Demo functions
function startDemo() {
    const demoBtn = document.querySelector('.modal-content .btn-primary');
    const originalText = demoBtn.innerHTML;

    demoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting Demo...';
    demoBtn.disabled = true;

    setTimeout(() => {
        window.open('#simulation', '_self');
        closeModal();
    }, 2000);
}

function runAdvancedSimulation() {
    // Advanced simulation logic would go here
    console.log('Running advanced simulation...');
}

// Modal Styles
const modalStyles = `
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-container.active {
    opacity: 1;
}

.modal-content {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    box-shadow: var(--glass-shadow);
    max-width: 90vw;
    max-height: 90vh;
    overflow: hidden;
    transform: scale(0.7) translateY(50px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content.active {
    transform: scale(1) translateY(0);
    opacity: 1;
}

.modal-content.large {
    width: 800px;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light);
    cursor: pointer;
    transition: var(--transition);
    z-index: 1;
}

.modal-close:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
    color: #ef4444;
}

.modal-header {
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid var(--glass-border);
    text-align: center;
}

.modal-header i {
    font-size: 3rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
}

.modal-header h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.modal-header p {
    color: var(--gray);
}

.modal-body {
    padding: 2rem;
    max-height: 60vh;
    overflow-y: auto;
}

.modal-footer {
    padding: 1.5rem 2rem;
    border-top: 1px solid var(--glass-border);
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    background: rgba(255, 255, 255, 0.02);
}

/* Demo Modal Styles */
.demo-video {
    margin-bottom: 2rem;
}

.video-placeholder {
    width: 100%;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px dashed var(--glass-border);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--gray);
    cursor: pointer;
    transition: var(--transition);
}

.video-placeholder:hover {
    border-color: var(--primary);
    color: var(--primary);
}

.video-placeholder i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.demo-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.demo-feature {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--border-radius-sm);
}

.demo-feature i {
    font-size: 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Contact Modal Styles */
.contact-modal-form .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-agreement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.form-agreement input[type="checkbox"] {
    width: auto;
}

.form-agreement label {
    font-size: 0.9rem;
    color: var(--gray);
}

/* Simulation Modal Styles */
.simulation-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 1rem;
}

.tab-btn {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    color: var(--gray);
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    transition: var(--transition);
    font-weight: 500;
}

.tab-btn.active {
    background: var(--primary);
    color: white;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

/* Modal Notifications */
.modal-notification {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: var(--border-radius-sm);
    margin-bottom: 1rem;
    color: var(--secondary);
}

.modal-notification.error {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.2);
    color: #ef4444;
}

@media (max-width: 768px) {
    .modal-content {
        margin: 1rem;
        max-width: calc(100vw - 2rem);
    }
    
    .modal-content.large {
        width: auto;
    }
    
    .contact-modal-form .form-row {
        grid-template-columns: 1fr;
    }
    
    .modal-footer {
        flex-direction: column;
    }
    
    .simulation-tabs {
        flex-direction: column;
    }
}
`;

// Initialize modal manager
document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});

// Add modal styles to document
const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = modalStyles;
document.head.appendChild(modalStyleSheet);