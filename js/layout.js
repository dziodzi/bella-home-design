/* Shared site navigation, document links and feedback shell. */
window.BH = window.BH || {};
BH.layout = (function(){
  "use strict";
  var D=BH.data,u=BH.u,body=document.body,section=body.dataset.section||"design",page=body.dataset.page||"";
  var NAV=[["design/index.html","Бюро","design"],["design/projects.html","Проекты","projects"],["design/services.html","Услуги","services"],["maison/index.html","Мебель","maison"]];
  var LEGAL=[["pages/documents.html","О сайте"],["pages/policy.html","Информация о данных"],["pages/cookies.html","Настройки браузера"],["pages/sitemap.html","Карта сайта"]];
  function links(list){return list.map(function(n){var on=page===n[2]||(n[2]==="maison"&&section==="maison")||(n[2]==="contacts"&&page==="mcontacts");return '<a href="'+u.link(n[0])+'"'+(on?' class="on" aria-current="page"':'')+'>'+n[1]+'</a>';}).join("");}
  function themeSwitch(){return '<label class="theme-switch" title="Сменить тему"><input type="checkbox" data-theme-toggle aria-label="Тёмная тема"><span class="theme-track" aria-hidden="true"><span class="theme-sun">☼</span><span class="theme-moon">☾</span><span class="theme-knob"></span></span><span class="theme-label">Тёмная тема</span></label>';}
  function header(){
    var h=document.getElementById('hdr');if(!h)return;
    h.className='hdr horizontal-header';
    h.innerHTML='<a class="header-logo" href="'+u.link('index.html')+'" aria-label="BELLA HOME — главная"><span class="header-wordmark"><span>BELLA HOME</span><small>Timeless Architecture &amp; Interiors</small></span></a><a class="mono" href="'+u.link('index.html')+'" aria-label="На главную">'+u.icons.mono+'</a><nav class="nav" aria-label="Основная навигация">'+links(NAV)+'</nav><button class="burger" id="burger" aria-label="Открыть меню" aria-controls="drawer" aria-expanded="false"><span></span><span></span><span></span></button>'+themeSwitch();
  }
  function footer(){var f=document.getElementById("ftr");if(!f)return;f.className="ftr wrap";
    var social=D.SOCIALS.filter(function(s){return !!s.url;}).map(function(s){return '<a href="'+u.esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+u.esc(s.t)+' ↗</a>';}).join("");
    f.innerHTML='<div class="footer-editorial"><div><p class="eyebrow">BELLA HOME</p><p class="footer-statement">Архитектура<br>и интерьеры</p><a class="text-link" href="'+u.link('design/projects.html')+'">Посмотреть подборки →</a></div><div class="footer-nav"><p class="eyebrow">Навигация</p>'+links(NAV)+'<a href="'+u.link('maison/catalog.html')+'">Каталог предметов</a><a href="'+u.link('maison/favorites.html')+'">Моя подборка <span id="fav-count">'+(u.fav.list().length||'')+'</span></a></div><div class="footer-nav"><p class="eyebrow">Информация</p><a href="'+u.link('pages/documents.html')+'">Информация о сайте</a>'+social+'<span class="footer-slogan">Timeless<br>Architecture &amp; Interiors</span></div></div><div class="ftr-bot"><nav aria-label="Юридические документы">'+links(LEGAL)+'</nav><span>'+new Date().getFullYear()+' © BELLA HOME</span></div>';
  }
  function shell(){body.insertAdjacentHTML("beforeend",'<a class="skip-link" href="#app">К содержанию</a><div class="drawer" id="drawer" inert>'+links(NAV)+'<a href="'+u.link('maison/catalog.html')+'">Каталог</a><a href="'+u.link('maison/favorites.html')+'">Моя подборка</a></div><div class="curtain" id="curtain"></div><div class="cookie" id="cookie" inert><span>В браузере сохраняются избранное и настройки интерфейса. <a href="'+u.link('pages/cookies.html')+'">Подробнее о хранении данных</a>.</span><button id="cookie-ok">Понятно</button></div><div class="toast" id="toast" role="status"></div><button class="totop" id="totop" aria-label="Наверх">'+u.icons.up+'</button>');}
  return {section:section,page:page,render:function(){header();footer();shell();if(window.BHTheme)window.BHTheme.sync();},refreshFavCount:function(){var e=document.getElementById('fav-count');if(e)e.textContent=u.fav.list().length||'';}};
})();
