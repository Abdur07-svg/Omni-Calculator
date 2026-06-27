document?.addEventListener('DOMContentLoaded', () => {
    const btnCalc = document.getElementById('calc-tri-btn');
    const resContainer = document.getElementById('tri-result-container');
    const details = document.getElementById('tri-details');

    const inSideA = document.getElementById('tri-side-a');
    const inSideB = document.getElementById('tri-side-b');
    const inSideC = document.getElementById('tri-side-c');
    const inAngleA = document.getElementById('tri-angle-a');
    const inAngleB = document.getElementById('tri-angle-b');
    const inAngleC = document.getElementById('tri-angle-c');
    const unitSel = document.getElementById('angle-unit');

    // Utility functions for angles
    const toRad = (val, isDeg) => isDeg ? val * Math.PI / 180 : val;
    const degToRadStr = (val, isDeg) => isDeg ? `${parseFloat((val * 180 / Math.PI).toFixed(4))}&deg;` : `${parseFloat(val.toFixed(4))} rad`;

    btnCalc?.addEventListener('click', () => {
        let a = parseFloat(inSideA.value);
        let b = parseFloat(inSideB.value);
        let c = parseFloat(inSideC.value);
        let A = parseFloat(inAngleA.value);
        let B = parseFloat(inAngleB.value);
        let C = parseFloat(inAngleC.value);
        
        const isDeg = unitSel.value === 'degree';

        // Convert provided angles to radians for internal math
        if (!isNaN(A)) A = toRad(A, isDeg);
        if (!isNaN(B)) B = toRad(B, isDeg);
        if (!isNaN(C)) C = toRad(C, isDeg);

        let iter = 0;
        let madeProgress = true;
        
        // Iterative solver using Law of Sines, Law of Cosines, and Angle Sum
        while (iter < 10 && madeProgress) {
            madeProgress = false;
            iter++;

            // Angle sum: A + B + C = PI
            if (isNaN(A) && !isNaN(B) && !isNaN(C)) { A = Math.PI - B - C; madeProgress = true; }
            if (isNaN(B) && !isNaN(A) && !isNaN(C)) { B = Math.PI - A - C; madeProgress = true; }
            if (isNaN(C) && !isNaN(A) && !isNaN(B)) { C = Math.PI - A - B; madeProgress = true; }

            // Law of Sines: a/sinA = b/sinB = c/sinC
            if (!isNaN(a) && !isNaN(A)) {
                let ratio = a / Math.sin(A);
                if (isNaN(b) && !isNaN(B)) { b = ratio * Math.sin(B); madeProgress = true; }
                if (isNaN(c) && !isNaN(C)) { c = ratio * Math.sin(C); madeProgress = true; }
                if (isNaN(B) && !isNaN(b)) { B = Math.asin(b / ratio); madeProgress = true; }
                if (isNaN(C) && !isNaN(c)) { C = Math.asin(c / ratio); madeProgress = true; }
            }
            if (!isNaN(b) && !isNaN(B)) {
                let ratio = b / Math.sin(B);
                if (isNaN(a) && !isNaN(A)) { a = ratio * Math.sin(A); madeProgress = true; }
                if (isNaN(c) && !isNaN(C)) { c = ratio * Math.sin(C); madeProgress = true; }
                if (isNaN(A) && !isNaN(a)) { A = Math.asin(a / ratio); madeProgress = true; }
                if (isNaN(C) && !isNaN(c)) { C = Math.asin(c / ratio); madeProgress = true; }
            }
            if (!isNaN(c) && !isNaN(C)) {
                let ratio = c / Math.sin(C);
                if (isNaN(a) && !isNaN(A)) { a = ratio * Math.sin(A); madeProgress = true; }
                if (isNaN(b) && !isNaN(B)) { b = ratio * Math.sin(B); madeProgress = true; }
                if (isNaN(A) && !isNaN(a)) { A = Math.asin(a / ratio); madeProgress = true; }
                if (isNaN(B) && !isNaN(b)) { B = Math.asin(b / ratio); madeProgress = true; }
            }

            // Law of Cosines: a^2 = b^2 + c^2 - 2bc*cosA
            if (!isNaN(b) && !isNaN(c) && !isNaN(A) && isNaN(a)) { a = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(A)); madeProgress = true; }
            if (!isNaN(a) && !isNaN(c) && !isNaN(B) && isNaN(b)) { b = Math.sqrt(a*a + c*c - 2*a*c*Math.cos(B)); madeProgress = true; }
            if (!isNaN(a) && !isNaN(b) && !isNaN(C) && isNaN(c)) { c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(C)); madeProgress = true; }

            if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
                if (isNaN(A)) { A = Math.acos((b*b + c*c - a*a) / (2*b*c)); madeProgress = true; }
                if (isNaN(B)) { B = Math.acos((a*a + c*c - b*b) / (2*a*c)); madeProgress = true; }
                if (isNaN(C)) { C = Math.acos((a*a + b*b - c*c) / (2*a*b)); madeProgress = true; }
            }
        }

        // Validate
        let errorMsg = '';
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(A) || isNaN(B) || isNaN(C)) {
            errorMsg = 'Please enter at least 3 valid values (must include at least 1 side) to solve the triangle.';
        } else if (a + b <= c || a + c <= b || b + c <= a) {
            errorMsg = 'Invalid triangle: The given sides or angles cannot form a closed triangle.';
        } else if (Math.abs(A + B + C - Math.PI) > 0.01) {
            let expected = isDeg ? '180 degrees' : 'π (approx 3.14159) radians';
            errorMsg = `Invalid triangle: The sum of angles must equal ${expected}.`;
        }

        if (errorMsg) {
            details.innerHTML = `<p style="color:#ef4444; border:none; justify-content:center;">${errorMsg}</p>`;
            resContainer.style.display = 'block';
            return;
        }

        // Output formatting
        const perimeter = a + b + c;
        const s = perimeter / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

        details.innerHTML = `
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Area: <span style="color:var(--calc-accent); font-weight:bold;">${parseFloat(area.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Perimeter: <span>${parseFloat(perimeter.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Side a: <span>${parseFloat(a.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Side b: <span>${parseFloat(b.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Side c: <span>${parseFloat(c.toFixed(4))}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Angle A: <span>${degToRadStr(A, isDeg)}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Angle B: <span>${degToRadStr(B, isDeg)}</span></p>
            <p style="padding-top: 5px;">Angle C: <span>${degToRadStr(C, isDeg)}</span></p>
        `;
        resContainer.style.display = 'block';

        // Auto-fill inputs
        inSideA.value = parseFloat(a.toFixed(4));
        inSideB.value = parseFloat(b.toFixed(4));
        inSideC.value = parseFloat(c.toFixed(4));
        inAngleA.value = parseFloat((isDeg ? A * 180/Math.PI : A).toFixed(4));
        inAngleB.value = parseFloat((isDeg ? B * 180/Math.PI : B).toFixed(4));
        inAngleC.value = parseFloat((isDeg ? C * 180/Math.PI : C).toFixed(4));
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
