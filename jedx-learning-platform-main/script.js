// --- 1. Matrix Hacker Rain Background Effect ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*';
const fontSize = 14;
let columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(2, 5, 2, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);


// --- 2. Interactive Terminal CLI Logic ---
const userInput = document.getElementById('user-input');
const terminalOutput = document.getElementById('terminal-output');

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const command = userInput.value.trim().toLowerCase();
        
        // Print user command
        const cmdLog = document.createElement('p');
        cmdLog.className = 'user-cmd';
        cmdLog.textContent = `guest@riihhzz:~$ ${userInput.value}`;
        terminalOutput.appendChild(cmdLog);

        // Process command responses
        const resLog = document.createElement('p');
        resLog.className = 'system-log';

        if (command === 'help') {
            resLog.innerHTML = 'Perintah yang tersedia:<br>- <b>about</b>: Menampilkan informasi pengembang<br>- <b>features</b>: Menampilkan daftar fitur<br>- <b>clear</b>: Membersihkan layar terminal<br>- <b>status</b>: Mengecek status sistem';
        } else if (command === 'about') {
            resLog.innerHTML = '<b>[DEVELOPER PROFILE]</b><br>Nama: Farih Maulana<br>NIM: 2409326<br>Kelas: 5B<br>Program Studi: Pendidikan Multimedia (UPI Cibiru)';
        } else if (command === 'features') {
            resLog.innerHTML = '<b>[MODULES]</b><br>1. Interactive CLI<br>2. Matrix Hacker Visuals<br>3. Student Database Verification';
        } else if (command === 'status') {
            resLog.innerHTML = 'SYSTEM STATUS: 100% SECURE. All modules running smoothly.';
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
            userInput.value = '';
            return;
        } else if (command === '') {
            resLog.textContent = '';
        } else {
            resLog.innerHTML = `Perintah tidak dikenal: '${command}'. Ketik 'help' untuk bantuan.`;
        }

        terminalOutput.appendChild(resLog);
        userInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});