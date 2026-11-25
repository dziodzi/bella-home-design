/* design/project.html?id=<slug> — страница одного проекта */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;
  var app = document.getElementById("app");
  var p = D.project(u.param("id"));

  if (!p){
    app.innerHTML = '<section class="sec wrap stack"><h1 class="h-deco">Проект не найден</h1>' +
      '<p class="txt">Возможно, ссылка устарела. Посмотрите все проекты бюро.</p>' +
      '<div class="btns"><a class="btn" href="projects.html">Все проекты</a></div></section>';
    return;
  }
  document.title = p.t + " — BELLA HOME";

  var tabs = '<a href="projects.html"><span>Все проекты</span></a>' + Object.keys(D.TYPES).map(function(k){
    return '<a href="projects.html?type=' + k + '" class="' + (p.type === k ? "on" : "") + '"><span>' + D.TYPES[k].t + '</span></a>';
  }).join("");

  var gallery = p.images.map(function(caption, index){
    if (index === p.cover) return "";
    return '<div class="stack">' + u.projectPh(p, "portfolio-photo", index) +
      '<p class="small-note">' + u.esc(caption) + '</p></div>';
  }).join("");

  var others = D.PROJECTS.filter(function(x){ return x.s !== p.s; }).slice(0, 6);

  app.innerHTML =
    '<section class="wrap"><nav class="tabs" aria-label="Категории проектов">' + tabs + '</nav>' +
      u.backLink("projects.html?type=" + p.type, D.TYPES[p.type].one) + '</section>' +
    '<section class="wrap mt-s">' + u.projectPh(p, "hero") + '</section>' +
    '<section class="sec flush-b wrap stack">' +
      '<h1 class="h-deco rv">' + p.t + '</h1>' +
      '<p class="small-note">' + u.esc(p.images[p.cover]) + '</p>' +
      '<p class="txt rv lead-intro">' + p.lead + '</p>' +
    '</section>' +
    '<section class="sec wrap"><div class="stack portfolio-gallery">' + gallery + '</div>' +
      '<p class="small-note mt-m">Дизайн: Ирина Неймышева. <a class="text-link" href="' + u.esc(p.source) + '">Проект на Behance →</a></p></section>' +
    '<section class="sec wrap">' + u.ornament() +
      '<h2 class="h-deco rv mt-s mb-m">Больше проектов</h2>' + u.rail(others.map(u.projectCard).join(""), "rail-o") +
      '<div class="btns mt-l"></div>' +
    '</section>';
})();
