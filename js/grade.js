document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calc-grade-btn');
    const resultContainer = document.getElementById('grade-result-container');
    const mainResult = document.getElementById('grade-main-result');
    const detailsResult = document.getElementById('grade-details');

    calcBtn.addEventListener('click', () => {
        const current = parseFloat(document.getElementById('grade-current').value);
        const target = parseFloat(document.getElementById('grade-target').value);
        const weight = parseFloat(document.getElementById('grade-weight').value);

        if (isNaN(current) || isNaN(target) || isNaN(weight) || weight <= 0 || weight >= 100) {
            mainResult.innerHTML = `<span style="color: #ef4444; font-size: 1.5rem;">Enter valid numbers (weight between 1-99)</span>`;
            detailsResult.innerHTML = '';
            resultContainer.style.display = 'block';
            return;
        }

        // Formula: Required = (Target - Current * (1 - Weight)) / Weight
        const w = weight / 100;
        const required = (target - current * (1 - w)) / w;

        let color = '#22c55e';
        if (required > 100) color = '#ef4444';
        else if (required > 90) color = '#eab308';
        else if (required < 0) color = '#3b82f6';

        mainResult.style.color = color;
        mainResult.innerHTML = `${required.toFixed(2)}%`;
        
        let msg = '';
        if (required > 100) {
            msg = "It's mathematically impossible without extra credit! 😭";
        } else if (required < 0) {
            msg = "You already achieved your target grade! 🎉";
        } else {
            msg = "You can do this! Good luck on your final! 📚";
        }

        detailsResult.innerHTML = `<p>${msg}</p>`;
        resultContainer.style.display = 'block';
    });
});
