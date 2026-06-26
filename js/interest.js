document.addEventListener('DOMContentLoaded', () => {
    const prinIn = document.getElementById('int-principal');
    const rateIn = document.getElementById('int-rate');
    const timeIn = document.getElementById('int-time');
    const btnCalc = document.getElementById('calc-int-btn');
    const resContainer = document.getElementById('int-result-container');
    const intOut = document.getElementById('int-total');
    const details = document.getElementById('int-details');

    btnCalc.addEventListener('click', () => {
        const principal = parseFloat(prinIn.value) || 0;
        const rate = parseFloat(rateIn.value) || 0;
        const time = parseFloat(timeIn.value) || 0;

        if (principal <= 0 || time <= 0) {
            intOut.textContent = 'Error';
            details.innerHTML = '<p style="color:#ef4444; border:none; justify-content:center;">Principal and time must be positive numbers.</p>';
            resContainer.style.display = 'block';
            return;
        }

        const interest = principal * (rate / 100) * time;
        const totalAmount = principal + interest;

        intOut.textContent = '$' + interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        details.innerHTML = `
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Principal: <span>$${principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
            <p style="padding-top: 5px;">Total Amount: <span>$${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
        `;
        resContainer.style.display = 'block';
    });
});
