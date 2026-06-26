document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calc-concrete-btn');
    const resultContainer = document.getElementById('concrete-result-container');
    const mainResult = document.getElementById('concrete-main-result');
    const detailsResult = document.getElementById('concrete-details');

    calcBtn.addEventListener('click', () => {
        const length = parseFloat(document.getElementById('concrete-length').value);
        const lUnit = document.getElementById('concrete-length-unit').value;
        const width = parseFloat(document.getElementById('concrete-width').value);
        const wUnit = document.getElementById('concrete-width-unit').value;
        const depth = parseFloat(document.getElementById('concrete-depth').value);
        const dUnit = document.getElementById('concrete-depth-unit').value;

        if (isNaN(length) || isNaN(width) || isNaN(depth)) {
            mainResult.innerHTML = `<span style="color: #ef4444; font-size: 1.5rem;">Enter valid dimensions</span>`;
            detailsResult.innerHTML = '';
            resultContainer.style.display = 'block';
            return;
        }

        // Convert everything to meters for standard calculation
        let lMeters = lUnit === 'ft' ? length * 0.3048 : length;
        let wMeters = wUnit === 'ft' ? width * 0.3048 : width;
        let dMeters = depth;
        if (dUnit === 'in') dMeters = depth * 0.0254;
        else if (dUnit === 'ft') dMeters = depth * 0.3048;
        else if (dUnit === 'cm') dMeters = depth / 100;

        const volumeCubicMeters = lMeters * wMeters * dMeters;
        const volumeCubicYards = volumeCubicMeters * 1.30795;
        const volumeCubicFeet = volumeCubicMeters * 35.3147;

        // Standard premixed bags yielding:
        // 80lb bag yields approx 0.60 cubic feet
        // 60lb bag yields approx 0.45 cubic feet
        const bags80 = Math.ceil(volumeCubicFeet / 0.60);
        const bags60 = Math.ceil(volumeCubicFeet / 0.45);

        mainResult.style.color = 'var(--text-primary)';
        mainResult.innerHTML = `${volumeCubicYards.toFixed(2)} <span style="font-size: 1rem; color: var(--text-secondary);">Cubic Yards</span>`;
        
        detailsResult.innerHTML = `
            <p>Cubic Meters: <span>${volumeCubicMeters.toFixed(2)} m³</span></p>
            <p>Cubic Feet: <span>${volumeCubicFeet.toFixed(2)} ft³</span></p>
            <hr style="border-color: var(--border-color); margin: 10px 0;">
            <p><strong>Premixed Bags Required:</strong></p>
            <p>80lb Bags: <span>${bags80} bags</span></p>
            <p>60lb Bags: <span>${bags60} bags</span></p>
        `;
        resultContainer.style.display = 'block';
    });
});
