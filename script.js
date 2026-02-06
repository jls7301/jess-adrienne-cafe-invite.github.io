let stage = 0;
const invite = document.querySelector(".invite");
const title = document.querySelector(".title");
const icon = document.querySelector(".icon");

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
