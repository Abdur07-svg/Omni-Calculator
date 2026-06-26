const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const templateHtml = (title) => `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="background-elements">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    </div>

    <div class="calculator-wrapper">
        <div class="top-controls">
            <button id="sound-toggle-btn" class="sound-btn" title="Toggle Sound">
                <i class="fas fa-volume-up" id="sound-icon"></i>
            </button>
            <div class="theme-toggle">
                <input type="checkbox" id="theme-switch" class="theme-switch-input">
                <label for="theme-switch" class="theme-switch-label">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <span class="toggle-ball"></span>
                </label>
            </div>
        </div>
        
        <div class="calculator">
            <nav class="app-nav">
                <a href="index.html" class="nav-btn active" style="text-decoration: none; text-align: center;">
                    <i class="fas fa-arrow-left"></i> Back to Dashboard
                </a>
            </nav>

            <div class="calc-view active">
                <div class="calc-header">
                    <h2>${title}</h2>
                    <p>Coming Soon</p>
                </div>
                
                <div class="form-box" style="text-align: center; padding: 40px 20px;">
                    <i class="fas fa-tools" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 10px;">Under Construction</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">We are working on the formulas and logic for this calculator. Check back later!</p>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`;

const updatedIndex = indexHtml.replace(/<a href="#">([^<]+)<\/a>/g, (fullMatch, name) => {
    if (['Scientific Calculator', 'BMI Calculator', 'Age Calculator'].includes(name)) {
        return fullMatch;
    }
    const filename = slugify(name) + '.html';
    
    // Write the boilerplate file
    const filepath = path.join(__dirname, filename);
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, templateHtml(name), 'utf-8');
        console.log(`Created ${filename}`);
    }
    
    return `<a href="${filename}">${name}</a>`;
});

fs.writeFileSync(indexPath, updatedIndex, 'utf-8');
console.log('Updated index.html');
