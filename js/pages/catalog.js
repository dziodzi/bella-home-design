/* maison/catalog.html?cat=<slug> — каталог целиком или одна категория */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;
  var c = D.category(u.param("cat"));
  var list = c ? D.PRODUCTS.filter(function(p){ return p.cat === c.s; }) : D.PRODUCTS;

  document.getElementById("cat-title").textContent = c ? c.t : "Коллекции";
  document.getElementById("cat-count").textContent = list.length + " " + u.plural(list.length, ["предмет", "предмета", "предметов"]);
  document.getElementById("cat-list").innerHTML =
    '<a href="catalog.html" class="' + (!c ? "on" : "") + '">Все</a>' +
    D.CATS.map(function(x){
      return '<a href="catalog.html?cat=' + x.s + '" class="' + (c && c.s === x.s ? "on" : "") + '">' + x.t + '</a>';
    }).join("");
  document.getElementById("pgrid").innerHTML = list.map(u.productCard).join("");

  if (c) document.title = c.t + " — BELLA HOME";
})();
