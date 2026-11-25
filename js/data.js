/* Контент сайта: контакты, проекты, услуги, каталог мебели */
window.BH = window.BH || {};

BH.data = (function(){
  "use strict";

  var CONTENT = { demo: true };

  var COMPANY = {brand:'BELLA HOME',slogan:'Timeless Architecture & Interiors'};

  /* Соцсети в подвале: пока url пустой, название показывается без ссылки */
  var SOCIALS = [
    {t: "Telegram", url: null},
    {t: "VK", url: null},
    {t: "Pinterest", url: null}
  ];

  var TYPES = {
    apartment: {t:"Квартиры", one:"Квартира"},
    house:     {t:"Дома",     one:"Дом"},
    commercial: {t:"Коммерческие пространства", one:"Коммерческий интерьер"}
  };

  var PROJECTS = [
  {
    "s": "madonna-benois",
    "t": "Квартира в ЖК «Мадонна Бенуа»",
    "type": "apartment",
    "lead": "Визуализации интерьера квартиры в жилом комплексе «Мадонна Бенуа».",
    "source": "https://www.behance.net/gallery/246701777/kvartira-v-zhk-madonna-benua",
    "cover": 2,
    "images": [
      "Прихожая и хранение",
      "Кухня и обеденная зона",
      "Гостиная",
      "Общая зона: два ракурса",
      "Спальня",
      "Гардеробная",
      "Комната с рабочим местом",
      "Санузел"
    ],
    "photos": [
      "behance-madonna-benua-01",
      "behance-madonna-benua-02",
      "behance-madonna-benua-03",
      "behance-madonna-benua-04",
      "behance-madonna-benua-05",
      "behance-madonna-benua-06",
      "behance-madonna-benua-07",
      "behance-madonna-benua-08"
    ]
  },
  {
    "s": "petergofskie-dachi",
    "t": "Загородный дом «Петергофские дачи»",
    "type": "house",
    "lead": "Визуализации интерьера загородного дома в «Петергофских дачах».",
    "source": "https://www.behance.net/gallery/246700605/zagorodnyj-dom-petergofskie-dachi",
    "cover": 0,
    "images": [
      "Двусветная гостиная",
      "Столовая у окна",
      "Гостиная и лестница",
      "Каминная зона",
      "Кабинет",
      "Рабочее место",
      "Кабинет у окна"
    ],
    "photos": [
      "behance-petergofskie-dachi-01",
      "behance-petergofskie-dachi-02",
      "behance-petergofskie-dachi-03",
      "behance-petergofskie-dachi-04",
      "behance-petergofskie-dachi-05",
      "behance-petergofskie-dachi-06",
      "behance-petergofskie-dachi-07"
    ]
  },
  {
    "s": "istoricheskiy-peterburg",
    "t": "Квартира в историческом доме в центре Петербурга",
    "type": "apartment",
    "lead": "Интерьер квартиры в историческом здании в центре Санкт-Петербурга.",
    "source": "https://www.behance.net/gallery/246699397/kvartira-v-istoricheskom-dome-v-centre-peterburga",
    "cover": 5,
    "images": [
      "Прихожая",
      "Хранение в прихожей",
      "Кухня",
      "Зелёная кухня и клетчатый пол",
      "Кухня и столовая",
      "Гостиная",
      "ТВ-зона и книжные полки",
      "Общая зона"
    ],
    "photos": [
      "behance-istoricheskiy-peterburg-01",
      "behance-istoricheskiy-peterburg-02",
      "behance-istoricheskiy-peterburg-03",
      "behance-istoricheskiy-peterburg-04",
      "behance-istoricheskiy-peterburg-05",
      "behance-istoricheskiy-peterburg-06",
      "behance-istoricheskiy-peterburg-07",
      "behance-istoricheskiy-peterburg-08"
    ]
  },
  {
    "s": "kvartira-v-teplyh-tonah",
    "t": "Квартира в тёплых тонах",
    "type": "apartment",
    "lead": "Тёплая палитра и природные элементы. В проект вошли прихожая, кухня, спальня и санузел с душевой.",
    "source": "https://www.behance.net/gallery/233236757/kvartira-v-teplyh-tonah-s-prirodnymi-elementami",
    "cover": 4,
    "images": [
      "Прихожая",
      "Шкафы в прихожей",
      "Проход в общую зону",
      "Кухня и место отдыха",
      "Спальня",
      "Туалетный столик",
      "Санузел с душевой",
      "Отделка санузла"
    ],
    "photos": [
      "behance-prirodnye-tona-01",
      "behance-prirodnye-tona-02",
      "behance-prirodnye-tona-03",
      "behance-prirodnye-tona-04",
      "behance-prirodnye-tona-05",
      "behance-prirodnye-tona-06",
      "behance-prirodnye-tona-07",
      "behance-prirodnye-tona-08"
    ]
  },
  {
    "s": "madonna-benois-gostinaya",
    "t": "Квартира в ЖК «Мадонна Бенуа» · гостиная и прихожая",
    "type": "apartment",
    "lead": "В проекте представлены гостиная, прихожая, ванная комната и гостевой санузел.",
    "source": "https://www.behance.net/gallery/212084153/kvartira-v-zhk-madonna-benua",
    "cover": 0,
    "images": [
      "Гостиная с камином",
      "Мягкая зона в гостиной",
      "Гостиная с диваном у окна"
    ]
  },
  {
    "s": "odnoetazhnyy-dom-tosno",
    "t": "Одноэтажный дом в Тосно",
    "type": "house",
    "lead": "Проект загородного дома с кухней-гостиной, основной спальней и двумя детскими комнатами.",
    "source": "https://www.behance.net/gallery/199847711/zagorodnyj-dom-v-g-tosno-odnoetazhnyj",
    "cover": 0,
    "images": [
      "Прихожая со встроенными шкафами",
      "Ниша с подсветкой в прихожей",
      "Вид из прихожей в холл"
    ]
  },
  {
    "s": "dom-v-podmoskove",
    "t": "Загородный дом в Подмосковье",
    "type": "house",
    "lead": "Семейный дом с кухней-гостиной, кабинетом, мансардой и зоной отдыха с сауной и спортзалом.",
    "source": "https://www.behance.net/gallery/191594579/zagorodnyj-dom-v-podmoskove",
    "cover": 1,
    "images": [
      "Холл первого этажа с зеркалом",
      "Лестница в холле",
      "Лестничный холл, вид на вход"
    ]
  },
  {
    "s": "kvartira-v-pushkine",
    "t": "Квартира в Пушкине с межкомнатным окном",
    "type": "apartment",
    "lead": "Межкомнатное окно связывает помещения и стало отличительной деталью проекта.",
    "source": "https://www.behance.net/gallery/168797025/kvartira-v-gpushkin-s-mezhkomnatnym-oknom",
    "cover": 1,
    "images": [
      "Мягкая зона у межкомнатного окна",
      "Диван и межкомнатное окно",
      "Гостиная со стеллажом и зоной ТВ"
    ]
  },
  {
    "s": "dom-vo-vsevolozhske",
    "t": "Загородный дом во Всеволожске",
    "type": "house",
    "lead": "Визуализации интерьера загородного дома во Всеволожске.",
    "source": "https://www.behance.net/gallery/168796755/zagorodnyj-dom-v-gvsevolozhsk",
    "cover": 0,
    "images": [
      "Гостиная с подвесным камином",
      "Столовая",
      "Зона отдыха у окон",
      "Кухня и гостиная",
      "Двусветное пространство",
      "Кухонный остров",
      "Обеденный стол",
      "Кресло у камина"
    ],
    "photos": [
      "behance-vsevolozhsk-01",
      "behance-vsevolozhsk-02",
      "behance-vsevolozhsk-03",
      "behance-vsevolozhsk-04",
      "behance-vsevolozhsk-05",
      "behance-vsevolozhsk-06",
      "behance-vsevolozhsk-07",
      "behance-vsevolozhsk-08"
    ]
  },
  {
    "s": "zagorodnyy-dom-tosno",
    "t": "Загородный дом в Тосно",
    "type": "house",
    "lead": "Визуализация интерьера загородного дома в Тосно.",
    "source": "https://www.behance.net/gallery/168796425/zagorodnyj-dom-v-g-tosno",
    "cover": 0,
    "images": [
      "Столовая с круглым столом",
      "Гостиная с камином",
      "Обеденная зона и гостиная"
    ]
  },
  {
    "s": "bannyy-kompleks",
    "t": "Банный комплекс",
    "type": "commercial",
    "lead": "Визуализации интерьера банного комплекса.",
    "source": "https://www.behance.net/gallery/168796183/bannyj-kompleks",
    "cover": 2,
    "images": [
      "Обеденный стол у окон",
      "Зона отдыха с камином",
      "Общий вид зоны отдыха и столовой"
    ]
  },
  {
    "s": "pitstseriya",
    "t": "Пиццерия",
    "type": "commercial",
    "lead": "Визуализации интерьера пиццерии.",
    "source": "https://www.behance.net/gallery/168795679/piccerija",
    "cover": 0,
    "images": [
      "Стойка пиццерии",
      "Зона обслуживания",
      "Светильники и декор",
      "Посадочные места",
      "Общий вид пиццерии"
    ],
    "photos": [
      "behance-pitstseriya-01",
      "behance-pitstseriya-02",
      "behance-pitstseriya-03",
      "behance-pitstseriya-04",
      "behance-pitstseriya-05"
    ]
  }
];

  var SERVICES = [
    {t:"Архитектурное проектирование",d:"Проектируем загородные дома и перепланировки квартир: от эскиза фасада до рабочей документации для строителей.",st:["Обмерный план и анализ участка","Эскизный проект и объёмная модель","Архитектурный и конструктивный разделы","Согласование инженерных систем"]},
    {t:"Дизайн интерьера",d:"Планировка, визуализации и рабочие чертежи, по которым подрядчики смогут воплотить интерьер. Состав документации и график обсуждаем после знакомства с объектом.",st:["Техническое задание и планировочные решения","Концепция и коллажи","Фотореалистичные визуализации","Рабочая документация и спецификации"]},
    {t:"Декорирование",d:"Подбираем текстиль, свет, искусство и предметы декора, чтобы завершить интерьер или обновить готовое пространство.",st:["Выезд и анализ пространства","Подбор тканей, ковров и света","Подбор искусства и объектов","Расстановка и стайлинг"]},
    {t:"Комплектация",d:"Собираем спецификации мебели, света и отделки. Сопоставляем варианты по материалам, бюджету и срокам, согласуем замены и последовательность поставок.",st:["Сводная смета","Размещение заказов","Логистика и таможня","Приёмка и сборка на объекте"]},
    {t:"Сопровождение проекта",d:"Авторский надзор: архитектор бюро регулярно бывает на объекте и следит, чтобы реализация совпала с проектом.",st:["График выездов на объект","Ответы подрядчикам и корректировки","Контроль качества отделки","Финальная приёмка"]}
  ];

  var CATS = [
    ["bufety","Буфеты и стеллажи","Буфет"],["komody","Комоды и бары","Комод"],["konsoli","Консоли","Консоль"],["tumby","Тумбочки","Тумба"],
    ["postamenty","Постаменты","Постамент"],["vannaya","Мебель для ванной","Тумба под раковину"],["obedennye","Обеденные столы","Обеденный стол"],
    ["dekorativnye","Декоративные столы","Столик"],["pismennye","Письменные столы","Письменный стол"],["divany","Диваны и кресла","Диван"],
    ["krovati","Кровати","Кровать"],["banketki","Банкетки и пуфы","Банкетка"],["stulya","Стулья","Стул"],["dveri","Двери","Дверь"],["garderobnye","Гардеробные","Гардеробная"]
  ].map(function(c){ return {s:c[0], t:c[1], one:c[2]}; });

  /* Ручная подборка по фотографиям. Характеристики реальных предметов добавляются после согласования. */
  var PRODUCTS = [
  {
    "id": "bufety-1",
    "cat": "bufety",
    "t": "Буфет / 01",
    "isNew": true
  },
  {
    "id": "bufety-2",
    "cat": "bufety",
    "t": "Буфет / 02",
    "isNew": false
  },
  {
    "id": "bufety-3",
    "cat": "bufety",
    "t": "Буфет / 03",
    "isNew": false
  },
  {
    "id": "komody-1",
    "cat": "komody",
    "t": "Комод / 01",
    "isNew": false
  },
  {
    "id": "komody-2",
    "cat": "komody",
    "t": "Комод / 02",
    "isNew": false
  },
  {
    "id": "komody-3",
    "cat": "komody",
    "t": "Комод / 03",
    "isNew": false
  },
  {
    "id": "komody-4",
    "cat": "komody",
    "t": "Комод / 04",
    "isNew": true
  },
  {
    "id": "konsoli-1",
    "cat": "konsoli",
    "t": "Консоль / 01",
    "isNew": false
  },
  {
    "id": "konsoli-2",
    "cat": "konsoli",
    "t": "Консоль / 02",
    "isNew": false
  },
  {
    "id": "konsoli-3",
    "cat": "konsoli",
    "t": "Консоль / 03",
    "isNew": true
  },
  {
    "id": "konsoli-4",
    "cat": "konsoli",
    "t": "Консоль / 04",
    "isNew": false
  },
  {
    "id": "tumby-1",
    "cat": "tumby",
    "t": "Тумба / 01",
    "isNew": false
  },
  {
    "id": "tumby-2",
    "cat": "tumby",
    "t": "Тумба / 02",
    "isNew": true
  },
  {
    "id": "tumby-3",
    "cat": "tumby",
    "t": "Тумба / 03",
    "isNew": false
  },
  {
    "id": "postamenty-1",
    "cat": "postamenty",
    "t": "Журнальный стол / 01",
    "isNew": true
  },
  {
    "id": "postamenty-2",
    "cat": "postamenty",
    "t": "Журнальный стол / 02",
    "isNew": false
  },
  {
    "id": "postamenty-3",
    "cat": "postamenty",
    "t": "Журнальный стол / 03",
    "isNew": false
  },
  {
    "id": "vannaya-1",
    "cat": "vannaya",
    "t": "Тумба под раковину / 01",
    "isNew": false
  },
  {
    "id": "vannaya-2",
    "cat": "vannaya",
    "t": "Тумба под раковину / 02",
    "isNew": false
  },
  {
    "id": "vannaya-3",
    "cat": "vannaya",
    "t": "Тумба под раковину / 03",
    "isNew": false
  },
  {
    "id": "vannaya-4",
    "cat": "vannaya",
    "t": "Тумба под раковину / 04",
    "isNew": true
  },
  {
    "id": "vannaya-5",
    "cat": "vannaya",
    "t": "Тумба под раковину / 05",
    "isNew": false
  },
  {
    "id": "obedennye-1",
    "cat": "obedennye",
    "t": "Обеденный стол / 01",
    "isNew": false
  },
  {
    "id": "obedennye-2",
    "cat": "obedennye",
    "t": "Обеденный стол / 02",
    "isNew": false
  },
  {
    "id": "obedennye-3",
    "cat": "obedennye",
    "t": "Обеденный стол / 03",
    "isNew": true
  },
  {
    "id": "dekorativnye-1",
    "cat": "dekorativnye",
    "t": "Столик / 01",
    "isNew": false
  },
  {
    "id": "dekorativnye-2",
    "cat": "dekorativnye",
    "t": "Столик / 02",
    "isNew": true
  },
  {
    "id": "dekorativnye-3",
    "cat": "dekorativnye",
    "t": "Столик / 03",
    "isNew": false
  },
  {
    "id": "pismennye-1",
    "cat": "pismennye",
    "t": "Письменный стол / 01",
    "isNew": true
  },
  {
    "id": "pismennye-2",
    "cat": "pismennye",
    "t": "Письменный стол / 02",
    "isNew": false
  },
  {
    "id": "pismennye-3",
    "cat": "pismennye",
    "t": "Письменный стол / 03",
    "isNew": false
  },
  {
    "id": "divany-1",
    "cat": "divany",
    "t": "Кресло / 01",
    "isNew": false
  },
  {
    "id": "divany-2",
    "cat": "divany",
    "t": "Кресло / 02",
    "isNew": false
  },
  {
    "id": "divany-3",
    "cat": "divany",
    "t": "Кресло / 03",
    "isNew": false
  },
  {
    "id": "krovati-1",
    "cat": "krovati",
    "t": "Кровать / 01",
    "isNew": false
  },
  {
    "id": "krovati-2",
    "cat": "krovati",
    "t": "Кровать / 02",
    "isNew": false
  },
  {
    "id": "krovati-3",
    "cat": "krovati",
    "t": "Кровать / 03",
    "isNew": true
  },
  {
    "id": "krovati-4",
    "cat": "krovati",
    "t": "Кровать / 04",
    "isNew": false
  },
  {
    "id": "banketki-1",
    "cat": "banketki",
    "t": "Диван / 01",
    "isNew": false
  },
  {
    "id": "banketki-2",
    "cat": "banketki",
    "t": "Диван / 02",
    "isNew": true
  },
  {
    "id": "banketki-3",
    "cat": "banketki",
    "t": "Диван / 03",
    "isNew": false
  },
  {
    "id": "banketki-4",
    "cat": "banketki",
    "t": "Диван / 04",
    "isNew": false
  },
  {
    "id": "stulya-1",
    "cat": "stulya",
    "t": "Полукресло / 01",
    "isNew": true
  },
  {
    "id": "stulya-2",
    "cat": "stulya",
    "t": "Полукресло / 02",
    "isNew": false
  },
  {
    "id": "stulya-3",
    "cat": "stulya",
    "t": "Полукресло / 03",
    "isNew": false
  },
  {
    "id": "dveri-1",
    "cat": "dveri",
    "t": "Дверь / 01",
    "isNew": false
  },
  {
    "id": "dveri-2",
    "cat": "dveri",
    "t": "Дверь / 02",
    "isNew": false
  },
  {
    "id": "dveri-3",
    "cat": "dveri",
    "t": "Дверь / 03",
    "isNew": false
  },
  {
    "id": "dveri-4",
    "cat": "dveri",
    "t": "Дверь / 04",
    "isNew": true
  },
  {
    "id": "garderobnye-1",
    "cat": "garderobnye",
    "t": "Гардеробная / 01",
    "isNew": false
  },
  {
    "id": "garderobnye-2",
    "cat": "garderobnye",
    "t": "Гардеробная / 02",
    "isNew": false
  },
  {
    "id": "garderobnye-3",
    "cat": "garderobnye",
    "t": "Гардеробная / 03",
    "isNew": true
  },
  {
    "id": "garderobnye-4",
    "cat": "garderobnye",
    "t": "Гардеробная / 04",
    "isNew": false
  },
  {
    "id": "garderobnye-5",
    "cat": "garderobnye",
    "t": "Гардеробная / 05",
    "isNew": false
  }
];

  CATS.forEach(function(c){ var label={"bufety": ["Буфеты и стеллажи", "Буфет"], "komody": ["Комоды", "Комод"], "konsoli": ["Консоли", "Консоль"], "tumby": ["Тумбы", "Тумба"], "postamenty": ["Журнальные столы", "Журнальный стол"], "vannaya": ["Мебель для ванной", "Тумба под раковину"], "obedennye": ["Обеденные столы", "Обеденный стол"], "dekorativnye": ["Небольшие столы", "Столик"], "pismennye": ["Письменные столы", "Письменный стол"], "divany": ["Кресла", "Кресло"], "krovati": ["Кровати", "Кровать"], "banketki": ["Диваны", "Диван"], "stulya": ["Стулья и полукресла", "Полукресло"], "dveri": ["Двери", "Дверь"], "garderobnye": ["Гардеробные", "Гардеробная"]}[c.s]; if(label){c.t=label[0];c.one=label[1];} });

  function find(list, key, val){
    for (var i = 0; i < list.length; i++) if (list[i][key] === val) return list[i];
    return null;
  }

  return {
    CONTENT: CONTENT, COMPANY: COMPANY, SOCIALS: SOCIALS, TYPES: TYPES, PROJECTS: PROJECTS, SERVICES: SERVICES, CATS: CATS, PRODUCTS: PRODUCTS,
    project:  function(s){ return find(PROJECTS, "s", s); },
    category: function(s){ return find(CATS, "s", s); },
    product:  function(id){ return find(PRODUCTS, "id", id); }
  };
})();
