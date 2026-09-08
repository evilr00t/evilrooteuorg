/* ============================================================ */
/* Progressive enhancements */
/* ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  var jumpTop = document.querySelector(".js-jump-top");

  if (jumpTop) {
    jumpTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (typeof window.mediumZoom === "function") {
    window.mediumZoom(document.querySelectorAll(".post-content img"), {
      background: "rgba(11, 11, 12, 0.92)",
      margin: 24,
    });
  }

  var terminal = document.querySelector(".footer-terminal-text");
  if (!terminal) return;

  var commands = (terminal.dataset.commands || "").split(",").filter(Boolean);
  if (!commands.length) return;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    terminal.textContent = commands[0];
    return;
  }

  var commandIndex = 0;
  var characterIndex = 0;
  var deleting = false;

  function tick() {
    var current = commands[commandIndex];
    var delay = 60;

    if (deleting) {
      characterIndex -= 1;
      terminal.textContent = current.slice(0, characterIndex);
      if (characterIndex === 0) {
        deleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        delay = 300;
      } else {
        delay = 35;
      }
    } else {
      characterIndex += 1;
      terminal.textContent = current.slice(0, characterIndex);
      if (characterIndex === current.length) {
        deleting = true;
        delay = 1600;
      }
    }

    window.setTimeout(tick, delay);
  }

  tick();
});
