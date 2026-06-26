const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const folders = ['financial', 'fitness', 'math', 'other', 'js'];

// Create directories
folders.forEach(folder => {
    const dir = path.join(rootDir, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Categories map
const categories = {
    financial: [
        'mortgage-calculator.html', 'loan-calculator.html', 'auto-loan-calculator.html', 
        'interest-calculator.html', 'payment-calculator.html', 'retirement-calculator.html', 
        'amortization-calculator.html', 'investment-calculator.html', 'inflation-calculator.html', 
        'finance-calculator.html', 'income-tax-calculator.html', 'compound-interest-calculator.html', 
        'salary-calculator.html', 'interest-rate-calculator.html', 'sales-tax-calculator.html'
    ],
    fitness: [
        'bmi.html', 'calorie-calculator.html', 'body-fat-calculator.html', 'bmr-calculator.html', 
        'ideal-weight-calculator.html', 'pace-calculator.html', 'pregnancy-calculator.html', 
        'pregnancy-conception.html', 'due-date-calculator.html'
    ],
    math: [
        'math.html', 'fraction-calculator.html', 'percentage-calculator.html', 
        'random-number-generator.html', 'triangle-calculator.html', 'standard-deviation.html'
    ],
    other: [
        'age.html', 'date-calculator.html', 'time-calculator.html', 'hours-calculator.html', 
        'gpa-calculator.html', 'grade-calculator.html', 'concrete-calculator.html', 
        'subnet-calculator.html', 'password-generator.html', 'conversion-calculator.html'
    ]
};

// Process HTML files
for (const [category, files] of Object.entries(categories)) {
    files.forEach(file => {
        const oldPath = path.join(rootDir, file);
        const newPath = path.join(rootDir, category, file);
        
        if (fs.existsSync(oldPath)) {
            let content = fs.readFileSync(oldPath, 'utf-8');
            
            // Update resource links
            content = content.replace(/href="style\.css"/g, 'href="../style.css"');
            content = content.replace(/href="index\.html"/g, 'href="../index.html"');
            
            // Update all JS script tags to point to ../js/
            content = content.replace(/<script src="([^"]+)\.js"><\/script>/g, '<script src="../js/$1.js"></script>');

            fs.writeFileSync(newPath, content, 'utf-8');
            fs.unlinkSync(oldPath);
            console.log(`Moved ${file} to ${category}/`);
        }
    });
}

// Process JS files
const jsFiles = ['script.js', 'mortgage.js', 'loan.js', 'compound.js', 'bmi.js', 'age.js', 'math.js'];
jsFiles.forEach(file => {
    const oldPath = path.join(rootDir, file);
    const newPath = path.join(rootDir, 'js', file);
    
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${file} to js/`);
    }
});

// Update index.html
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');
    
    // Update JS link in index.html to point to js/
    indexHtml = indexHtml.replace(/<script src="script\.js"><\/script>/g, '<script src="js/script.js"></script>');
    
    // Replace all links to point to new folders
    for (const [category, files] of Object.entries(categories)) {
        files.forEach(file => {
            const regex = new RegExp(`href="${file}"`, 'g');
            indexHtml = indexHtml.replace(regex, `href="${category}/${file}"`);
        });
    }
    
    fs.writeFileSync(indexPath, indexHtml, 'utf-8');
    console.log('Updated index.html');
}

console.log('Restructuring Complete!');
