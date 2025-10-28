// --- UNDERDAWGS Site Script ---
// Add-to-cart button animation + click sound

// Create a soft click sound
const clickSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_42c91e1b6d.mp3?filename=soft-click-125518.mp3');
clickSound.volume = 0.4; // soft level

// Select all Add to Cart buttons
const buttons = document.querySelectorAll('.add-to-cart');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Play sound
    clickSound.currentTime = 0;
    clickSound.play();

    // Add animation class
    button.textContent = 'Added!';
    button.classList.add('added');

    // Reset after animation
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.classList.remove('added');
    }, 1200);
  });
});

// Optional smooth entry animation for hoodies
window.addEventListener('load', () => {
  const hoodies = document.querySelectorAll('.hoodie-card');
  hoodies.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 150 * index);
  });
});