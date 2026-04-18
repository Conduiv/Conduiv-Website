/* ==========================================================
   Conduiv — enhance.js
   Progressive enhancement layer. Pure JS, no dependencies.
   Everything here is opt-in via data-attributes and is
   fully disabled when the user prefers reduced motion.
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (reduceMotion || !isFinePointer) return;
    var els = document.querySelectorAll('[data-magnetic]');
    els.forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnetic-strength')) || 0.35;
      var rafId = null;
      var targetX = 0, targetY = 0;
      var currentX = 0, currentY = 0;

      function loop() {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        el.style.transform =
          'translate3d(' + currentX.toFixed(2) + 'px,' + currentY.toFixed(2) + 'px,0)';
        if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
          rafId = requestAnimationFrame(loop);
        } else {
          rafId = null;
        }
      }

      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        targetX = dx * strength;
        targetY = dy * strength;
        if (!rafId) rafId = requestAnimationFrame(loop);
      });
      el.addEventListener('mouseleave', function () {
        targetX = 0; targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(loop);
      });
    });
  }

  /* ---------- Card tilt ---------- */
  function initTilt() {
    if (reduceMotion || !isFinePointer) return;
    var els = document.querySelectorAll('[data-tilt]');
    els.forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt-max')) || 6;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var rx = (py - 0.5) * -2 * max;
        var ry = (px - 0.5) *  2 * max;
        el.style.transform =
          'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(0)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-reveal-delay'), 10) || 0;
          setTimeout(function () { el.classList.add('is-revealed'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Metric count-up ---------- */
  function initCountUp() {
    var els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    function format(n, prefix, suffix, decimals) {
      var value = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
      return (prefix || '') + value + (suffix || '');
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-countup'));
        if (isNaN(target)) { io.unobserve(el); return; }
        var prefix = el.getAttribute('data-countup-prefix') || '';
        var suffix = el.getAttribute('data-countup-suffix') || '';
        var decimals = parseInt(el.getAttribute('data-countup-decimals'), 10) || 0;
        var duration = parseInt(el.getAttribute('data-countup-duration'), 10) || 1400;

        var start = performance.now();
        (function tick(now) {
          var t = Math.min(1, (now - start) / duration);
          // Ease-out cubic
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(target * eased, prefix, suffix, decimals);
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = format(target, prefix, suffix, decimals);
        })(start);
        io.unobserve(el);
      });
    }, { threshold: 0.35 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Kickoff ---------- */
  function init() {
    initMagnetic();
    initTilt();
    initReveal();
    initCountUp();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
