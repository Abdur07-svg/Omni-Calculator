document.addEventListener('DOMContentLoaded', () => {
    const calcType = document.getElementById('time-calc-type');
    const modeDifference = document.getElementById('mode-difference');
    const modeAddSub = document.getElementById('mode-add-sub');
    const calcBtn = document.getElementById('calc-time-btn');
    const resultContainer = document.getElementById('time-result-container');
    const mainResult = document.getElementById('time-main-result');
    const detailsResult = document.getElementById('time-details');

    calcType.addEventListener('change', () => {
        if (calcType.value === 'difference') {
            modeDifference.style.display = 'block';
            modeAddSub.style.display = 'none';
        } else {
            modeDifference.style.display = 'none';
            modeAddSub.style.display = 'block';
        }
        resultContainer.style.display = 'none';
    });

    calcBtn.addEventListener('click', () => {
        if (calcType.value === 'difference') {
            calculateDifference();
        } else {
            calculateAddSub();
        }
    });

    function parseTime(timeStr) {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(':').map(Number);
        return { h, m };
    }

    function formatAMPM(hours, minutes) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutesStr + ' ' + ampm;
    }

    function calculateDifference() {
        const start = parseTime(document.getElementById('time-start').value);
        const end = parseTime(document.getElementById('time-end').value);

        if (!start || !end) {
            showError("Please enter valid times.");
            return;
        }

        let startMins = start.h * 60 + start.m;
        let endMins = end.h * 60 + end.m;

        if (endMins < startMins) {
            // Assume it crosses midnight
            endMins += 24 * 60;
        }

        const diffMins = endMins - startMins;
        const h = Math.floor(diffMins / 60);
        const m = diffMins % 60;

        mainResult.innerHTML = `${h} hours, ${m} minutes`;
        detailsResult.innerHTML = `<p>Total Minutes: <span>${diffMins}</span></p>`;
        resultContainer.style.display = 'block';
    }

    function calculateAddSub() {
        const base = parseTime(document.getElementById('time-base').value);
        const op = document.getElementById('time-op').value;
        const hours = parseInt(document.getElementById('time-hours').value) || 0;
        const minutes = parseInt(document.getElementById('time-minutes').value) || 0;

        if (!base) {
            showError("Please enter a valid base time.");
            return;
        }

        let baseMins = base.h * 60 + base.m;
        const totalAddMins = hours * 60 + minutes;

        if (op === 'add') {
            baseMins += totalAddMins;
        } else {
            baseMins -= totalAddMins;
        }

        // Normalize to 24-hour range
        baseMins = ((baseMins % (24 * 60)) + (24 * 60)) % (24 * 60);

        const h = Math.floor(baseMins / 60);
        const m = baseMins % 60;

        mainResult.innerHTML = formatAMPM(h, m);
        detailsResult.innerHTML = `<p>24-hour format: <span>${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}</span></p>`;
        resultContainer.style.display = 'block';
    }

    function showError(msg) {
        mainResult.innerHTML = `<span style="color: #ef4444;">${msg}</span>`;
        detailsResult.innerHTML = '';
        resultContainer.style.display = 'block';
    }
});
