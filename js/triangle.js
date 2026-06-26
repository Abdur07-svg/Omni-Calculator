document.addEventListener('DOMContentLoaded', () => {
    const methodSelect = document.getElementById('tri-method');
    const inputsBH = document.getElementById('inputs-base-height');
    const inputs3S = document.getElementById('inputs-3-sides');
    const btnCalc = document.getElementById('calc-tri-btn');
    const resContainer = document.getElementById('tri-result-container');
    const details = document.getElementById('tri-details');

    const inBase = document.getElementById('tri-base');
    const inHeight = document.getElementById('tri-height');
    const inA = document.getElementById('tri-a');
    const inB = document.getElementById('tri-b');
    const inC = document.getElementById('tri-c');

    methodSelect.addEventListener('change', () => {
        if (methodSelect.value === 'base-height') {
            inputsBH.style.display = 'flex';
            inputs3S.style.display = 'none';
        } else {
            inputsBH.style.display = 'none';
            inputs3S.style.display = 'flex';
        }
        resContainer.style.display = 'none';
    });

    btnCalc.addEventListener('click', () => {
        if (methodSelect.value === 'base-height') {
            const b = parseFloat(inBase.value);
            const h = parseFloat(inHeight.value);

            if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
                details.innerHTML = '<p style="color:#ef4444; border:none; justify-content:center;">Please enter positive numbers for Base and Height.</p>';
                resContainer.style.display = 'block';
                return;
            }

            const area = 0.5 * b * h;
            details.innerHTML = `
                <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Area: <span style="color:var(--calc-accent); font-weight:bold;">${parseFloat(area.toFixed(4))}</span></p>
                <p style="padding-top: 5px; color:var(--text-secondary); justify-content:center; font-size:0.9rem;">(Perimeter and Angles cannot be calculated without 3 sides)</p>
            `;
            resContainer.style.display = 'block';
        } else {
            const a = parseFloat(inA.value);
            const b = parseFloat(inB.value);
            const c = parseFloat(inC.value);

            if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
                details.innerHTML = '<p style="color:#ef4444; border:none; justify-content:center;">Please enter positive numbers for all 3 sides.</p>';
                resContainer.style.display = 'block';
                return;
            }

            // Check if valid triangle
            if (a + b <= c || a + c <= b || b + c <= a) {
                details.innerHTML = '<p style="color:#ef4444; border:none; justify-content:center;">Invalid triangle: The sum of two sides must be greater than the third.</p>';
                resContainer.style.display = 'block';
                return;
            }

            const perimeter = a + b + c;
            const s = perimeter / 2;
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

            // Law of Cosines
            const angleA = Math.acos((b*b + c*c - a*a) / (2*b*c)) * (180 / Math.PI);
            const angleB = Math.acos((a*a + c*c - b*b) / (2*a*c)) * (180 / Math.PI);
            const angleC = 180 - angleA - angleB;

            details.innerHTML = `
                <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Area: <span style="color:var(--calc-accent); font-weight:bold;">${parseFloat(area.toFixed(4))}</span></p>
                <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Perimeter: <span>${parseFloat(perimeter.toFixed(4))}</span></p>
                <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Angle A: <span>${parseFloat(angleA.toFixed(2))}°</span></p>
                <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Angle B: <span>${parseFloat(angleB.toFixed(2))}°</span></p>
                <p style="padding-top: 5px;">Angle C: <span>${parseFloat(angleC.toFixed(2))}°</span></p>
            `;
            resContainer.style.display = 'block';
        }
    });
});
