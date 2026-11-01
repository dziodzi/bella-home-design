/* maison/index.html — слайдер, ленты предметов и список категорий */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;

  var SLIDES = [
    ["Мебель и предметы", u.categoryUrl()],
    ["Двери «Лондон»", u.categoryUrl(D.category("dveri"))],
    ["Диваны и кресла", u.categoryUrl(D.category("divany"))]
  ];

  document.getElementById("slides").innerHTML = SLIDES.map(function(s){
    return '<div><a href="' + s[1] + '">' + u.ph(s[0].toLowerCase()) + '<div class="s-cap"><span class="t">' + s[0] + '</span></div></a></div>';
  }).join("");
  document.getElementById("dots").innerHTML = SLIDES.map(function(_, i){
    return '<button class="' + (i ? "" : "on") + '" data-dot="' + i + '" aria-label="Слайд ' + (i + 1) + '"></button>';
  }).join("");

  /* Ленты не пересекаются: предмет из «Новых» не повторяется в первой ленте */
  var fresh = D.PRODUCTS.filter(function(p){ return p.isNew; }).slice(0, 10);
  var featured = D.PRODUCTS.filter(function(p, i){ return i % 4 === 2 && fresh.indexOf(p) === -1; }).slice(0, 10);
  document.getElementById("featured-rail").innerHTML = u.rail(featured.map(u.productCard).join(""), "rail-m");
  document.getElementById("new-rail").innerHTML = u.rail(fresh.map(u.productCard).join(""), "rail-n");
  document.getElementById("catlist").innerHTML = D.CATS.map(function(c){
    return '<a href="' + u.categoryUrl(c) + '">' + c.t + '</a>';
  }).join("");

  /* Слайдер запускается после нумерации фото */
  BH.ready(function(){
    var track = document.getElementById("slides");
    var dots = document.querySelectorAll("#dots button");
    var n = track.children.length, idx = 0, timer;
    var reduce=window.matchMedia("(prefers-reduced-motion: reduce)"), slider=document.getElementById("slider");
    var paused=false;

    function go(i){
      idx = (i + n) % n;
      track.style.transform = "translateX(" + (-100 * idx) + "%)";
      dots.forEach(function(d, k){ d.classList.toggle("on", k === idx); });
      track.querySelectorAll(".ph").forEach(function(p, k){ p.classList.toggle("in", k === idx); });
    }
    function auto(){
      clearInterval(timer);
      if(reduce.matches||document.hidden||paused)return;
      timer = setInterval(function(){ go(idx + 1); }, 7000);
    }
    document.querySelectorAll("[data-sl]").forEach(function(b){
      b.addEventListener("click", function(){ go(idx + Number(b.dataset.sl)); auto(); });
    });
    dots.forEach(function(d){
      d.addEventListener("click", function(){ go(Number(d.dataset.dot)); auto(); });
    });
    slider.addEventListener('mouseenter',function(){paused=true;auto();});
    slider.addEventListener('mouseleave',function(){paused=false;auto();});
    slider.addEventListener('focusin',function(){paused=true;auto();});
    slider.addEventListener('focusout',function(e){if(!slider.contains(e.relatedTarget)){paused=false;auto();}});
    document.addEventListener('visibilitychange',auto);
    if(reduce.addEventListener)reduce.addEventListener('change',auto);
    go(0); auto();
  });
})();
