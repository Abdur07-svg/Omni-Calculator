document?.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('pct-type');
    const valXIn = document.getElementById('val-x');
    const valYIn = document.getElementById('val-y');
    const labelX = document.getElementById('label-x');
    const labelY = document.getElementById('label-y');
    const calcBtn = document.getElementById('calc-pct-btn');
    const resContainer = document.getElementById('pct-result-container');
    const mainResult = document.getElementById('pct-main-result');
    const sentence = document.getElementById('pct-sentence');

    typeSelect?.addEventListener('change', () => {
        const type = typeSelect.value;
        if (type === '1') {
            labelX.textContent = 'Percentage (X%)';
            labelY.textContent = 'Value (Y)';
        } else if (type === '2') {
            labelX.textContent = 'Part (X)';
            labelY.textContent = 'Whole (Y)';
        } else if (type === '3') {
            labelX.textContent = 'Original Value (X)';
            labelY.textContent = 'New Value (Y)';
        }
    });

    calcBtn?.addEventListener('click', () => {
        const type = typeSelect.value;
        const x = parseFloat(valXIn.value);
        const y = parseFloat(valYIn.value);

        if (isNaN(x) || isNaN(y)) {
            mainResult.textContent = 'Error';
            sentence.textContent = 'Please enter valid numbers.';
            mainResult.style.color = '#ef4444';
            resContainer.style.display = 'block';
            return;
        }

        let result = 0;
        let text = '';
        mainResult.style.color = 'var(--calc-accent)';

        if (type === '1') {
            result = (x / 100) * y;
            text = `${x}% of ${y} is ${result.toLocaleString()}`;
        } else if (type === '2') {
            if (y === 0) {
                mainResult.textContent = 'Error';
                mainResult.style.color = '#ef4444';
                sentence.textContent = 'Cannot divide by zero.';
                resContainer.style.display = 'block';
                return;
            }
            result = (x / y) * 100;
            text = `${x} is ${parseFloat(result.toFixed(4))}% of ${y}`;
            result = parseFloat(result.toFixed(4)) + '%';
        } else if (type === '3') {
            if (x === 0) {
                mainResult.textContent = 'Error';
                mainResult.style.color = '#ef4444';
                sentence.textContent = 'Original value cannot be zero.';
                resContainer.style.display = 'block';
                return;
            }
            result = ((y - x) / Math.abs(x)) * 100;
            const incDec = result >= 0 ? 'increase' : 'decrease';
            text = `${Math.abs(parseFloat(result.toFixed(4)))}% ${incDec} from ${x} to ${y}`;
            result = (result > 0 ? '+' : '') + parseFloat(result.toFixed(4)) + '%';
        }

        mainResult.textContent = typeof result === 'number' ? parseFloat(result.toFixed(6)).toLocaleString() : result;
        sentence.textContent = text;
        resContainer.style.display = 'block';
    });
    
    // Trigger change on load to set correct labels
    typeSelect.dispatchEvent(new Event('change'));
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
