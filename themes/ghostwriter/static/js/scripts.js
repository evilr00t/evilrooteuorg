jQuery(function($) {

  /* ============================================================ */
  /* Responsive Videos */
  /* ============================================================ */

  $(".post-content").fitVids();

  /* ============================================================ */
  /* Scroll To Top */
  /* ============================================================ */

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();

    $('html, body').animate({ 'scrollTop': 0 });
  });
});

mediumZoom(document.querySelectorAll('.post-content img'))

/* ============================================================ */
/* Footer terminal typewriter */
/* ============================================================ */
(function () {
  var el = document.querySelector('.footer-terminal-text');
  if (!el) return;

  var commands = (el.dataset.commands || '').split(',').filter(Boolean);
  if (!commands.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = commands[0];
    return;
  }

  var cmdIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function tick() {
    var current = commands[cmdIndex];
    var delay = 60;

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        delay = 1600;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        delay = 300;
      } else {
        delay = 35;
      }
    }

    setTimeout(tick, delay);
  }

  tick();
})();

