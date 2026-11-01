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

  /* Комнаты чередуются: широкое фото, затем пара вертикальных */
  var rooms = p.rooms.map(function(r, i){
    var name = r[0].toLowerCase();
    var pics = i % 2 === 0
      ? '<div class="room-pics">' + u.ph(name, "wide") + '</div>'
      : '<div class="grid2 room-pics">' + u.ph(name + ", общий вид", "tall") + u.ph(name + ", деталь", "tall") + '</div>';
    return '<section class="sec flush-b wrap"><div class="txt rv"><span class="room">' + r[0] + '</span><p>' + r[1] + '</p></div>' + pics + '</section>';
  }).join("");

  var others = D.PROJECTS.filter(function(x){ return x.s !== p.s; }).slice(0, 6);

  app.innerHTML =
    '<section class="wrap"><nav class="tabs" aria-label="Категории проектов">' + tabs + '</nav>' +
      u.backLink("projects.html?type=" + p.type, D.TYPES[p.type].one) + '</section>' +
    '<section class="wrap mt-s">' + u.projectPh(p, "hero") + '</section>' +
    '<section class="sec flush-b wrap stack">' +
      '<h1 class="h-deco rv">' + p.t + '</h1>' +
      '<p class="small-note">Подборка референсов для обсуждения. Это не съёмка реализованного объекта BELLA HOME.</p>' +
      '<p class="txt rv lead-intro">' + p.lead + '</p>' +
    '</section>' +
    rooms +
    '<section class="sec wrap">' + u.ornament() +
      '<h2 class="h-deco rv mt-s mb-m">Больше проектов</h2>' + u.rail(others.map(u.projectCard).join(""), "rail-o") +
      '<div class="btns mt-l"></div>' +
    '</section>';
})();
