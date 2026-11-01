/* pages/sitemap.html — списки проектов и категорий собираются из данных */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;
  document.getElementById("map-types").innerHTML = Object.keys(D.TYPES).map(function(k){
    return '<li><a href="' + u.link("design/projects.html?type=" + k) + '">' + D.TYPES[k].t + '</a></li>';
  }).join("");
  document.getElementById("map-projects").innerHTML = D.PROJECTS.map(function(p){
    return '<li><a href="' + u.projectUrl(p) + '">' + p.t + '</a></li>';
  }).join("");
  document.getElementById("map-cats").innerHTML = D.CATS.map(function(c){
    return '<li><a href="' + u.categoryUrl(c) + '">' + c.t + '</a></li>';
  }).join("");
})();
