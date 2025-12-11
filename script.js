// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Football Fan Hub script loaded and updated!");

    const competitionCards = document.querySelectorAll('.competition-card');
    const themeButton = document.getElementById('toggle-theme');
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    // --- Competition Card Interactivity ---
    competitionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const competitionName = card.querySelector('h3').textContent;
            console.log(`Attempting navigation to: ${competitionName} details page...`);
        });
    });

    // --- Dark Mode Functionality ---

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    if (isDark) {
        htmlElement.classList.add('dark');
    }
    updateThemeIcon(isDark);
    console.log(`Initial Theme: ${isDark ? 'Dark' : 'Light'}`);


    // Toggle logic
    themeButton.addEventListener('click', () => {
        isDark = htmlElement.classList.toggle('dark'); 

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
        console.log(`Theme toggled to: ${isDark ? 'Dark' : 'Light'}`);
    });

    // Function to update the SVG icon based on theme
    function updateThemeIcon(isDark) {
        if (isDark) {
            // Sun icon for dark mode (click to go to light)
            themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>`;
        } else {
            // Moon icon for light mode (click to go to dark)
            themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;
        }
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('dashboardModal');
    const modalContent = document.getElementById('modalContent');

    // Function to open the modal
    const openModal = () => {
        modal.classList.remove('hidden');
        // Trigger reflow to ensure transitions work
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10); // Small delay for transition
    };

    // Function to close the modal
    const closeModal = () => {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Wait for the transition to finish (300ms)
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Optional: Close modal if user clicks outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});