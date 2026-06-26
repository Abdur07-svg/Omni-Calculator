document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    const addCourseBtn = document.getElementById('add-course-btn');
    const calcGpaBtn = document.getElementById('calc-gpa-btn');
    const resultContainer = document.getElementById('gpa-result-container');
    const mainResult = document.getElementById('gpa-main-result');
    const detailsResult = document.getElementById('gpa-details');

    const gradePoints = {
        'A+': 4.3, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'D-': 0.7,
        'F': 0.0
    };

    function createCourseRow() {
        const row = document.createElement('div');
        row.className = 'course-row';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Course Name';
        nameInput.className = 'custom-input course-name-input';

        const creditsInput = document.createElement('input');
        creditsInput.type = 'number';
        creditsInput.placeholder = 'Credits';
        creditsInput.className = 'custom-input course-credits';
        creditsInput.min = '0';

        const gradeSelect = document.createElement('select');
        gradeSelect.className = 'custom-input course-grade';
        const emptyOption = document.createElement('option');
        emptyOption.value = ''; emptyOption.textContent = 'Grade';
        gradeSelect.appendChild(emptyOption);
        
        Object.keys(gradePoints).forEach(g => {
            const opt = document.createElement('option');
            opt.value = g; opt.textContent = g;
            gradeSelect.appendChild(opt);
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.onclick = () => {
            row.remove();
        };

        row.appendChild(nameInput);
        row.appendChild(creditsInput);
        row.appendChild(gradeSelect);
        row.appendChild(removeBtn);
        
        coursesContainer.appendChild(row);
    }

    // Initialize with 4 rows
    for(let i=0; i<4; i++) createCourseRow();

    addCourseBtn.addEventListener('click', createCourseRow);

    calcGpaBtn.addEventListener('click', () => {
        let totalCredits = 0;
        let totalPoints = 0;
        const rows = document.querySelectorAll('.course-row');
        
        rows.forEach(row => {
            const credits = parseFloat(row.querySelector('.course-credits').value);
            const grade = row.querySelector('.course-grade').value;
            
            if (!isNaN(credits) && credits > 0 && grade) {
                totalCredits += credits;
                totalPoints += credits * gradePoints[grade];
            }
        });

        if (totalCredits === 0) {
            mainResult.innerHTML = `<span style="color: #ef4444; font-size: 1.5rem;">Enter valid credits and grades</span>`;
            detailsResult.innerHTML = '';
            resultContainer.style.display = 'block';
            return;
        }

        const gpa = (totalPoints / totalCredits).toFixed(2);
        
        let color = '#22c55e';
        if (gpa < 2.0) color = '#ef4444';
        else if (gpa < 3.0) color = '#eab308';

        mainResult.style.color = color;
        mainResult.innerHTML = gpa;
        detailsResult.innerHTML = `<p>Total Credits: <span>${totalCredits}</span></p><p>Total Points: <span>${totalPoints.toFixed(2)}</span></p>`;
        resultContainer.style.display = 'block';
    });
});
