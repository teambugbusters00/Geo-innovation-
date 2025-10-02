// Advanced Charts Manager
class ChartsManager {
    constructor() {
        this.impactChart = null;
        this.init();
    }

    init() {
        this.initializeImpactChart();
        this.setupLiveUpdates();
        this.animateMetrics();
    }

    initializeImpactChart() {
        const ctx = document.getElementById('impact-chart');
        if (!ctx) return;

        this.impactChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'CO₂ Emissions (tons)',
                    data: [1200, 1150, 1100, 1050, 1000, 950, 900, 850, 800, 750, 700, 650],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Energy Consumption (MWh)',
                    data: [1800, 1750, 1700, 1650, 1600, 1550, 1500, 1450, 1400, 1350, 1300, 1250],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#f8fafc',
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#cbd5e1',
                            callback: function (value) {
                                return value >= 1000 ? value / 1000 + 'k' : value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#cbd5e1'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear'
                    }
                }
            }
        });
    }

    animateMetrics() {
        // Animate the impact metrics with counting effect
        const metrics = [
            { id: 'co2-reduction', target: 12450 },
            { id: 'energy-savings', target: 8.2 },
            { id: 'material-recovery', target: 94 }
        ];

        metrics.forEach(metric => {
            const element = document.querySelector(`#${metric.id}`);
            if (element) {
                this.animateValue(element, 0, metric.target, 2000, metric.id === 'material-recovery' ? '%' : '');
            }
        });
    }

    animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * (end - start) + start);

            element.textContent = suffix === '%' ?
                `${value}${suffix}` :
                value.toLocaleString();

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    setupLiveUpdates() {
        // Simulate live data streaming
        setInterval(() => {
            this.updateChartData();
        }, 3000);
    }

    updateChartData() {
        if (!this.impactChart) return;

        // Remove first data point and add new one with slight variation
        this.impactChart.data.datasets.forEach(dataset => {
            dataset.data.shift();
            const lastValue = dataset.data[dataset.data.length - 1];
            const variation = (Math.random() - 0.5) * 50; // Random variation
            const newValue = Math.max(500, lastValue - 25 + variation); // General downward trend
            dataset.data.push(Math.round(newValue));
        });

        // Rotate labels
        const labels = this.impactChart.data.labels;
        labels.push(labels.shift());

        this.impactChart.update('quiet');
    }
}

// Add pulse animation
const pulseAnimation = `
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
        }
    }
`;

const style = document.createElement('style');
style.textContent = pulseAnimation;
document.head.appendChild(style);

// Initialize charts manager
document.addEventListener('DOMContentLoaded', () => {
    new ChartsManager();
});