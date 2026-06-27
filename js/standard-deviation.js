document?.addEventListener('DOMContentLoaded', () => {
    const dataInput = document.getElementById('std-data');
    const btnCalc = document.getElementById('calc-std-btn');
    const resContainer = document.getElementById('std-result-container');
    const details = document.getElementById('std-details');

    btnCalc?.addEventListener('click', () => {
        const text = dataInput.value.trim();
        if (!text) {
            details.innerHTML = '<p style="color:#ef4444; border:none; justify-content:center;">Please enter some data.</p>';
            resContainer.style.display = 'block';
            return;
        }

        // Parse numbers, supporting comma, space, and newline separation
        const parts = text.split(/[\s,]+/);
        const data = [];
        
        for (let p of parts) {
            if (p) {
                const num = parseFloat(p);
                if (isNaN(num)) {
                    details.innerHTML = `<p style="color:#ef4444; border:none; justify-content:center;">Invalid number found: '${p}'</p>`;
                    resContainer.style.display = 'block';
                    return;
                }
                data.push(num);
            }
        }

        if (data.length < 2) {
            details.innerHTML = '<p style="color:#ef4444; border:none; justify-content:center;">Please enter at least 2 numbers.</p>';
            resContainer.style.display = 'block';
            return;
        }

        const count = data.length;
        const sum = data.reduce((a, b) => a + b, 0);
        const mean = sum / count;

        const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
        const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

        const popVariance = sumSquaredDiffs / count;
        const popStdDev = Math.sqrt(popVariance);

        const sampleVariance = sumSquaredDiffs / (count - 1);
        const sampleStdDev = Math.sqrt(sampleVariance);

        details.innerHTML = `
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Count: <span>${count}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Sum: <span>${parseFloat(sum.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Mean (Average): <span>${parseFloat(mean.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px; color:var(--text-primary);">Sample SD: <span style="color:var(--calc-accent); font-weight:bold;">${parseFloat(sampleStdDev.toFixed(5))}</span></p>
            <p style="padding-top: 5px;">Population SD: <span>${parseFloat(popStdDev.toFixed(5))}</span></p>
        `;
        resContainer.style.display = 'block';
    });
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
