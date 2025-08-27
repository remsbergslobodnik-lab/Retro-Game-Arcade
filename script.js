// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card');
    
    // ======================
    // Remember Last Played Game
    // ======================
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game-id');
            localStorage.setItem('lastGame', gameId);
            // Remove highlight from all
            cards.forEach(c => c.classList.remove('highlight'));
            // Add to current
            card.classList.add('highlight');
        });
    });

    const lastGameId = localStorage.getItem('lastGame');
    if (lastGameId !== null) {
        const lastCard = document.querySelector(`[data-game-id="${lastGameId}"]`);
        if (lastCard) {
            lastCard.classList.add('highlight');
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // ======================
    // Smooth Scroll Navigation
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ======================
    // Mobile Menu Toggle
    // ======================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // ======================
    // Fullscreen Modal for Games
    // ======================
    const playButtons = document.querySelectorAll(".play-btn");

    // Create modal dynamically
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <iframe src="" frameborder="0"></iframe>
        <button class="close-btn">Close</button>
    `;
    document.body.appendChild(modal);

    const iframe = modal.querySelector("iframe");
    const closeBtn = modal.querySelector(".close-btn");

    playButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent conflict with card click
            const gameUrl = btn.getAttribute("data-game");
            iframe.src = gameUrl;
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        iframe.src = "";
        modal.style.display = "none";
    });
});
