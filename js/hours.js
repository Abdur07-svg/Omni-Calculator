document?.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calc-hours-btn');
    const resultContainer = document.getElementById('hours-result-container');
    const mainResult = document.getElementById('hours-main-result');
    const detailsResult = document.getElementById('hours-details');

    calcBtn?.addEventListener('click', calculateHours);

    function parseTime(timeStr) {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(':').map(Number);
        return { h, m };
    }

    function calculateHours() {
        const start = parseTime(document.getElementById('hours-start').value);
        const end = parseTime(document.getElementById('hours-end').value);
        const breakMins = parseInt(document.getElementById('hours-break').value) || 0;

        if (!start || !end) {
            showError("Please enter valid start and end times.");
            return;
        }

        let startMins = start.h * 60 + start.m;
        let endMins = end.h * 60 + end.m;

        if (endMins < startMins) {
            // Assume it crosses midnight
            endMins += 24 * 60;
        }

        let diffMins = endMins - startMins - breakMins;
        
        if (diffMins < 0) {
            showError("Break time is longer than total duration.");
            return;
        }

        const h = Math.floor(diffMins / 60);
        const m = diffMins % 60;
        const decimalHours = (diffMins / 60).toFixed(2);

        mainResult.innerHTML = `${h}h ${m}m`;
        detailsResult.innerHTML = `<p>Decimal Hours: <span>${decimalHours} hours</span></p>`;
        resultContainer.style.display = 'block';
    }

    function showError(msg) {
        mainResult.innerHTML = `<span style="color: #ef4444;">${msg}</span>`;
        detailsResult.innerHTML = '';
        resultContainer.style.display = 'block';
    }
});


// Global Enter key listener for all input fields to trigger the calculate button
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') return;
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const calculatorDiv = input.closest('.calculator');
                let calcBtn = null;
                if (calculatorDiv) {
                    calcBtn = calculatorDiv.querySelector('button.action-btn, button[id^="calc-"]');
                }
                
                if (!calcBtn) {
                    calcBtn = document.querySelector('button.action-btn, button[id^="calc-"]');
                }
                
                if (calcBtn) {
                    calcBtn.click();
                }
            }
        });
    });
});
