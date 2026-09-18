/**
 * Lab.js
 * Handles the absurd calculations in The Paradox Laboratory.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- BIRTH DATE CALCULATOR ---
    const birthInput = document.getElementById('birth-date');
    const birthBtn = document.getElementById('calc-birth');
    const birthResult = document.getElementById('birth-result');

    const funnyTraits = [
        "a secret agent for a colony of intelligent penguins",
        "actually a time-traveler from the year 3024 who forgot where they parked their ship",
        "the long-lost heir to the throne of a floating island made of cotton candy",
        "a human calculator that only works when you sing to it",
        "the chosen one who can communicate with toaster ovens",
        "a professional napper with a PhD in pillow-testing",
        "secretly a cat in a human suit",
        "a cosmic entity that only exists when someone mentions pineapples on pizza",
        "the world's fastest walker (but only in their sleep)"
    ];

    const fateWords = [
        "Your destiny is to find the world's last piece of chocolate.",
        "You are destined to become the CEO of a company that sells pet rocks.",
        "Your future involves a very intense argument with a pigeon.",
        "You will eventually discover that you are actually a simulation.",
        "You are doomed to always forget where you put your keys.",
        "You will one day be mistaken for a minor royal in a small European country.",
        "Your life's mission is to find the perfect sock for every pair."
    ];

    if (birthBtn) {
        birthBtn.onclick = async () => {
            const date = birthInput.value;
            if (!date) {
                alert("Please enter your birthday first!");
                return;
            }

            // Fake Loading State
            birthBtn.disabled = true;
            birthBtn.textContent = "Scanning Quantum Fields...";
            birthResult.style.display = 'block';
            birthResult.innerHTML = `<p style="text-align:center; color: var(--neon-blue);">Accessing Cosmic Archives... <i class="fas fa-spinner fa-spin"></i></p>`;

            await new Promise(resolve => setTimeout(resolve, 1500));

            const randomTrait = funnyTraits[Math.floor(Math.random() * funnyTraits.length)];
            const randomFate = fateWords[Math.floor(Math.random() * fateWords.length)];

            birthResult.innerHTML = `
                <h3 style="color: var(--neon-yellow);">ANALYSIS COMPLETE!</h3>
                <p style="margin: 1rem 0; font-size: 1.2rem;">Based on the stars, you are <strong style="color: var(--neon-pink);">${randomTrait}</strong>.</p>
                <p style="font-style: italic; color: var(--text-gray); border-left: 3px solid var(--neon-blue); padding-left: 10px;">${randomFate}</p>
            `;
            birthBtn.disabled = false;
            birthBtn.textContent = "Initialize Scan";
        };
    }

    // --- RELATIONSHIP paradox (Husband/Wife without Friday) ---
    const relType = document.getElementById('rel-type');
    const partnerName = document.getElementById('partner-name');
    const relBtn = document.getElementById('calc-rel');
    const relResult = document.getElementById('rel-result');

    if (relBtn) {
        relBtn.onclick = async () => {
            const name = partnerName.value.trim();
            const type = relType.value;

            if (!name) {
                alert("Please enter your partner's name!");
                return;
            }

            // Fake Loading State
            relBtn.disabled = true;
            relBtn.textContent = "Calculating Friday Gap...";
            relResult.style.display = 'block';
            relResult.innerHTML = `<p style="text-align:center; color: var(--neon-pink);">Measuring Relationship Paradox... <i class="fas fa-sync fa-spin"></i></p>`;

            await new Promise(resolve => setTimeout(resolve, 2000));

            const days = Math.floor(Math.random() * 365);
            const hours = Math.floor(Math.random() * 24);
            const mins = Math.floor(Math.random() * 60);

            const paradoxes = {
                husband: [
                    `A husband without Friday is like a pizza without cheese: technically food, but completely missing the point.`,
                    `Your partner ${name} is 99% compatible, but the 1% is just them forgetting where you put the remote.`,
                    `Warning: ${name} has a high probability of snoring in a way that sounds like a broken tractor.`,
                    `Analysis shows ${name} treats "doing the dishes" as a long-term strategic project with multiple phases.`,
                    `Quantum result: ${name} is a miracle, but only if you ignore the way they load the dishwasher.`
                ],
                wife: [
                    `A wife without Friday is like a phone with 1% battery: stressful and likely to shut down at the wrong time.`,
                    `Calculation shows ${name} is a miracle, but they still can't decide what to eat for dinner.`,
                    `Analysis: ${name} possesses the magical ability to find things you lost in 2 seconds.`,
                    `Warning: ${name} can read your mind, but they usually choose to ignore it for their own amusement.`,
                    `Paradox detected: ${name} is always right, even when they are clearly wrong.`
                ]
            };

            const list = paradoxes[type];
            const result = list[Math.floor(Math.random() * list.length)];

            relResult.innerHTML = `
                <h3 style="color: var(--neon-pink);">PARADOX CALCULATION!</h3>
                <p style="margin: 1rem 0; font-size: 1.2rem;">${result}</p>
                <div style="background: #222; padding: 1rem; border-radius: 10px; margin-top: 1rem; color: var(--neon-yellow); border: 1px solid var(--neon-blue);">
                    <strong style="color: white;">Stability Report:</strong><br>
                    Days since the last "Friday" peace:<br>
                    <span style="font-size: 1.3rem;">${days} Days, ${hours} Hours, and ${mins} Minutes.</span>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-gray); margin-top: 1rem;">Confidence Level: 0.01% (Purely Chaotic)</p>
            `;
            relBtn.disabled = false;
            relBtn.textContent = "Execute Paradox";
        };
    }
});
