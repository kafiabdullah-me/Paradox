function startRunaway() {
    const zone = document.getElementById('runaway-zone');
    zone.style.display = 'flex';
    const btn = document.getElementById('runaway-btn');

    btn.onmouseover = () => {
        const x = Math.random() * (window.innerWidth - btn.offsetWidth);
        const y = Math.random() * (window.innerHeight - btn.offsetHeight);
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
    };

    btn.onclick = () => {
        alert('HOW DID YOU DO THAT?! You are a master!');
        stopPrank();
    };
}

function startFakeUpdate() {
    const overlay = document.getElementById('update-overlay');
    overlay.style.display = 'flex';
    let progress = 0;
    const progressDiv = document.getElementById('update-progress');
    const percentText = document.getElementById('update-percent');

    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                alert('GOTCHA! Your computer is perfectly fine. This was just a prank!');
                overlay.style.display = 'none';
            }, 1000);
        }
        progressDiv.style.width = progress + '%';
        percentText.innerText = Math.floor(progress) + '% complete';
    }, 500);
}

function startGhostCursor() {
    const body = document.getElementById('body-page');
    body.style.cursor = 'none';
    alert('Wait... where did your mouse go? (Look around!)');

    setTimeout(() => {
        body.style.cursor = 'default';
        alert('Boo! It is back now.');
    }, 5000);
}

function startInfiniteLoad() {
    document.body.innerHTML = `
        <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #000; color: white; font-family: sans-serif;">
            <i class="fas fa-spinner fa-spin" style="font-size: 5rem; margin-bottom: 2rem;"></i>
            <h1>Loading the Secret...</h1>
            <p>Estimated time: 999 hours</p>
            <button id="exit-btn" style="position: absolute; opacity: 0.01; bottom: 10px; right: 10px; cursor: pointer;">Exit</button>
        </div>
    `;

    document.getElementById('exit-btn').onclick = () => {
        window.location.href = 'index.html';
    };
}

function stopPrank() {
    document.getElementById('runaway-zone').style.display = 'none';
}
