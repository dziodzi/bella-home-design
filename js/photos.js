/* Фотографии для сайта. Источник — Unsplash (https://unsplash.com/license):
   бесплатное использование, в том числе коммерческое, без обязательной атрибуции.

   Правила:
   1. У каждого проекта и каждого предмета каталога свой снимок, ни у кого не совпадающий.
      Он закреплён за ним и одинаков на всех страницах (data-key="p:<проект>" / "i:<предмет>").
   2. Остальные фото подбираются по теме (data-kind или подпись data-caption).
   3. На одной странице один снимок не встречается дважды: если тема исчерпана,
      берётся фото из соседней темы (FALLBACK).
   Чтобы поставить своё фото, задайте блоку data-src="путь/к/файлу.jpg". */
window.BH = window.BH || {};

BH.photos = (function(){
  "use strict";
  var D = BH.data;

  var POOLS = {
    /* интерьеры */
    living:  ["1598928506311-c55ded91a20c","1638885930125-85350348d266","1600210491892-03d54c0aaf87","1618221195710-dd6b41faaea6","1728649054288-61f332ee389b","1593987314040-8e0ac84ae724","1628744876497-eb30460be9f6","1613545325278-f24b0cae1224","1785441513757-56bba752353d","1653854758754-4bda12e382e6","1717241364871-e8e369b8327d","1699901524286-41a46a4cd5c8","1649083048770-82e8ffd80431"],
    dining:  ["1635108197695-05184e426907","1776313756912-8456579ea487","1777781835512-bad3c28f90ed","1769140771440-e691bc16bf8e","1758448500631-644bb3c1c942","1772112334897-7e249a9ad811","1766670484021-83b4880f5569","1780245992293-040e15003d52","1774803685883-6767138dd892","1756728891481-891d0372408f","1777781835626-791c37b62314"],
    bedroom: ["1616594039964-ae9021a400a0","1560185893-a55cbc8c57e8","1505693416388-ac5ce068fe85","1617098900591-3f90928e8c54","1640109478916-f445f8f19b11","1644057501622-dfa7dd26dbfb","1642541070065-3912f347e7c6","1616594092403-fb65629b0a46","1688383454669-9f5cc5991778","1724166655256-0ae10f1ab89a","1616486029423-aaa4789e8c9a","1718717621302-a359be21a111"],
    kitchen: ["1682888813913-e13f18692019","1717429541792-5c59021d6ceb","1683629357963-adf2b1fa9ad9","1738748444653-2fb1388aef1a","1682888813795-192fca4a10d9","1649083048597-d7b4f1e8a386"],
    bath:    ["1756079664354-34944e001f6d","1704731529088-19083feb5b43","1701251786408-d0320ecaad8d","1744025098626-66c0b9cb1ba8","1564540579594-0930edb6de43","1753605788101-04d1e653e74a","1742134131017-44d377a611b1","1733426107854-ee00a25d72a7"],
    office:  ["1778731525532-d2ab833c8463","1764410481612-7544525b2991","1706074793638-da28b90ea8ae","1706074740295-d7a79c079562","1715593949273-09009558300a","1623351143485-b1d4937747f3"],
    library: ["1783805887908-c8934e4dcc6f","1739918069081-78dddf3240a6","1662379940109-1026a0dcfe95","1642160428828-334bf07023ec"],
    hall:    ["1778049995815-04091b798bdc","1771148157764-534bc7a66c21","1779216276583-704f7796fede","1651667349561-2d9c75e62580","1779216276738-68927585c8c9","1675419457963-071b02e5dab8"],
    deco:    ["1763933559663-0a2aa9e0d2a6","1761116186182-552857afa0d4","1690067323211-30ecd7522ca2","1782508508085-994dbb23a04e","1785441513847-aa6a6576b99e"],
    house:   ["1788295892453-983e90267808","1760627593331-01e2edd90c73","1588951711576-430832e288a9","1780246031247-d4796ab6f606"],
    detail:  ["1550336163-fd7bb464e5a2","1646872686934-cf4c910fc219","1788856638780-e3a400a1f03b","1606676539472-86484ffe0272","1786840229111-446787c75bf9"],
    book:    ["1665609776242-e97721b611f4","1647967527216-adea2f078e07","1621255619930-739359991b1b","1640841932394-7e135c0c6c3c"],
    city:    ["1749971496139-cbde7fb92e57","1661529234681-6957e2064c56","1561117937-45681fb935ad"],
    /* предметы */
    cabinet: ["1713810958247-01dbd76b4a61","1718049719548-723e863fbccf","1628152371231-936cf45eb8f3","1612908317776-a3afde8232fa","1574501668452-39ee2dd312ab","1593443746658-bfaece08b4f8","1547406482-7db6aa0b5fde","1690310588492-fc8f92bff323","1683731332610-23d833f5871f","1698953704644-6fb636c6389d","1603112089080-3ef8f7bb9dcf","1615492271163-520ad402e96d","1780245992600-e33d33aae850","1719035271030-c4f941639aaf","1774578342062-cb222a06404b","1568506759738-cffdd14e1232","1783018563064-bd08fcc49f8d","1606246481694-b8d4ce67b287"],
    table:   ["1717241364900-432b01d0bf89","1650179752373-10dfcf7f8395","1718524767487-7f98d4e5eeeb","1717241364864-34a3d2eb3781","1758977403403-c51ef509e788","1609879938030-31acdeded104","1624304314520-8acb626f91f9","1752061289543-de2e7720b029","1752061289739-1f09db643ffe","1779705948722-7745462b7ee3","1784653549130-67586c49f016","1788223900715-641af24db423","1785535573604-62e31f0fd341","1784653548224-3e6506ff1c60","1784653549138-ce6f99ac4a6c","1784651859206-f45977db8823","1784651859128-b04c1d4732f3","1581428982868-e410dd047a90","1718049719673-70ee6f6dfa28","1752061289626-2b900a5ca2b0","1696814289069-5a0bff66e628","1714926340157-dd3a67e7b2c4","1688728147390-6925695b443f","1759262151001-3f8841d02ce1","1782875574733-501ccdb0add3","1643558544531-bff73bbffc28","1649011327045-624a1bd2c3e7","1558931450-5669a8529337","1770646403987-64cf5c08c870","1611269154421-4e27233ac5c7","1597072689227-8882273e8f6a","1736281512973-d17ef05f9709","1613252036716-e1efc9788e5b"],
    sofa:    ["1771876499965-72f0a702c45a","1703696397214-38482bee3b28","1652125015971-f1a90d7cb093","1564078516393-cf04bd966897","1599696848652-f0ff23bc911f","1611967164521-abae8fba4668","1579656592043-a20e25a4aa4b","1579488085123-6a6a3630f0f6","1555041469-a586c61ea9bc","1759647020668-648cd90ddce4","1782512175859-02bde5592785","1780245994710-57d257faa5b9","1771316210386-39662a3b28fe","1783331889236-cc39450ea573","1691480152351-4b3f2c89ccff","1567016432779-094069958ea5","1620429408060-423d98bf9092","1637489550183-7da04b8029ac"],
    chair:   ["1578653282816-a508bd2d0435","1617582907226-c49e2d8200d9","1723804685588-b8e95b2044f3","1631563642459-ae1b71341a5f","1631912423639-13b9cff4b812","1601366533287-5ee4c763ae4e","1617228133035-2347f159e755","1605702098590-d552a98dc93d","1586023492125-27b2c045efd7","1617364852223-75f57e78dc96","1506332088442-9e0024864f5d","1501045661006-fcebe0257c3f","1598300042247-d088f8ab3a91","1718049719688-764249c6800d","1634148737510-727f137375e0"],
    bed:     ["1635594202056-9ea3b497e5c0","1560185128-e173042f79dd","1517912158475-fb0ab8c8eed1","1768946131530-358c52c4c42d","1768946131535-b90bad125f16","1425219366480-47fdbbe0e83b","1631650120985-20791383127e","1713365963723-655fa464b681"],
    vanity:  ["1682888818696-906287d759f5","1763485955998-a9284d042d50","1635286771551-9d7241ce7811","1613849925352-96348d26bc51","1600488999585-e4364713b90a","1661107259637-4e1c55462428","1604769319166-010643ace337"],
    closet:  ["1778731660196-1b57aa0f7ef5","1774301211236-dab64d553241","1778731660303-1fa5ede75477","1785395407788-71b829c98bb4","1781473377372-8690a514c152","1672137233327-37b0c1049e77","1708397016786-8916880649b8","1640357154220-9775b0f31dec","1776510991868-86ccfa4cf661"],
    door:    ["1536160885591-301854e2ed04","1603673298820-40d77252226d","1537199322506-85bfd51c0601","1692802626202-b51c2056fbb8","1542020383883-6c6b2a343807","1561111283-8eff0e921cf6","1759803545394-041ea7b71989","1530982937671-bc00141b5d79","1530982900219-d13d50b354e6","1659283878936-7221f7b29303","1620887147081-68a8eb3cc66c","1569675318803-51c8580f2bf5"]
  };

  /* Куда смотреть, если тема на странице исчерпана */
  var FALLBACK = {
    living:["deco","hall","dining","library"], dining:["living","deco"], bedroom:["bed","living"], kitchen:["dining","living"],
    bath:["vanity","living"], office:["library","living"], library:["office","living"], hall:["deco","living"],
    deco:["hall","living"], house:["living","hall"], detail:["deco","door"], book:["library","detail"], city:["house","hall"],
    cabinet:["table","closet"], table:["cabinet","dining"], sofa:["chair","living"], chair:["sofa","living"],
    bed:["bedroom"], vanity:["bath"], closet:["cabinet","bedroom"], door:["hall","detail"]
  };

  /* Подпись → тема. Первое совпадение побеждает */
  var RULES = [
    [/карт|наб\./, "city"],
    [/книг|разворот|каталог|обложк/, "book"],
    [/^двер/, "door"],
    [/^диван/, "sofa"],
    [/спальн|кровать|гардероб|изголов/, "bedroom"],
    [/столов|обеден|парадн/, "dining"],
    [/кухн|бар$/, "kitchen"],
    [/ванн|спа|хаммам/, "bath"],
    [/офис|кабинет|переговор|ресепшн|шоурум|материалов|руководител/, "office"],
    [/библиот|бильярд/, "library"],
    [/холл|лестниц|анфилад/, "hall"],
    [/терраса|архитектурн|дом |усадьб/, "house"],
    [/деталь|фурнитур|латун|сопровожд|комплектац/, "detail"],
    [/ар-деко|люстр|музыкальн|коллекция/, "deco"],
    [/гостин|камин|интерьер|декорир|дизайн/, "living"]
  ];

  var CATEGORY = {
    bufety:"cabinet", komody:"cabinet", tumby:"cabinet", garderobnye:"closet",
    konsoli:"table", postamenty:"table", obedennye:"table", dekorativnye:"table", pismennye:"table",
    divany:"sofa", banketki:"sofa", stulya:"chair", krovati:"bed", vannaya:"vanity", dveri:"door"
  };

  function kindOf(caption){
    var c = (caption || "").toLowerCase();
    for (var i = 0; i < RULES.length; i++) if (RULES[i][0].test(c)) return RULES[i][1];
    return "living";
  }
  function hash(s){
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function url(id, width){
    return (document.body.getAttribute('data-root') || '') + 'img/photos/' + id + '.jpg';
  }
  function chain(kind){
    var list = [kind].concat(FALLBACK[kind] || []), seen = {};
    return list.concat(Object.keys(POOLS)).filter(function(k){ return POOLS[k] && !seen[k] && (seen[k] = true); });
  }

  /* ---------- 1. Закреплённые снимки: каждому проекту и предмету свой ---------- */
  var ASSIGNED = {}, taken = {};
  function reserve(key, kind, salt){
    var kinds = chain(kind);
    for (var k = 0; k < kinds.length; k++){
      var pool = POOLS[kinds[k]], start = hash(salt) % pool.length;
      for (var j = 0; j < pool.length; j++){
        var id = pool[(start + j) % pool.length];
        if (!taken[id]){ taken[id] = true; ASSIGNED[key] = {id: id, kind: kind}; return; }
      }
    }
  }
  var CURATED_PROJECTS = {"interer-kak-iskusstvo": "1598928506311-c55ded91a20c", "parizhskoe-nastroenie": "1638885930125-85350348d266", "produmannaya-estetika": "1618221195710-dd6b41faaea6", "melodiya-estetiki": "1628744876497-eb30460be9f6", "mesto-sily-dom": "1600210491892-03d54c0aaf87", "dom-v-stile-bozar": "1653854758754-4bda12e382e6", "usadba-u-lesa": "1613545325278-f24b0cae1224", "ofis-byuro": "1715593949273-09009558300a", "ofis-v-stile-ar-deko": "1706074793638-da28b90ea8ae", "aziatskiy-shik": "1717241364871-e8e369b8327d", "prostor-i-uyut": "1593987314040-8e0ac84ae724", "ogni-bolshogo-goroda": "1728649054288-61f332ee389b"};
  D.PROJECTS.forEach(function(p){
    var id=CURATED_PROJECTS[p.s];
    if(id){taken[id]=true;ASSIGNED["p:"+p.s]={id:id,kind:p.type==="office"?"office":"living"};}
    else reserve("p:" + p.s, p.type === "office" ? "office" : kindOf(p.rooms[0][0]), p.s);
  });
  var CURATED_PRODUCTS = {"bufety-1": "1713810958247-01dbd76b4a61", "bufety-2": "1718049719548-723e863fbccf", "bufety-3": "1628152371231-936cf45eb8f3", "komody-1": "1690310588492-fc8f92bff323", "komody-2": "1547406482-7db6aa0b5fde", "komody-3": "1615492271163-520ad402e96d", "komody-4": "1612908317776-a3afde8232fa", "konsoli-1": "1609879938030-31acdeded104", "konsoli-2": "1718524767487-7f98d4e5eeeb", "konsoli-3": "1650179752373-10dfcf7f8395", "konsoli-4": "1784651859128-b04c1d4732f3", "tumby-1": "1774578342062-cb222a06404b", "tumby-2": "1568506759738-cffdd14e1232", "tumby-3": "1719035271030-c4f941639aaf", "postamenty-1": "1581428982868-e410dd047a90", "postamenty-2": "1718049719673-70ee6f6dfa28", "postamenty-3": "1643558544531-bff73bbffc28", "vannaya-1": "1613849925352-96348d26bc51", "vannaya-2": "1600488999585-e4364713b90a", "vannaya-3": "1661107259637-4e1c55462428", "vannaya-4": "1604769319166-010643ace337", "vannaya-5": "1682888818696-906287d759f5", "obedennye-1": "1696814289069-5a0bff66e628", "obedennye-2": "1758977403403-c51ef509e788", "obedennye-3": "1635108197695-05184e426907", "dekorativnye-1": "1714926340157-dd3a67e7b2c4", "dekorativnye-2": "1785535573604-62e31f0fd341", "dekorativnye-3": "1788223900715-641af24db423", "pismennye-1": "1613252036716-e1efc9788e5b", "pismennye-2": "1736281512973-d17ef05f9709", "pismennye-3": "1597072689227-8882273e8f6a", "divany-1": "1703696397214-38482bee3b28", "divany-2": "1652125015971-f1a90d7cb093", "divany-3": "1605702098590-d552a98dc93d", "krovati-1": "1768946131535-b90bad125f16", "krovati-2": "1768946131530-358c52c4c42d", "krovati-3": "1517912158475-fb0ab8c8eed1", "krovati-4": "1560185128-e173042f79dd", "banketki-1": "1564078516393-cf04bd966897", "banketki-2": "1759647020668-648cd90ddce4", "banketki-3": "1782512175859-02bde5592785", "banketki-4": "1783331889236-cc39450ea573", "stulya-1": "1631563642459-ae1b71341a5f", "stulya-2": "1631912423639-13b9cff4b812", "stulya-3": "1617364852223-75f57e78dc96", "dveri-1": "1537199322506-85bfd51c0601", "dveri-2": "1692802626202-b51c2056fbb8", "dveri-3": "1542020383883-6c6b2a343807", "dveri-4": "1561111283-8eff0e921cf6", "garderobnye-1": "1672137233327-37b0c1049e77", "garderobnye-2": "1781473377372-8690a514c152", "garderobnye-3": "1785395407788-71b829c98bb4", "garderobnye-4": "1778731660303-1fa5ede75477", "garderobnye-5": "1774301211236-dab64d553241"};
  D.PRODUCTS.forEach(function(p){ var id=CURATED_PRODUCTS[p.id]; if(id){taken[id]=true;ASSIGNED["i:"+p.id]={id:id,kind:CATEGORY[p.cat]};}else reserve("i:"+p.id,CATEGORY[p.cat],p.id); });

  /* ---------- 2–3. Подбор на странице без повторов ---------- */
  var pageUsed = {};
  var pageSalt = hash(location.pathname + location.search);

  /* Сначала ищем снимок, не закреплённый ни за каким проектом или предметом,
     затем — любой ещё не показанный на этой странице */
  function pickFree(kind){
    var kinds = chain(kind);
    for (var pass = 0; pass < 2; pass++){
      for (var k = 0; k < kinds.length; k++){
        var pool = POOLS[kinds[k]], start = (pageSalt + k) % pool.length;
        for (var j = 0; j < pool.length; j++){
          var id = pool[(start + j) % pool.length];
          if (!pageUsed[id] && (pass === 1 || !taken[id])) return id;
        }
      }
    }
    /* все снимки на странице заняты — допускаем повтор, лишь бы блок не был пустым */
    return POOLS[kind][pageSalt % POOLS[kind].length];
  }
  function widthFor(el){
    if (/\b(hero|wide)\b/.test(el.className) || el.closest(".splash, .slides")) return 2000;
    if (el.closest(".thumbs")) return 400;
    return 1000;
  }

  /* Раздаёт снимки набору блоков .ph: сначала закреплённые, затем остальные */
  function assign(els){
    var result = [];
    els.forEach(function(el){
      var a = ASSIGNED[el.getAttribute("data-key")];
      if (el.getAttribute("data-src")){ var match=el.getAttribute("data-src").match(/(\d{10,13}-[a-z0-9]+)/); if(match)pageUsed[match[1]]=true; result.push([el, el.getAttribute("data-src")]); }
      else if (a){ var id=pageUsed[a.id] && el.id!=="pd-main" ? pickFree(a.kind) : a.id; pageUsed[id] = true; result.push([el, url(id, widthFor(el))]); }
    });
    els.forEach(function(el){
      if (el.getAttribute("data-src") || ASSIGNED[el.getAttribute("data-key")]) return;
      var id = pickFree(el.getAttribute("data-kind") || kindOf(el.getAttribute("data-caption")));
      pageUsed[id] = true;
      result.push([el, url(id, widthFor(el))]);
    });
    return result;
  }

  return {POOLS: POOLS, CATEGORY: CATEGORY, kindOf: kindOf, url: url, assign: assign};
})();
