/* design/projects.html — фильтр по типу (?type=apartment|house|office|progress) и список проектов */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;
  var PAGE_SIZE = 6;
  var type = u.param("type");
  if (!D.TYPES[type]) type = null;

  var list = D.PROJECTS.filter(function(p){ return !type || p.type === type; });

  document.getElementById("project-tabs").innerHTML = tabs(type);
  document.getElementById("plist").innerHTML = list.map(function(p, i){
    return '<a class="card rv" href="' + u.projectUrl(p) + '"' + (i >= PAGE_SIZE ? " hidden" : "") + '>' +
      u.projectPh(p, "") +
      '<div class="nm">' + p.t + '</div><div class="meta">' + D.TYPES[p.type].t + " · Интерьерная подборка" + '</div></a>';
  }).join("");

  if (type) document.title = D.TYPES[type].t + " — BELLA HOME";

  var more = document.getElementById("more-btn");
  if (list.length <= PAGE_SIZE) more.parentNode.remove();
  else more.addEventListener("click", function(){
    document.querySelectorAll("#plist [hidden]").forEach(function(el){ el.hidden = false; });
    BH.ui.observe(document.getElementById("plist"));
    more.parentNode.remove();
  });

  function tabs(active){
    return '<a href="projects.html" class="' + (!active ? "on" : "") + '"><span>Все проекты</span></a>' +
      Object.keys(D.TYPES).map(function(k){
        return '<a href="projects.html?type=' + k + '" class="' + (active === k ? "on" : "") + '"><span>' + D.TYPES[k].t + '</span></a>';
      }).join("");
  }
})();
