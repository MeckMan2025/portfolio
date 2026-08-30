// Fade in elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    document.querySelectorAll('.project-card, .about-card, .contact-card, .ai-card, .ai-philosophy').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// APHUG usage — daily visits logged to Supabase, drawn as a bar chart. Never resets.
(function () {
  var SB = 'https://ejmiqtizvuuilsztbafk.supabase.co';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbWlxdGl6dnV1aWxzenRiYWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNjkzMjAsImV4cCI6MjA3MDk0NTMyMH0.mHjzI8hth6JMFW6WeDg2Dy0nFOprC0Tj4p5Cjs7Aq0E';
  function draw(rows) {
    var el = document.getElementById('usage-chart');
    var totalEl = document.getElementById('uv-total');
    if (!el) return;
    if (!rows || !rows.length) {
      el.innerHTML = '<div style="color:var(--text-soft);padding:1rem 0">No visits logged yet — check back soon.</div>';
      if (totalEl) totalEl.textContent = '0';
      return;
    }
    var total = rows.reduce(function (a, r) { return a + (r.n || 0); }, 0);
    if (totalEl) totalEl.textContent = total.toLocaleString();
    rows = rows.slice(-60);
    var max = Math.max.apply(null, rows.map(function (r) { return r.n; }));
    var W = 700, H = 190, pad = 26, bw = (W - pad * 2) / rows.length;
    var bars = rows.map(function (r, i) {
      var h = max ? (r.n / max) * (H - pad * 2) : 0;
      var x = pad + i * bw, y = H - pad - h;
      return '<rect x="' + (x + bw * 0.12).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (bw * 0.76).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="2" fill="#7aa7d8"><title>' + r.day + ': ' + r.n + '</title></rect>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto">' +
      '<line x1="' + pad + '" y1="' + (H - pad) + '" x2="' + (W - pad) + '" y2="' + (H - pad) + '" stroke="#e2e2ea"/>' + bars +
      '<text x="' + pad + '" y="' + (H - 7) + '" font-size="11" fill="#9a9aa8">' + rows[0].day + '</text>' +
      '<text x="' + (W - pad) + '" y="' + (H - 7) + '" font-size="11" fill="#9a9aa8" text-anchor="end">' + rows[rows.length - 1].day + '</text>' +
      '</svg>';
  }
  fetch(SB + '/rest/v1/pageviews_daily?select=day,n&order=day.asc', { headers: { apikey: KEY, Authorization: 'Bearer ' + KEY } })
    .then(function (r) { return r.json(); })
    .then(draw)
    .catch(function () { var el = document.getElementById('usage-chart'); if (el) el.textContent = 'Stats unavailable right now.'; });
})();
