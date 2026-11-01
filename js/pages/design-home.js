/* design/index.html — лента проектов внизу страницы «Бюро» */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;
  var el = document.getElementById("projects-rail");
  if (el) el.innerHTML = u.rail(D.PROJECTS.slice(0, 8).map(u.projectCard).join(""), "rail-p");
})();
