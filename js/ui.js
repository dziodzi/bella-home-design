/* Поведение интерфейса. Подключается последним на каждой странице:
   собирает каркас, нумерует фото, запускает анимации и обработчики */
window.BH = window.BH || {};

BH.ui = (function(){
  "use strict";
  var u = BH.u, layout = BH.layout, doc = document.documentElement, body = document.body;
  var io = null;
  var reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
  function scrollBehavior(){return reducedMotion.matches?"auto":"smooth";}

  /* ---------- Фотографии ----------
     Каждый <figure class="ph"> получает снимок из BH.photos. Узор-веер под ним
     виден, пока фото грузится; если фото не загрузилось, показывается подпись */
  function decoratePhotos(){
    var els = Array.prototype.slice.call(document.querySelectorAll("figure.ph:not([data-ready])"));
    BH.photos.assign(els).forEach(function(pair){
      var el = pair[0], src = pair[1];
      el.setAttribute("data-ready", "");
      var cap = el.getAttribute("data-caption") || "";
      var img = new Image();
      img.alt = cap;
      img.decoding = "async";
      if(el.closest(".splash")||el.classList.contains("hero"))img.fetchPriority="high";
      if (!el.closest(".splash, .hero") && !el.classList.contains("hero")) img.loading = "lazy";
      img.onload = function(){ if(img.decode){img.decode().catch(function(){}).then(function(){el.classList.add("loaded");});}else el.classList.add("loaded"); };
      img.onerror = function(){
        img.remove();
        el.insertAdjacentHTML("beforeend", '<div class="lbl"><b>Фото</b>' + (cap ? "<small>" + u.esc(cap) + "</small>" : "") + "</div>");
      };
      var crop = BH.photoCrops && BH.photoCrops[src.split('/').pop().split('?')[0]];
      if(crop){
        el.classList.add('photo-cropped');
        if(el.classList.contains('portfolio-photo')) el.style.aspectRatio=crop[4]+'/'+crop[5];
        var originalLoad=img.onload;
        img.onload=function(){
          var ns='http://www.w3.org/2000/svg';
          var svg=document.createElementNS(ns,'svg');
          svg.setAttribute('viewBox',crop.slice(2).join(' '));
          svg.setAttribute('preserveAspectRatio','xMidYMid slice');
          svg.setAttribute('role','img');svg.setAttribute('aria-label',cap);
          var picture=document.createElementNS(ns,'image');
          picture.setAttribute('href',src);picture.setAttribute('width',crop[0]);picture.setAttribute('height',crop[1]);
          svg.appendChild(picture);el.appendChild(svg);img.style.display='none';
          originalLoad();
        };
      }
      img.src = src;
      el.innerHTML = "<i></i>";
      el.appendChild(img);
      if (!el.classList.contains("no-rv")) el.classList.add("rv");
    });
  }

  /* ---------- Появление при прокрутке ---------- */
  function observe(scope){
    if (!io) return;
    (scope || document).querySelectorAll(".rv:not(.in)").forEach(function(el){
      if (!el.closest("[hidden]")) io.observe(el);
    });
  }
  function initReveal(){
    if (!("IntersectionObserver" in window) || reducedMotion.matches) return;
    doc.classList.add("io");
    io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, {rootMargin:"0px 0px "+Math.min(100,Math.round(window.innerHeight*.1))+"px 0px", threshold:.01});
    observe();
  }

  /* ---------- Уведомление ---------- */
  var toastTimer;
  function toast(msg){
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove("show"); }, 2200);
  }

  /* ---------- Меню ---------- */
  function setMenu(open){
    doc.classList.toggle("menu-open", open);
    document.getElementById("drawer").inert = !open;
    var b = document.getElementById("burger");
    if (b) b.setAttribute("aria-expanded", open);
  }
  function setMega(open){
    var m = document.getElementById("mega"), b = document.getElementById("mega-btn");
    if (!m) return;
    m.classList.toggle("show", open);
    b.setAttribute("aria-expanded", open);
  }

  /* ---------- Избранное ---------- */
  function toggleFav(id){
    var on = u.fav.toggle(id);
    document.querySelectorAll('[data-fav="' + id + '"]').forEach(function(b){ b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    document.querySelectorAll('[data-fav-big="' + id + '"]').forEach(function(b){ b.textContent = on ? "В избранном" : "В избранное"; });
    layout.refreshFavCount();
    document.dispatchEvent(new CustomEvent("bh:favorites"));
    toast(on ? "Добавлено в избранное" : "Удалено из избранного");
  }

  /* ---------- Переход между страницами: латунная линия и затухание ---------- */
  function isPageLink(a, e){
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (a.target || a.hasAttribute("download")) return false;
    var href = a.getAttribute("href") || "";
    if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/.test(href)) return false;
    var url = new URL(a.href, location.href);
    if (!/^https?:$/.test(url.protocol) && url.protocol !== "file:") return false;
    if (url.origin !== location.origin) return false;
    return url.pathname !== location.pathname || url.search !== location.search;
  }
  function leaveTo(href){
    if(reducedMotion.matches){location.href=href;return;}
    if(body.classList.contains("leave"))return;
    var c = document.getElementById("curtain");
    c.classList.remove("go"); void c.offsetWidth; c.classList.add("go");
    body.classList.add("leave");
    setTimeout(function(){ location.href = href; }, window.innerWidth<721?140:200);
  }
  window.addEventListener("pageshow", function(){ body.classList.remove("leave"); });

  /* ---------- Делегирование кликов ---------- */
  function onClick(e){
    var t = e.target.closest("button, a");
    if (!t) return;

    if (t.dataset.rail){
      var r = document.getElementById(t.dataset.rail);
      r.scrollBy({left: (+t.dataset.dir) * r.clientWidth * .8, behavior: scrollBehavior()});
      return;
    }
    if (t.classList.contains("acc-h")){
      var item = t.parentNode, open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      t.setAttribute("aria-expanded", open);
      return;
    }
    if (t.dataset.fav || t.dataset.favBig){ e.preventDefault(); toggleFav(t.dataset.fav || t.dataset.favBig); return; }
    if (t.id === "burger"){ setMenu(!doc.classList.contains("menu-open")); return; }
    if (t.id === "mega-btn"){ setMega(!document.getElementById("mega").classList.contains("show")); return; }
    if (t.id === "cookie-ok"){
      document.getElementById("cookie").classList.remove("show");
      document.getElementById("cookie").inert=true;
      try { localStorage.setItem("bh-cookie", "1"); } catch(err){}
      return;
    }
    if (t.id === "totop"){ window.scrollTo({top: 0, behavior: scrollBehavior()}); return; }

    if (t.tagName === "A" && isPageLink(t, e)){
      e.preventDefault();
      setMenu(false);
      leaveTo(t.href);
    }
  }

  /* ---------- Запуск ---------- */
  function boot(){
    layout.render();
    if(BH.data.CONTENT && BH.data.CONTENT.demo){
      var note=document.createElement('p');note.className='content-note wrap';note.textContent='Проекты интерьеров — Ирина Неймышева. Мебельный каталог пока демонстрационный: ассортимент будет опубликован после согласования материалов.';
      if(layout.section==='maison')document.getElementById('app').appendChild(note);
    }

    decoratePhotos();
    initReveal();

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", function(e){
      if (!document.getElementById("mega")) return;
      if (e.target.closest("#mega-btn")) setMega(true);
      else if (!e.target.closest("#mega") && !e.target.closest("#hdr")) setMega(false);
    });
    document.addEventListener("keydown", function(e){
      if(e.key==='Tab' && doc.classList.contains('menu-open')){
        var nodes=Array.from(document.getElementById('drawer').querySelectorAll('a[href],button')).filter(function(n){return n.offsetParent!==null;});
        nodes.push(document.getElementById('burger'));var first=nodes[0],last=nodes[nodes.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
      if(e.key==='Escape'){setMenu(false);setMega(false);}
    });

    var seen = false;
    try { seen = localStorage.getItem("bh-cookie") === "1"; } catch(e){}
    if (!seen) setTimeout(function(){ var c=document.getElementById("cookie");c.inert=false;c.classList.add("show"); }, 1200);

    var hdr = document.getElementById("hdr"), totop = document.getElementById("totop");
    window.addEventListener("scroll", function(){
      var y = window.scrollY;
      if (hdr) hdr.classList.toggle("scrolled", y > 10);
      totop.classList.toggle("show", y > window.innerHeight * 1.2);
    }, {passive: true});

    reducedMotion.addEventListener('change',function(e){if(e.matches){if(io)io.disconnect();doc.classList.remove('io');document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});}else initReveal();});
    (BH._readyQueue || []).forEach(function(fn){ fn(); });
  }

  var api = {toast: toast, observe: observe, decoratePhotos: decoratePhotos};
  BH.ui = api;
  boot();
  return api;
})();
