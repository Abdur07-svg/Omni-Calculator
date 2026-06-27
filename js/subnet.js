document?.addEventListener('DOMContentLoaded', () => {
    const ipInput = document.getElementById('ip-address');
    const maskSelect = document.getElementById('subnet-mask');
    const calcBtn = document.getElementById('calc-subnet-btn');
    const resultContainer = document.getElementById('subnet-result-container');
    const detailsResult = document.getElementById('subnet-details');

    // Populate CIDR options
    for (let i = 1; i <= 32; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `/${i} - ${cidrToMask(i)}`;
        if (i === 24) opt.selected = true;
        maskSelect.appendChild(opt);
    }

    function cidrToMask(cidr) {
        let mask = [];
        for (let i = 0; i < 4; i++) {
            let n = Math.min(cidr, 8);
            mask.push(256 - Math.pow(2, 8 - n));
            cidr -= n;
        }
        return mask.join('.');
    }

    function ipToInt(ip) {
        return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0;
    }

    function intToIp(int) {
        return [
            (int >>> 24) & 255,
            (int >>> 16) & 255,
            (int >>> 8) & 255,
            int & 255
        ].join('.');
    }

    calcBtn?.addEventListener('click', () => {
        const ipStr = ipInput.value.trim();
        const cidr = parseInt(maskSelect.value);
        
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
        if (!ipRegex.test(ipStr)) {
            detailsResult.innerHTML = `<p style="color:#ef4444; justify-content:center; border: none;">Invalid IP Address</p>`;
            resultContainer.style.display = 'block';
            return;
        }

        const ipInt = ipToInt(ipStr);
        const maskInt = (0xffffffff << (32 - cidr)) >>> 0;
        const networkInt = (ipInt & maskInt) >>> 0;
        const broadcastInt = (networkInt | ~maskInt) >>> 0;
        
        const totalHosts = cidr === 32 ? 1 : cidr === 31 ? 2 : Math.pow(2, 32 - cidr);
        const usableHosts = cidr >= 31 ? totalHosts : totalHosts - 2;
        
        let firstHost = cidr >= 31 ? networkInt : networkInt + 1;
        let lastHost = cidr >= 31 ? broadcastInt : broadcastInt - 1;

        detailsResult.innerHTML = `
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">IP Address: <span>${ipStr}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Subnet Mask: <span>${cidrToMask(cidr)}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Network Address: <span>${intToIp(networkInt)}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Broadcast Address: <span>${intToIp(broadcastInt)}</span></p>
            <p style="border-bottom: 1px solid var(--calc-border); padding-bottom: 5px;">Usable Host Range: <span>${intToIp(firstHost)} - ${intToIp(lastHost)}</span></p>
            <p style="padding-top: 5px;">Total Usable Hosts: <span>${usableHosts.toLocaleString()}</span></p>
        `;
        resultContainer.style.display = 'block';
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
