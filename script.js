let stage = 0;
const invite = document.querySelector(".invite");
const title = document.querySelector(".title");
const icon = document.querySelector(".icon");

// Coffee shop ambience on load
window.addEventListener("load", () => {
  // Using Web Audio API to generate a subtle coffee pouring sound
  // Alternative: you can host an actual coffee sound file
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create a simple coffee pour sound using filtered noise
  const playPourSound = () => {
    const duration = 2.5;
    const now = audioContext.currentTime;
    
    // Create buffer with noise
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate brown noise (softer than white noise)
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    
    // Filter to make it sound more like pouring liquid
    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + duration);
    filter.Q.value = 1;
    
    // Volume envelope
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.3);
    gainNode.gain.setValueAtTime(0.15, now + 1.8);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
    
    // Connect the chain
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    noise.start(now);
    noise.stop(now + duration);
  };
  
  // Try to play (some browsers block autoplay)
  playPourSound();
  
  // If you prefer using an actual audio file instead, use this:
  // const audio = new Audio('coffee-pour.mp3');
  // audio.volume = 0.3;
  // audio.play().catch(e => console.log('Autoplay blocked:', e));
});

document.body.addEventListener("click", () => {
  stage++;

  // Stage 1: something is off
  if (stage === 1) {
    navigator.vibrate?.(50);
    title.classList.add("chaos-2");
  }

  // Stage 2: why is it moving
  if (stage === 2) {
    navigator.vibrate?.([30, 30, 30]);
    icon.classList.add("chaos-1");
  }

  // Stage 3: okay stop
  if (stage === 3) {
    navigator.vibrate?.([100, 50, 100]);
    invite.classList.add("chaos-1");
  }

  // Stage 4: reveal CTA
  if (stage === 4) {
    const cta = document.createElement("a");
    cta.href = "party.ics";
    cta.textContent = "Add to Calendar";
    cta.className = "cta";
    invite.appendChild(cta);
  }
});