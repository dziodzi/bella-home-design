/* Общие помощники: пути, иконки, форматирование, избранное, шаблоны карточек */
window.BH = window.BH || {};

/* BH.ready(fn) — выполнить fn после того, как ui.js соберёт страницу и пронумерует фото */
BH.ready = function(fn){ (BH._readyQueue = BH._readyQueue || []).push(fn); };

BH.u = (function(){
  "use strict";
  var D = BH.data;

  /* Путь к корню сайта задаётся на <body data-root="../"> */
  var ROOT = document.body.getAttribute("data-root") || "";
  function link(path){ return ROOT + path; }
  function param(name){ return new URLSearchParams(location.search).get(name); }

  var icons = {
    left:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    up:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    tel:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
    mono:  '<svg viewBox="0 0 48 60" aria-hidden="true"><path class="frame" d="M5 59V24a19 19 0 0 1 38 0v35"/><path class="frame" d="M9 59V24a15 15 0 0 1 30 0v35"/><path class="frame" d="M9 26.5h30M2 59h44"/><path class="rays" d="M24 26L11.8 19.6M24 26L16.5 13.4M24 26V11M24 26L31.5 13.4M24 26L36.2 19.6"/><path class="sun" d="M19.5 26.5a4.5 4.5 0 0 1 9 0z"/><text x="24" y="47" font-size="15" text-anchor="middle" letter-spacing=".6">BH</text></svg>',
    fan:   '<svg viewBox="0 0 34 18" aria-hidden="true"><path d="M17 17 L3 3 M17 17 L10 1 M17 17 L17 0 M17 17 L24 1 M17 17 L31 3"/><circle cx="17" cy="17" r="1.2"/></svg>'
  };

  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; });
  }
  function money(n){
    return "от " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
  }
  function plural(n, f){
    var a = n % 100, b = n % 10;
    if (a > 10 && a < 20) return f[2];
    if (b > 1 && b < 5) return f[1];
    if (b === 1) return f[0];
    return f[2];
  }
  function tel(s){ return "tel:" + s.replace(/[^\d+]/g, ""); }

  /* Избранное хранится в браузере посетителя */
  var favs = [];
  try { favs = JSON.parse(localStorage.getItem("bh-favs") || "[]"); } catch(e){ favs = []; }
  var fav = {
    list: function(){ return favs.slice(); },
    has: function(id){ return favs.indexOf(id) > -1; },
    toggle: function(id){
      var i = favs.indexOf(id);
      if (i > -1) favs.splice(i, 1); else favs.push(id);
      try { localStorage.setItem("bh-favs", JSON.stringify(favs)); } catch(e){}
      return i === -1;
    }
  };

  /* Фото-заглушка: номер «Фото N» проставляет BH.ui по порядку на странице */
  function ph(caption, cls, attrs){
    return '<figure class="ph ' + (cls || "") + '" data-caption="' + esc(caption || "") + '"' + (attrs || "") + '></figure>';
  }
  function ornament(){ return '<div class="orn rv">' + icons.fan + '</div>'; }
  function backLink(href, text){ return '<a class="back" href="' + href + '">' + icons.left + ' ' + text + '</a>'; }

  function rail(items, id){
    return '<div class="rail-wrap"><div class="rail" id="' + id + '">' + items + '</div>' +
      '<div class="arrows"><button class="arr" data-rail="' + id + '" data-dir="-1" aria-label="Назад">' + icons.left + '</button>' +
      '<button class="arr" data-rail="' + id + '" data-dir="1" aria-label="Вперёд">' + icons.right + '</button></div></div>';
  }
  function projectUrl(p){ return link("design/project.html?id=" + p.s); }
  function productUrl(p){ return link("maison/item.html?id=" + p.id); }
  function categoryUrl(c){ return link("maison/catalog.html" + (c ? "?cat=" + c.s : "")); }

  function projectPh(p, cls, index){
    if (index === undefined) index = p.cover;
    var src = p.photos ? link("img/photos/" + p.photos[index] + ".jpg") : link("img/projects/" + p.s + "-" + (index + 1) + ".webp");
    return ph(p.images[index] + " · " + p.t, cls, ' data-src="' + esc(src) + '"');
  }
  function productPh(p, cls, extra){
    return ph(p.t, cls, ' data-key="i:' + p.id + '"' + (extra || ""));
  }
  function projectCard(p){
    return '<a class="card rv" href="' + projectUrl(p) + '">' + projectPh(p, "tall") +
      '<div class="nm">' + p.t + '</div><div class="meta">' + esc(p.lead) + '</div></a>';
  }
  function productCard(p){
    var on = fav.has(p.id);
    return '<div class="prod rv"><button class="fav' + (on ? " on" : "") + '" data-fav="' + p.id + '" aria-label="В избранное" aria-pressed="' + on + '">' + icons.heart + '</button>' +
      '<a class="card" href="' + productUrl(p) + '">' + productPh(p, "obj") + '<div class="nm">' + p.t + '</div><div class="pr">Узнать подробнее →</div></a></div>';
  }

  return {
    ROOT: ROOT, link: link, param: param, icons: icons, esc: esc, money: money, plural: plural, tel: tel,
    fav: fav, ph: ph, ornament: ornament, backLink: backLink, rail: rail,
    projectUrl: projectUrl, productUrl: productUrl, categoryUrl: categoryUrl,
    projectPh: projectPh, productPh: productPh, projectCard: projectCard, productCard: productCard
  };
})();
