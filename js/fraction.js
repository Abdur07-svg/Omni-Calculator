document.addEventListener('DOMContentLoaded', () => {
    const n1In = document.getElementById('n1');
    const d1In = document.getElementById('d1');
    const n2In = document.getElementById('n2');
    const d2In = document.getElementById('d2');
    const opSel = document.getElementById('frac-op');
    const calcBtn = document.getElementById('calc-frac-btn');
    const resultContainer = document.getElementById('frac-result-container');
    const resN = document.getElementById('res-n');
    const resD = document.getElementById('res-d');
    const resMixed = document.getElementById('res-mixed');
    const fracResult = document.getElementById('frac-result');

    function gcd(a, b) {
        return b ? gcd(b, a % b) : Math.abs(a);
    }

    calcBtn.addEventListener('click', () => {
        let n1 = parseInt(n1In.value);
        let d1 = parseInt(d1In.value);
        let n2 = parseInt(n2In.value);
        let d2 = parseInt(d2In.value);
        
        if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
            resMixed.textContent = 'Invalid input';
            resMixed.style.color = '#ef4444';
            fracResult.style.display = 'none';
            resultContainer.style.display = 'flex';
            return;
        }

        if (d1 === 0 || d2 === 0) {
            resMixed.textContent = 'Div by zero';
            resMixed.style.color = '#ef4444';
            fracResult.style.display = 'none';
            resultContainer.style.display = 'flex';
            return;
        }

        let rn = 0, rd = 1;
        const op = opSel.value;
        
        if (op === '+') {
            rn = (n1 * d2) + (n2 * d1);
            rd = d1 * d2;
        } else if (op === '-') {
            rn = (n1 * d2) - (n2 * d1);
            rd = d1 * d2;
        } else if (op === '*') {
            rn = n1 * n2;
            rd = d1 * d2;
        } else if (op === '/') {
            if (n2 === 0) {
                resMixed.textContent = 'Div by zero';
                resMixed.style.color = '#ef4444';
                fracResult.style.display = 'none';
                resultContainer.style.display = 'flex';
                return;
            }
            rn = n1 * d2;
            rd = d1 * n2;
        }

        // Simplify
        const divisor = gcd(rn, rd);
        rn /= divisor;
        rd /= divisor;

        // Handle negative denominator
        if (rd < 0) {
            rn *= -1;
            rd *= -1;
        }

        resMixed.style.color = 'var(--text-secondary)';
        fracResult.style.display = 'flex';
        
        if (rd === 1) {
            fracResult.innerHTML = `<span id="res-n">${rn}</span>`;
            resMixed.textContent = '';
        } else {
            fracResult.innerHTML = `
                <span id="res-n">${rn}</span>
                <div style="height: 3px; width: 100%; background-color: var(--calc-accent);"></div>
                <span id="res-d">${rd}</span>
            `;
            
            if (Math.abs(rn) > rd) {
                const whole = Math.trunc(rn / rd);
                const rem = Math.abs(rn % rd);
                resMixed.textContent = `(or ${whole} ${rem}/${rd})`;
            } else {
                resMixed.textContent = '';
            }
        }
        
        resultContainer.style.display = 'flex';
    });
});
