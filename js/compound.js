document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeSwitch) themeSwitch.checked = true;
    }
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
                if (themeSwitch.checked) {
                    htmlElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                } else {
                    htmlElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
    }

    const soundBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    let soundEnabled = true;
    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundIcon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    });

    // Compound Interest Logic
    const calcBtn = document.getElementById('calc-compound-btn');
    const resultContainer = document.getElementById('compound-result-container');

    const initialAmountInput = document.getElementById('initial-amount');
    const monthlyContributionInput = document.getElementById('monthly-contribution');
    const yearsGrowInput = document.getElementById('years-grow');
    const interestRateInput = document.getElementById('interest-rate');

    const futureValueEl = document.getElementById('future-value');
    const totalPrincipalEl = document.getElementById('total-principal');
    const totalContributionsEl = document.getElementById('total-contributions');
    const totalInterestEl = document.getElementById('total-interest');

    function formatCurrency(num) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }

    calcBtn.addEventListener('click', () => {
        const principal = parseFloat(initialAmountInput.value) || 0;
        const monthlyContribution = parseFloat(monthlyContributionInput.value) || 0;
        const years = parseFloat(yearsGrowInput.value) || 0;
        const annualRate = parseFloat(interestRateInput.value) || 0;

        if (years <= 0) {
            alert("Please enter a valid number of years.");
            return;
        }

        const monthlyRate = (annualRate / 100) / 12;
        const totalMonths = years * 12;

        let futureValue = 0;

        if (annualRate === 0) {
            futureValue = principal + (monthlyContribution * totalMonths);
        } else {
            const mathPower = Math.pow(1 + monthlyRate, totalMonths);
            // Compound interest for principal
            const principalGrowth = principal * mathPower;
            // Future value of a series for monthly contributions (assuming end of month)
            const contributionGrowth = monthlyContribution * ((mathPower - 1) / monthlyRate);
            futureValue = principalGrowth + contributionGrowth;
        }

        const totalContributions = monthlyContribution * totalMonths;
        const totalInvested = principal + totalContributions;
        const totalInterest = futureValue - totalInvested;

        futureValueEl.textContent = formatCurrency(futureValue);
        totalPrincipalEl.textContent = "$" + formatCurrency(principal);
        totalContributionsEl.textContent = "$" + formatCurrency(totalContributions);
        totalInterestEl.textContent = "$" + formatCurrency(totalInterest > 0 ? totalInterest : 0);

        resultContainer.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.hostname === window.location.hostname && link.getAttribute('href') !== '#' && !link.getAttribute('href').startsWith('javascript:')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const wrapper = document.querySelector('.calculator-wrapper') || document.querySelector('.dashboard-wrapper');
                if (wrapper) {
                    wrapper.classList.add('page-exit');
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 150);
                } else {
                    window.location.href = link.href;
                }
            });
        }
    });
});
