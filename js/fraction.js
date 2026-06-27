document?.addEventListener('DOMContentLoaded', () => {
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

    calcBtn?.addEventListener('click', () => {
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

    // --- Mixed Numbers Calculator ---
    const calcMnBtn = document.getElementById('calc-mn-btn');
    if (calcMnBtn) {
        calcMnBtn?.addEventListener('click', () => {
            const w1Str = document.getElementById('mn-w1').value.trim();
            const n1 = parseInt(document.getElementById('mn-n1').value) || 0;
            const d1 = parseInt(document.getElementById('mn-d1').value) || 1;
            
            const w2Str = document.getElementById('mn-w2').value.trim();
            const n2 = parseInt(document.getElementById('mn-n2').value) || 0;
            const d2 = parseInt(document.getElementById('mn-d2').value) || 1;
            
            const op = document.getElementById('mn-op').value;
            const resContainer = document.getElementById('mn-result-container');

            if (d1 === 0 || d2 === 0) {
                resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Div by zero</span>';
                resContainer.style.display = 'flex';
                return;
            }

            let isNeg1 = w1Str.startsWith('-');
            let w1 = Math.abs(parseInt(w1Str) || 0);
            let num1 = w1 * d1 + n1;
            if (isNeg1) num1 = -num1;

            let isNeg2 = w2Str.startsWith('-');
            let w2 = Math.abs(parseInt(w2Str) || 0);
            let num2 = w2 * d2 + n2;
            if (isNeg2) num2 = -num2;

            let rn = 0, rd = 1;
            if (op === '+') {
                rn = (num1 * d2) + (num2 * d1);
                rd = d1 * d2;
            } else if (op === '-') {
                rn = (num1 * d2) - (num2 * d1);
                rd = d1 * d2;
            } else if (op === '*') {
                rn = num1 * num2;
                rd = d1 * d2;
            } else if (op === '/') {
                if (num2 === 0) {
                    resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Div by zero</span>';
                    resContainer.style.display = 'flex';
                    return;
                }
                rn = num1 * d2;
                rd = d1 * num2;
            }

            const divisor = gcd(rn, rd);
            rn /= divisor;
            rd /= divisor;

            if (rd < 0) {
                rn *= -1;
                rd *= -1;
            }

            let html = '<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 2rem; color: var(--text-primary);">=' +
                       '</span><div style="display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 1.8rem; font-weight: bold; color: var(--calc-accent);">';
            
            if (rd === 1) {
                html += `<span>${rn}</span></div>`;
            } else {
                html += `<span>${rn}</span><div style="height: 3px; width: 100%; background-color: var(--calc-accent);"></div><span>${rd}</span></div>`;
                if (Math.abs(rn) > rd) {
                    let wRes = Math.trunc(rn / rd);
                    let remRes = Math.abs(rn % rd);
                    html += `<span style="font-size: 1.5rem; color: var(--text-secondary); margin-left: 10px;">(or ${wRes} ${remRes}/${rd})</span>`;
                }
            }
            html += '</div>';
            resContainer.innerHTML = html;
            resContainer.style.display = 'flex';
        });
    }

    // --- Simplify Fractions Calculator ---
    const calcSimpBtn = document.getElementById('calc-simp-btn');
    if (calcSimpBtn) {
        calcSimpBtn?.addEventListener('click', () => {
            const wStr = document.getElementById('simp-w').value.trim();
            const n = parseInt(document.getElementById('simp-n').value) || 0;
            const d = parseInt(document.getElementById('simp-d').value) || 1;
            const resContainer = document.getElementById('simp-result-container');

            if (d === 0) {
                resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Div by zero</span>';
                resContainer.style.display = 'flex';
                return;
            }

            let isNeg = wStr.startsWith('-');
            let w = Math.abs(parseInt(wStr) || 0);
            let num = w * d + n;
            if (isNeg) num = -num;

            const divisor = gcd(num, d);
            let rn = num / divisor;
            let rd = d / divisor;

            if (rd < 0) {
                rn *= -1;
                rd *= -1;
            }

            let html = '<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 2rem; color: var(--text-primary);">=' +
                       '</span><div style="display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 1.8rem; font-weight: bold; color: var(--calc-accent);">';
            
            if (rd === 1) {
                html += `<span>${rn}</span></div>`;
            } else {
                html += `<span>${rn}</span><div style="height: 3px; width: 100%; background-color: var(--calc-accent);"></div><span>${rd}</span></div>`;
                if (Math.abs(rn) > rd) {
                    let wRes = Math.trunc(rn / rd);
                    let remRes = Math.abs(rn % rd);
                    html += `<span style="font-size: 1.5rem; color: var(--text-secondary); margin-left: 10px;">(or ${wRes} ${remRes}/${rd})</span>`;
                }
            }
            html += '</div>';
            resContainer.innerHTML = html;
            resContainer.style.display = 'flex';
        });
    }

    // --- Decimal to Fraction Calculator ---
    const calcD2fBtn = document.getElementById('calc-dec-to-frac-btn');
    if (calcD2fBtn) {
        calcD2fBtn?.addEventListener('click', () => {
            const valStr = document.getElementById('dec-val').value.trim();
            const resContainer = document.getElementById('d2f-result-container');

            if (!valStr || isNaN(valStr)) {
                resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Invalid input</span>';
                resContainer.style.display = 'flex';
                return;
            }

            let numStr = valStr;
            let decPlaces = 0;
            if (numStr.includes('.')) {
                decPlaces = numStr.split('.')[1].length;
            }

            let multiplier = Math.pow(10, decPlaces);
            let num = Math.round(parseFloat(numStr) * multiplier);
            let den = multiplier;

            const divisor = gcd(num, den);
            num /= divisor;
            den /= divisor;

            let html = '<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 2rem; color: var(--text-primary);">=' +
                       '</span><div style="display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 1.8rem; font-weight: bold; color: var(--calc-accent);">';
            
            if (den === 1) {
                html += `<span>${num}</span></div>`;
            } else {
                html += `<span>${num}</span><div style="height: 3px; width: 100%; background-color: var(--calc-accent);"></div><span>${den}</span></div>`;
                if (Math.abs(num) > den) {
                    let wRes = Math.trunc(num / den);
                    let remRes = Math.abs(num % den);
                    html += `<span style="font-size: 1.5rem; color: var(--text-secondary); margin-left: 10px;">(or ${wRes} ${remRes}/${den})</span>`;
                }
            }
            html += '</div>';
            resContainer.innerHTML = html;
            resContainer.style.display = 'flex';
        });
    }

    // --- Fraction to Decimal Calculator ---
    const calcF2dBtn = document.getElementById('calc-frac-to-dec-btn');
    if (calcF2dBtn) {
        calcF2dBtn?.addEventListener('click', () => {
            const n = parseFloat(document.getElementById('f2d-n').value);
            const d = parseFloat(document.getElementById('f2d-d').value);
            const resContainer = document.getElementById('f2d-result-container');

            if (isNaN(n) || isNaN(d)) {
                resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Invalid input</span>';
                resContainer.style.display = 'flex';
                return;
            }

            if (d === 0) {
                resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Div by zero</span>';
                resContainer.style.display = 'flex';
                return;
            }

            let res = n / d;

            resContainer.innerHTML = `<span style="font-size: 2rem; color: var(--text-primary);">=</span><span style="font-size: 2rem; font-weight: bold; color: var(--calc-accent); margin-left: 15px;">${res}</span>`;
            resContainer.style.display = 'flex';
        });
    }

    // --- Big Number Fraction Calculator ---
    function bigGcd(a, b) {
        if (a < 0n) a = -a;
        if (b < 0n) b = -b;
        while (b !== 0n) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    const calcBfracBtn = document.getElementById('calc-bfrac-btn');
    if (calcBfracBtn) {
        calcBfracBtn?.addEventListener('click', () => {
            let n1Str = document.getElementById('bn1').value.trim() || '0';
            let d1Str = document.getElementById('bd1').value.trim() || '1';
            let n2Str = document.getElementById('bn2').value.trim() || '0';
            let d2Str = document.getElementById('bd2').value.trim() || '1';
            const op = document.getElementById('bfrac-op').value;
            const resContainer = document.getElementById('bfrac-result-container');

            try {
                let num1 = BigInt(n1Str);
                let den1 = BigInt(d1Str);
                let num2 = BigInt(n2Str);
                let den2 = BigInt(d2Str);

                if (den1 === 0n || den2 === 0n) {
                    resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Div by zero</span>';
                    resContainer.style.display = 'flex';
                    return;
                }

                let rn = 0n, rd = 1n;
                if (op === '+') {
                    rn = (num1 * den2) + (num2 * den1);
                    rd = den1 * den2;
                } else if (op === '-') {
                    rn = (num1 * den2) - (num2 * den1);
                    rd = den1 * den2;
                } else if (op === '*') {
                    rn = num1 * num2;
                    rd = den1 * den2;
                } else if (op === '/') {
                    if (num2 === 0n) {
                        resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Div by zero</span>';
                        resContainer.style.display = 'flex';
                        return;
                    }
                    rn = num1 * den2;
                    rd = den1 * num2;
                }

                const divisor = bigGcd(rn, rd);
                rn /= divisor;
                rd /= divisor;

                if (rd < 0n) {
                    rn *= -1n;
                    rd *= -1n;
                }

                let html = '<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 2rem; color: var(--text-primary);">=' +
                           '</span><div style="display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 1.8rem; font-weight: bold; color: var(--calc-accent);">';
                
                if (rd === 1n) {
                    html += `<span>${rn.toString()}</span></div>`;
                } else {
                    html += `<span>${rn.toString()}</span><div style="height: 3px; width: 100%; background-color: var(--calc-accent);"></div><span>${rd.toString()}</span></div>`;
                }
                html += '</div>';
                resContainer.innerHTML = html;
                resContainer.style.display = 'flex';
            } catch (e) {
                resContainer.innerHTML = '<span style="color: #ef4444; font-size: 1.5rem;">Invalid big number</span>';
                resContainer.style.display = 'flex';
            }
        });
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
