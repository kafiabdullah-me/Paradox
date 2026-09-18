/**
 * Perceptions.js
 * Handles the interactive reveal logic for the Perception Paradox gallery.
 */

function revealExplanation(button) {
    // Find the explanation div relative to the clicked button
    const card = button.closest('.illusion-info');
    const explanation = card.querySelector('.explanation');

    if (explanation.style.display === 'block') {
        explanation.style.display = 'none';
        button.textContent = 'Reveal the Trick';
        button.style.background = 'var(--accent-purple)';
    } else {
        explanation.style.display = 'block';
        button.textContent = 'Hide Explanation';
        button.style.background = 'var(--neon-pink)';

        // Smooth scroll to the explanation
        explanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Add some entry animations for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.illusion-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
