// Advanced Simulation Manager
class SimulationManager {
    constructor() {
        this.chart = null;
        this.isSimulating = false;
        this.init();
    }

    init() {
        this.initializeChart();
        this.setupEventListeners();
        this.setupRealTimeUpdates();
    }

    initializeChart() {
        const ctx = document.getElementById('simulation-chart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['CO₂ Emissions', 'Energy Use', 'Production Cost', 'Efficiency'],
                datasets: [{
                    label: 'Before AI',
                    data: [850, 1200, 4800, 65],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 1
                }, {
                    label: 'After AI',
                    data: [467, 840, 3100, 88],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'AI Optimization Impact',
                        color: '#f8fafc',
                        font: {
                            size: 16,
                            weight: '600'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#cbd5e1'
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
                }
            }
        });
    }

    setupEventListeners() {
        const runBtn = document.getElementById('run-simulation');
        if (runBtn) {
            runBtn.addEventListener('click', this.runSimulation.bind(this));
        }
    }

    async runSimulation() {
        if (this.isSimulating) return;

        this.isSimulating = true;
        const runBtn = document.getElementById('run-simulation');

        // Show loading state
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running AI...';
        runBtn.disabled = true;

        // Get simulation parameters
        const plant = document.querySelector('.glass-select').value;
        const scrapQuality = document.querySelector('.param-slider').value;
        const scale = document.querySelector('.scale-btn.active').textContent;

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Generate results based on inputs
        const results = this.generateResults(plant, scrapQuality, scale);

        // Update UI with results
        this.updateResults(results);

        // Reset button
        runBtn.innerHTML = '<i class="fas fa-brain"></i> Run AI Simulation';
        runBtn.disabled = false;
        this.isSimulating = false;

        // Show success animation
        this.animateResults();
    }

    generateResults(plant, scrapQuality, scale) {
        const baseValues = {
            emissions: 850,
            energy: 1200,
            cost: 4800,
            efficiency: 65
        };

        const qualityFactor = scrapQuality / 100;
        const optimization = 0.3 + (qualityFactor * 0.4); // 30-70% optimization

        return {
            before: baseValues,
            after: {
                emissions: Math.round(baseValues.emissions * (1 - optimization)),
                energy: Math.round(baseValues.energy * (1 - optimization * 0.8)),
                cost: Math.round(baseValues.cost * (1 - optimization * 0.6)),
                efficiency: Math.round(baseValues.efficiency + (optimization * 30))
            },
            savings: {
                emissions: Math.round(baseValues.emissions * optimization),
                energy: Math.round(baseValues.energy * optimization * 0.8),
                cost: Math.round(baseValues.cost * optimization * 0.6),
                money: Math.round(baseValues.cost * optimization * 0.6 * 1000) // Convert to dollars
            }
        };
    }

    updateResults(results) {
        // Update comparison metrics
        document.querySelector('.comparison-item.before .metric-value:nth-child(1)').textContent = results.before.emissions;
        document.querySelector('.comparison-item.before .metric-value:nth-child(2)').textContent = results.before.energy + 'K';
        document.querySelector('.comparison-item.before .metric-value:nth-child(3)').textContent = '$' + (results.before.cost / 1000).toFixed(1) + 'M';

        document.querySelector('.comparison-item.after .metric-value:nth-child(1)').textContent = results.after.emissions;
        document.querySelector('.comparison-item.after .metric-value:nth-child(2)').textContent = results.after.energy + 'K';
        document.querySelector('.comparison-item.after .metric-value:nth-child(3)').textContent = '$' + (results.after.cost / 1000).toFixed(1) + 'M';

        // Update savings summary
        const emissionReduction = Math.round((results.before.emissions - results.after.emissions) / results.before.emissions * 100);
        const energyReduction = Math.round((results.before.energy - results.after.energy) / results.before.energy * 100);

        document.querySelectorAll('.saving-value')[0].textContent = `-${emissionReduction}%`;
        document.querySelectorAll('.saving-value')[1].textContent = `-${energyReduction}%`;
        document.querySelectorAll('.saving-value')[2].textContent = `$${(results.savings.money / 1000000).toFixed(1)}M`;

        // Update chart
        this.chart.data.datasets[0].data = [
            results.before.emissions,
            results.before.energy,
            results.before.cost,
            results.before.efficiency
        ];
        this.chart.data.datasets[1].data = [
            results.after.emissions,
            results.after.energy,
            results.after.cost,
            results.after.efficiency
        ];
        this.chart.update();
    }

    animateResults() {
        // Add pulse animation to results
        const resultsCard = document.querySelector('.simulation-results');
        resultsCard.style.animation = 'pulse 2s ease-in-out';

        setTimeout(() => {
            resultsCard.style.animation = '';
        }, 2000);
    }

    setupRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            if (!this.isSimulating) {
                this.updateLiveMetrics();
            }
        }, 5000);
    }

    updateLiveMetrics() {
        // Random small improvements to show progress
        const metrics = document.querySelectorAll('.impact-value');
        metrics.forEach(metric => {
            const current = parseInt(metric.textContent.replace(/[^\d]/g, ''));
            const improvement = Math.random() * 2;
            const newValue = current + improvement;

            // Animate the number change
            this.animateValue(metric, current, Math.round(newValue), 1000);
        });
    }

    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Initialize simulation manager
document.addEventListener('DOMContentLoaded', () => {
    new SimulationManager();
});