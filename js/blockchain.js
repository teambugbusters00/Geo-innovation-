// Blockchain Timeline Management
class BlockchainManager {
    constructor() {
        this.timelineItems = [];
        this.currentStep = 0;
        this.init();
    }

    init() {
        this.loadTimelineData();
        this.setupTimelineAnimation();
    }

    loadTimelineData() {
        this.timelineItems = [
            {
                step: 1,
                title: 'Raw Material Sourcing',
                description: 'Iron ore and scrap metal verified and logged on blockchain',
                timestamp: '2024-01-15 08:30',
                completed: true
            },
            {
                step: 2,
                title: 'Production Phase 1',
                description: 'Initial melting and refinement process completed',
                timestamp: '2024-01-15 14:20',
                completed: true
            },
            {
                step: 3,
                title: 'Quality Testing',
                description: 'Material composition and quality verification',
                timestamp: 'Pending',
                completed: false
            },
            {
                step: 4,
                title: 'Final Production',
                description: 'Steel forming and finishing processes',
                timestamp: 'Pending',
                completed: false
            },
            {
                step: 5,
                title: 'Delivery',
                description: 'Shipment to customer with complete history',
                timestamp: 'Pending',
                completed: false
            }
        ];

        this.renderTimeline();
    }

    renderTimeline() {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = '';

        this.timelineItems.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${item.completed ? 'active' : ''}`;
            timelineItem.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="timeline-date">${item.timestamp}</span>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });
    }

    setupTimelineAnimation() {
        // Simulate real-time updates to the timeline
        setInterval(() => {
            this.simulateProgress();
        }, 10000); // Update every 10 seconds
    }

    simulateProgress() {
        // Find the first incomplete step
        const incompleteStep = this.timelineItems.find(item => !item.completed);
        if (incompleteStep) {
            // Random chance to complete a step (for demo purposes)
            if (Math.random() > 0.7) {
                incompleteStep.completed = true;
                incompleteStep.timestamp = new Date().toLocaleString();
                this.renderTimeline();

                // Show notification
                this.showProgressNotification(incompleteStep.title);
            }
        }
    }

    showProgressNotification(stepTitle) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <strong>Blockchain Update:</strong><br>
            ${stepTitle} completed
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Method to manually update timeline (for demo purposes)
    advanceStep() {
        const incompleteStep = this.timelineItems.find(item => !item.completed);
        if (incompleteStep) {
            incompleteStep.completed = true;
            incompleteStep.timestamp = new Date().toLocaleString();
            this.renderTimeline();
            this.showProgressNotification(incompleteStep.title);
        }
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize blockchain manager
document.addEventListener('DOMContentLoaded', () => {
    window.blockchainManager = new BlockchainManager();
});