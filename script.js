// Bouncing RSVP buttons
const createBouncingButton = (text, href, size = 'normal') => {
  const button = document.createElement('a');
  button.href = href;
  button.textContent = text;
  button.className = `bouncing-btn ${size}`;
  button.style.position = 'fixed';
  button.style.left = Math.random() * (window.innerWidth - 150) + 'px';
  button.style.top = Math.random() * (window.innerHeight - 50) + 'px';
  document.body.appendChild(button);

  // Random velocity
  let vx = (Math.random() - 0.5) * 4;
  let vy = (Math.random() - 0.5) * 4;

  const bounce = () => {
    const rect = button.getBoundingClientRect();
    let x = parseFloat(button.style.left);
    let y = parseFloat(button.style.top);

    // Move
    x += vx;
    y += vy;

    // Bounce off edges
    if (x <= 0 || x + rect.width >= window.innerWidth) {
      vx = -vx;
      x = Math.max(0, Math.min(x, window.innerWidth - rect.width));
    }
    if (y <= 0 || y + rect.height >= window.innerHeight) {
      vy = -vy;
      y = Math.max(0, Math.min(y, window.innerHeight - rect.height));
    }

    button.style.left = x + 'px';
    button.style.top = y + 'px';

    requestAnimationFrame(bounce);
  };

  bounce();
};

// Create buttons when page loads
window.addEventListener('load', () => {
  // Yes button - opens SMS
  createBouncingButton('RSVP Yes', 'sms:');
  
  // No button - small and goes to sad page
  createBouncingButton('no', 'no.html', 'small');
});