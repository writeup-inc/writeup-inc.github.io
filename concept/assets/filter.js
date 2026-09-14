/* 一覧を部署でしぼり込む。JSが動かない環境では全件がそのまま出る。 */
(function () {
  var bar = document.getElementById('filter');
  var count = document.getElementById('list-count');
  if (!bar || !count) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll('.article-card'));
  var total = cards.length;
  var buttons = Array.prototype.slice.call(bar.querySelectorAll('button'));
  bar.hidden = false;

  function apply(dept) {
    var shown = [];
    cards.forEach(function (card) {
      var ok = dept === 'all' || card.getAttribute('data-dept') === dept;
      card.hidden = !ok;
      card.classList.remove('is-lead');
      if (ok) shown.push(card);
    });
    if (shown.length) shown[0].classList.add('is-lead');
    count.textContent = dept === 'all'
      ? '全' + total + '本／会議で出た順に追加しています'
      : shown.length + '本を表示中（全' + total + '本）';
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-dept') === dept));
    });
  }

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) apply(b.getAttribute('data-dept'));
  });

  apply('all');
})();
