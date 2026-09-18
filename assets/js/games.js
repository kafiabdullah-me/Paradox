const GameData = {
    stroop: {
        words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'],
        colors: {
            'RED': '#ff0000',
            'BLUE': '#0000ff',
            'GREEN': '#00ff00',
            'YELLOW': '#ffff00',
            'PURPLE': '#800080'
        }
    },
    riddles: [
        { q: "The more of this there is, the less you see. What is it?", a: "darkness" },
        { q: "I have cities, but no houses. I have mountains, but no trees. What am I?", a: "map" },
        { q: "What can travel around the world while staying in a corner?", a: "stamp" },
        { q: "What has keys but no locks, and space but no room?", a: "keyboard" }
    ]
};

// Global state for the Quest System
window.riddlesSolved = 0;
window.memoryLevel = 1;
window.mathCorrect = 0;

let state = {
    score: 0,
    timeLeft: 30,
    gameActive: false,
    timerInterval: null,
    currentGame: null
};

function exitGame() {
    state.gameActive = false;
    clearInterval(state.timerInterval);
    document.getElementById('game-wrapper').style.display = 'none';
    document.getElementById('game-selection').style.display = 'grid';
}

function updateScore(points) {
    state.score += points;
    document.getElementById('score').innerText = state.score;
    checkQuestProgress();
}

function checkQuestProgress() {
    let completed = 0;
    if (state.score >= 50) {
        document.getElementById('task-stroop').innerText = '✅ Stroop: Complete';
        completed++;
    }
    if (window.riddlesSolved >= 3) {
        document.getElementById('task-riddles').innerText = '✅ Riddles: Complete';
        completed++;
    }
    if (window.memoryLevel >= 5) {
        document.getElementById('task-memory').innerText = '✅ Memory: Complete';
        completed++;
    }
    if (window.mathCorrect >= 10) {
        document.getElementById('task-math').innerText = '✅ Math: Complete';
        completed++;
    }

    if (completed === 4) {
        const btn = document.getElementById('claim-reward');
        btn.style.display = 'inline-block';
        btn.onclick = () => {
            alert('🎉 CONGRATULATIONS! You are now a certified PARADOX MASTER!');
        };
    }
}

function startTimer() {
    state.timeLeft = 30;
    document.getElementById('timer').innerText = `Time: ${state.timeLeft}s`;

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        document.getElementById('timer').innerText = `Time: ${state.timeLeft}s`;
        if (state.timeLeft <= 0) {
            endGame("Time's up!");
        }
    }, 1000);
}

function endGame(message) {
    state.gameActive = false;
    clearInterval(state.timerInterval);
    const screen = document.getElementById('game-screen');
    screen.innerHTML = `
        <h2 style="font-size: 2rem; color: var(--neon-yellow);">${message}</h2>
        <p style="font-size: 1.5rem; margin: 1rem 0;">Final Score: ${state.score}</p>
        <button class="game-btn" onclick="location.reload()" style="background: var(--accent-purple); color: white;">Play Again</button>
    `;
}

function initGame(type) {
    state.score = 0;
    state.gameActive = true;
    state.currentGame = type;
    document.getElementById('score').innerText = '0';
    document.getElementById('game-selection').style.display = 'none';
    document.getElementById('game-wrapper').style.display = 'block';

    const screen = document.getElementById('game-screen');
    screen.innerHTML = '';

    if (type === 'stroop') startStroop();
    else if (type === 'riddles') startRiddles();
    else if (type === 'memory') startMemory();
    else if (type === 'math') startMath();
}

// --- GAME: STROOP CLASH ---
function startStroop() {
    startTimer();
    runStroopLoop();
}

function runStroopLoop() {
    if (!state.gameActive) return;
    const word = GameData.stroop.words[Math.floor(Math.random() * GameData.stroop.words.length)];
    const colorName = GameData.stroop.words[Math.floor(Math.random() * GameData.stroop.words.length)];
    const colorValue = GameData.stroop.colors[colorName];

    document.getElementById('game-screen').innerHTML = `
        <div style="font-size: 4rem; font-weight: bold; color: ${colorValue}; margin-bottom: 2rem;">${word}</div>
        <div class="option-grid">
            ${GameData.stroop.words.map(w => `
                <button class="game-btn" onclick="handleStroopAnswer('${w}', '${colorName}')">${w}</button>
            `).join('')}
        </div>
    `;
}

window.handleStroopAnswer = (choice, correct) => {
    if (choice === correct) updateScore(10);
    else updateScore(-5);
    runStroopLoop();
};

// --- GAME: PARADOX RIDDLES ---
function startRiddles() {
    let currentIdx = 0;
    const screen = document.getElementById('game-screen');

    function next() {
        if (currentIdx >= GameData.riddles.length) {
            endGame("All Riddles Solved!");
            return;
        }
        const riddle = GameData.riddles[currentIdx];
        screen.innerHTML = `
            <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Riddle #${currentIdx + 1}</h3>
            <p style="font-size: 1.8rem; margin-bottom: 2rem;">${riddle.q}</p>
            <input type="text" id="riddle-input" style="padding: 10px; border-radius: 5px; margin-bottom: 1rem; width: 200px; text-align: center;">
            <button class="game-btn" onclick="handleRiddleSubmit()">Submit</button>
        `;
    }

    window.handleRiddleSubmit = () => {
        const ans = document.getElementById('riddle-input').value.toLowerCase().trim();
        if (ans.includes(GameData.riddles[currentIdx].a)) {
            updateScore(50);
            window.riddlesSolved++;
            currentIdx++;
            checkQuestProgress();
            next();
        } else {
            alert("Wrong answer! Try again.");
        }
    };
    next();
}

// --- GAME: MEMORY MAZE ---
function startMemory() {
    const screen = document.getElementById('game-screen');
    screen.innerHTML = `
        <div id="memory-grid"></div>
        <p id="mem-status" style="margin-top: 1rem; font-size: 1.2rem;">Watch the sequence...</p>
    `;

    const grid = document.getElementById('memory-grid');
    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.className = 'mem-box';
        box.id = `box-${i}`;
        box.onclick = () => handleMemClick(i);
        grid.appendChild(box);
    }

    let sequence = [];
    let playerSeq = [];
    let level = 1;

    async function playSequence() {
        state.gameActive = false;
        document.getElementById('mem-status').innerText = `Level ${level}: Watch!`;

        sequence.push(Math.floor(Math.random() * 9));

        for (let id of sequence) {
            await new Promise(r => setTimeout(r, 600));
            const el = document.getElementById(`box-${id}`);
            el, el.classList.add('active');
            await new Promise(r => setTimeout(r, 400));
            el.classList.remove('active');
        }

        playerSeq = [];
        state.gameActive = true;
        document.getElementById('mem-status').innerText = 'Your Turn!';
    }

    window.handleMemClick = (id) => {
        if (!state.gameActive) return;

        playerSeq.push(id);
        const currentStep = playerSeq[playerSeq.length - 1];

        if (currentStep !== sequence[playerSeq.length - 1]) {
            endGame("Wrong Sequence!");
            return;
        }

        if (playerSeq.length === sequence.length) {
            updateScore(20);
            level++;
            window.memoryLevel = level;
            checkQuestProgress();
            setTimeout(playSequence, 1000);
        }
    };

    playSequence();
}

// --- GAME: PANIC MATH ---
function startMath() {
    startTimer();
    const screen = document.getElementById('game-screen');

    function next() {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const operator = Math.random() > 0.5 ? '+' : '-';
        const result = operator === '+' ? a + b : a - b;

        screen.innerHTML = `
            <div id="math-q" style="font-size: 4rem; font-weight: bold; margin-bottom: 2rem; animation: shake 0.1s infinite;">
                ${a} ${operator} ${b} = ?
            </div>
            <input type="number" id="math-ans" style="padding: 1rem; font-size: 2rem; width: 150px; text-align: center; border-radius: 10px;">
            <button class="game-btn" id="math-submit" style="margin-left: 1rem;">OK</button>
        `;

        document.getElementById('math-submit').onclick = () => {
            const ans = parseInt(document.getElementById('math-ans').value);
            if (ans === result) {
                updateScore(10);
                window.mathCorrect++;
                checkQuestProgress();
                next();
            } else {
                updateScore(-5);
                alert("Wrong!");
                next();
            }
        };
    }

    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.innerHTML = `@keyframes shake { 0% { transform: translate(1px, 1px); } 50% { transform: translate(-1px, -2px); } 100% { transform: translate(1px, -1px); } }`;
        document.head.appendChild(style);
    }
    next();
}
