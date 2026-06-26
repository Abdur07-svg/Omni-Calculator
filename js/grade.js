document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calc-grade-btn');
    const clearBtn = document.getElementById('clear-grade-btn');
    const addRowBtn = document.getElementById('add-row-btn');
    const rowsContainer = document.getElementById('grade-rows');
    const resultContainer = document.getElementById('grade-result-container');
    const mainResult = document.getElementById('grade-main-result');
    const detailsResult = document.getElementById('grade-details');

    const defaultRows = 5;

    // Standard letter grade mapping
    const letterGrades = {
        'A+': 100, 'A': 95, 'A-': 90,
        'B+': 87, 'B': 85, 'B-': 80,
        'C+': 77, 'C': 75, 'C-': 70,
        'D+': 67, 'D': 65, 'D-': 60,
        'F': 0
    };

    function parseGrade(val) {
        if (!val) return null;
        val = val.trim().toUpperCase();
        if (letterGrades.hasOwnProperty(val)) {
            return letterGrades[val];
        }
        const num = parseFloat(val);
        if (!isNaN(num)) return num;
        return null;
    }

    function createRow(name = '', grade = '', weight = '') {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '5px';
        row.style.marginBottom = '10px';
        
        row.innerHTML = `
            <input type="text" class="custom-input assignment-name" placeholder="Homework" style="flex: 2; padding: 10px;" value="${name}">
            <input type="text" class="custom-input assignment-grade" placeholder="90 or A" style="flex: 1.2; padding: 10px;" value="${grade}">
            <div style="flex: 1.2; display: flex; align-items: center; position: relative;">
                <input type="number" class="custom-input assignment-weight" style="width: 100%; padding: 10px; padding-right: 25px;" value="${weight}">
                <span style="position: absolute; right: 10px; color: var(--text-secondary);">%</span>
            </div>
            <button class="remove-row-btn" style="background: transparent; border: none; color: #ef4444; cursor: pointer; padding: 0 5px;"><i class="fa-solid fa-xmark"></i></button>
        `;
        
        row.querySelector('.remove-row-btn').addEventListener('click', () => {
            row.remove();
        });
        
        return row;
    }

    function initRows() {
        if(!rowsContainer) return;
        rowsContainer.innerHTML = '';
        for (let i = 0; i < defaultRows; i++) {
            rowsContainer.appendChild(createRow());
        }
    }

    if(addRowBtn) {
        addRowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            rowsContainer.appendChild(createRow());
        });
    }

    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            initRows();
            const goalGrade = document.getElementById('goal-grade');
            const goalWeight = document.getElementById('goal-weight');
            if (goalGrade) goalGrade.value = '';
            if (goalWeight) goalWeight.value = '';
            if (resultContainer) resultContainer.style.display = 'none';
        });
    }

    if(calcBtn) {
        calcBtn.addEventListener('click', () => {
            const gradeInputs = document.querySelectorAll('.assignment-grade');
            const weightInputs = document.querySelectorAll('.assignment-weight');
            
            let totalWeight = 0;
            let weightedSum = 0;
            
            let hasValidInput = false;

            for (let i = 0; i < gradeInputs.length; i++) {
                const gVal = gradeInputs[i].value;
                const wVal = weightInputs[i].value;
                
                if (gVal && wVal) {
                    const grade = parseGrade(gVal);
                    const weight = parseFloat(wVal);
                    
                    if (grade !== null && !isNaN(weight)) {
                        weightedSum += grade * weight;
                        totalWeight += weight;
                        hasValidInput = true;
                    }
                }
            }

            if (!hasValidInput) {
                if(mainResult) mainResult.innerHTML = `<span style="color: #ef4444; font-size: 1.5rem;">Enter at least one valid grade and weight</span>`;
                if(detailsResult) detailsResult.innerHTML = '';
                if(resultContainer) resultContainer.style.display = 'block';
                return;
            }

            const currentAvg = weightedSum / totalWeight;
            
            const goalGradeVal = document.getElementById('goal-grade') ? document.getElementById('goal-grade').value : '';
            const goalWeightVal = document.getElementById('goal-weight') ? document.getElementById('goal-weight').value : '';
            
            let html = `<div>Current Average: <span style="color: #38bdf8; font-weight: 600;">${currentAvg.toFixed(2)}%</span></div>`;
            let details = `Total weight accounted for: ${totalWeight.toFixed(2)}%`;
            
            if (goalGradeVal && goalWeightVal) {
                const goal = parseFloat(goalGradeVal);
                const remainW = parseFloat(goalWeightVal);
                
                if (!isNaN(goal) && !isNaN(remainW) && remainW > 0) {
                    // Needed = (Goal * (totalWeight + remainW) - weightedSum) / remainW
                    const needed = (goal * (totalWeight + remainW) - weightedSum) / remainW;
                    
                    html += `<div style="margin-top: 15px; font-size: 1.2rem;">You need: <span style="color: ${needed > 100 ? '#ef4444' : '#22c55e'}; font-size: 1.8rem; font-weight: 600;">${needed.toFixed(2)}%</span></div>`;
                    html += `<div style="font-size: 1rem; color: var(--text-secondary);">on your remaining tasks to hit your goal.</div>`;
                }
            }
            
            if(mainResult) mainResult.innerHTML = html;
            if(detailsResult) detailsResult.innerHTML = `<p>${details}</p>`;
            if(resultContainer) resultContainer.style.display = 'block';
        });
    }

    // Initialize
    initRows();
});
