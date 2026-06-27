document?.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('conv-category');
    const inputVal = document.getElementById('conv-input');
    const fromSelect = document.getElementById('conv-from');
    const toSelect = document.getElementById('conv-to');
    const resultDisplay = document.getElementById('conv-main-result');
    const swapBtn = document.getElementById('swap-btn');

    const units = {
        length: {
            'Meters (m)': 1,
            'Kilometers (km)': 1000,
            'Centimeters (cm)': 0.01,
            'Millimeters (mm)': 0.001,
            'Miles (mi)': 1609.344,
            'Yards (yd)': 0.9144,
            'Feet (ft)': 0.3048,
            'Inches (in)': 0.0254
        },
        weight: {
            'Kilograms (kg)': 1,
            'Grams (g)': 0.001,
            'Milligrams (mg)': 0.000001,
            'Metric Tons (t)': 1000,
            'Pounds (lb)': 0.45359237,
            'Ounces (oz)': 0.02834952
        },
        volume: {
            'Liters (L)': 1,
            'Milliliters (mL)': 0.001,
            'Cubic Meters (m³)': 1000,
            'Gallons (US)': 3.78541,
            'Quarts (US)': 0.946353,
            'Pints (US)': 0.473176,
            'Cups (US)': 0.236588,
            'Fluid Ounces (US)': 0.0295735
        },
        temperature: {
            'Celsius (°C)': 'C',
            'Fahrenheit (°F)': 'F',
            'Kelvin (K)': 'K'
        }
    };

    function populateUnits() {
        const cat = categorySelect.value;
        const opts = Object.keys(units[cat]);
        
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        
        opts.forEach(opt => {
            fromSelect.add(new Option(opt, opt));
            toSelect.add(new Option(opt, opt));
        });

        if (opts.length > 1) {
            toSelect.selectedIndex = 1;
        }
        
        calculate();
    }

    function calculate() {
        const cat = categorySelect.value;
        const valStr = inputVal.value;
        const val = parseFloat(valStr);
        const from = fromSelect.value;
        const to = toSelect.value;

        if (valStr === '' || isNaN(val)) {
            resultDisplay.textContent = '0';
            return;
        }

        let result = 0;

        if (cat === 'temperature') {
            let c = 0;
            // Convert to Celsius first
            if (from === 'Celsius (°C)') c = val;
            else if (from === 'Fahrenheit (°F)') c = (val - 32) * 5/9;
            else if (from === 'Kelvin (K)') c = val - 273.15;

            // Convert from Celsius to Target
            if (to === 'Celsius (°C)') result = c;
            else if (to === 'Fahrenheit (°F)') result = (c * 9/5) + 32;
            else if (to === 'Kelvin (K)') result = c + 273.15;
        } else {
            const baseVal = val * units[cat][from];
            result = baseVal / units[cat][to];
        }

        // Format to prevent insanely long decimals while retaining precision
        let formatted = result.toPrecision(8);
        formatted = parseFloat(formatted).toString(); // removes trailing zeros
        
        resultDisplay.textContent = formatted;
    }

    categorySelect?.addEventListener('change', populateUnits);
    inputVal?.addEventListener('input', calculate);
    fromSelect?.addEventListener('change', calculate);
    toSelect?.addEventListener('change', calculate);

    swapBtn?.addEventListener('click', () => {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        calculate();
    });

    // Init
    populateUnits();
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
