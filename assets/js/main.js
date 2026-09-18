document.addEventListener('DOMContentLoaded', () => {
    // --- SIDEBAR MOBILE MENU LOGIC ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (menuToggle) {
        menuToggle.onclick = () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        };
    }

    if (overlay) {
        overlay.onclick = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        };
    }

    // --- MIRACLE NEWS TICKER LOGIC ---
    const miracleNews = [
        "🚀 BREAKING: Local cat elected as Mayor of Paradox City!",
        "🌌 MIRACLE: Scientist discovers a way to smell colors!",
        "🍦 UPDATE: Ice cream officially declared as a vegetable by the Council of Chaos!",
        "🛸 ALERT: Aliens visit Earth just to ask for the Wi-Fi password!",
        "🕒 SHOCKING: Tomorrow is officially cancelled due to lack of interest!",
        "🌈 NEWS: Rain in Tokyo now falls in flavors of strawberry and mint!",
        "🍕 PARADOX: Pizza is now legally considered a form of currency in 3 dimensions!",
        "🐢 MIRACLE: Snail wins the 100m sprint after a 50-year training regime!"
    ];

    const tickerEl = document.getElementById('miracle-news');
    if (tickerEl) {
        const shuffled = miracleNews.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        tickerEl.innerText = selected.join(' | ') + ' | ' + selected[0];
    }
});
