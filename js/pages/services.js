/* design/services.html — раскрывающийся список услуг */
(function(){
  "use strict";
  var u = BH.u, D = BH.data;
  document.getElementById("acc").innerHTML = D.SERVICES.map(function(s, i){
    var open = i === 0;
    return '<div class="acc-i rv' + (open ? " open" : "") + '">' +
      '<button class="acc-h" aria-expanded="' + open + '"><span>' + s.t + '</span><i aria-hidden="true"></i></button>' +
      '<div class="acc-b"><div><div class="acc-in">' +
        '<div class="stack" style="gap:14px"><p>' + s.d + '</p><p class="up steps-t">Этапы</p><ol>' +
          s.st.map(function(x){ return "<li>" + x + "</li>"; }).join("") + '</ol></div>' +
        u.ph(s.t.toLowerCase(), "r43") +
      '</div></div></div></div>';
  }).join("");
})();
