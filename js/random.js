document?.addEventListener('DOMContentLoaded', () => {
    const minIn = document.getElementById('rand-min');
    const maxIn = document.getElementById('rand-max');
    const countIn = document.getElementById('rand-count');
    const genBtn = document.getElementById('calc-rand-btn');
    const resContainer = document.getElementById('rand-result-container');
    const mainResult = document.getElementById('rand-main-result');

    genBtn?.addEventListener('click', () => {
        const min = parseInt(minIn.value);
        const max = parseInt(maxIn.value);
        let count = parseInt(countIn.value);

        if (isNaN(min) || isNaN(max) || isNaN(count)) {
            mainResult.textContent = 'Error';
            mainResult.style.color = '#ef4444';
            resContainer.style.display = 'block';
            return;
        }

        if (min > max) {
            mainResult.textContent = 'Min must be ≤ Max';
            mainResult.style.fontSize = '1.5rem';
            mainResult.style.color = '#ef4444';
            resContainer.style.display = 'block';
            return;
        }
        
        if (count < 1) count = 1;
        if (count > 5000) count = 5000;

        const results = [];
        for(let i=0; i<count; i++) {
            // Using Math.random() is sufficient for simple random number generation here
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            results.push(num);
        }

        mainResult.style.color = 'var(--calc-accent)';
        if (count === 1) {
            mainResult.style.fontSize = '3.5rem';
            mainResult.textContent = results[0];
        } else {
            mainResult.style.fontSize = '1.5rem';
            mainResult.textContent = results.join(', ');
        }
        
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
