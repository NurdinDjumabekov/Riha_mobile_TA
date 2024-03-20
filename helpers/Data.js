export const dataCategory = [
  {
    codeid: 1,
    name: "Мои заявки",
    link: "Application",
    // img: "https://img.freepik.com/free-photo/hand-holding-and-writing-checklist-application-form-document-on-clipboard-on-white-background-3d-illustration_56104-1551.jpg?w=900&t=st=1710666284~exp=1710666884~hmac=35f51750850c07ddee98085c0d060a6b6dfb2c9239b9782656c51a3157ded15c",
    img: "https://img.freepik.com/free-vector/button-style-concept-illustration_114360-4428.jpg?size=626&ext=jpg&ga=GA1.1.712878996.1706520692&semt=ais",
    pathApi: "Application",
  },
  {
    codeid: 2,
    name: "Приходы",
    link: "Comming",
    // img: "https://img.freepik.com/free-photo/3d-render-of-paper-clipboard-with-green-tick_107791-15840.jpg?t=st=1710666268~exp=1710666868~hmac=cc6f2e56021a30cba97967879fbfd136f530c326ed8440f14d2c5b306459ee0b",
    img:"https://img.freepik.com/free-vector/completed-steps-concept-illustration_114360-5441.jpg?size=626&ext=jpg&ga=GA1.1.712878996.1706520692&semt=ais",
    pathApi: "",
  },
  {
    codeid: 3,
    name: "Остатки",
    link: "Leftovers",
    img: "https://img.freepik.com/premium-vector/terms-and-conditions-concept-illustration_108061-451.jpg?size=626&ext=jpg&ga=GA1.1.712878996.1706520692&semt=ais",
    pathApi: "Leftovers",
  },
  {
    codeid: 4,
    name: "Реализация",
    link: "Realiz",
    img: "https://img.freepik.com/free-vector/posts-concept-illustration_114360-112.jpg?w=740&t=st=1710925459~exp=1710926059~hmac=1fceb9efe8e3f24d7d4bcee953232bf181a89b4fc703a7086866134fe73cd5d7",
    pathApi: "Realiz",
  },
  {
    codeid: 5,
    name: "Деньги",
    link: "Money",
    img: "https://img.freepik.com/free-vector/euro-coins-concept-illustration_114360-15485.jpg?t=st=1710925698~exp=1710929298~hmac=4fb3746133437b6b0ca94daa3d06c8c634817a0562bb3e4ac1df5e613f3512bd&w=740",
    pathApi: "Money",
  },
  {
    codeid: 6,
    name: "Запросы",
    link: "Request",
    img: "https://img.freepik.com/free-vector/flat-university-concept_23-2148184535.jpg?t=st=1710925750~exp=1710929350~hmac=69394729219cd3ff08fc08714f54ac8b04644046299d520ab2fd1003d3b779b6&w=740",
    pathApi: "Request",
  },
];

export const listMyApplicationData = [
  {
    codeid: 1,
    who: "Нурдин Джумабеков",
    date: "17.03.2024",
    status: 0,
    list: [
      {
        codeid: 1,
        name: "Сырная колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
      },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 20, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 4, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 5, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 6, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 7, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
    ],
  },
  {
    codeid: 2,
    who: "Садирдинов Руслан",
    date: "18.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 3,
    who: "Дубанаева Элнура",
    date: "19.03.2024",
    status: 0,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 4,
    who: "Алиев Баатыр",
    date: "20.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
];

export const listPrihod = [
  {
    codeid: 1,
    who: "Нурдин Джумабеков",
    whom: "Садирдинов Руслан",
    date: "17.03.2024",
    status: 0,
    list: [
      {
        codeid: 1,
        name: "Сырная колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
      },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 20, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 4, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 5, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 6, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 7, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
    ],
  },
  {
    codeid: 2,
    who: "Садирдинов Руслан",
    whom: "Нурдин Джумабеков",
    date: "18.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 3,
    who: "Дубанаева Элнура",
    whom: "Садирдинов Руслан",
    date: "19.03.2024",
    status: 0,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 4,
    who: "Алиев Баатыр",
    whom: "Садирдинов Руслан",
    date: "20.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
];

export const listLeftovers = [
  {
    codeid: 1,
    date: "17.03.2024",
    status: 0,
    list: [
      {
        codeid: 1,
        name: "Сырная колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
        leftoversPrice: 10,
        leftoversVes: 2,
        leftoversSum: 20,
      },
      {
        codeid: 2,
        name: "Эстонская колбаса ",
        kol: 10.5,
        ves: 20,
        type: "кг",
        leftoversPrice: 10,
        leftoversVes: 5,
        leftoversSum: 50,
      },
      {
        codeid: 3,
        name: "Докторская колбаса",
        kol: 6.1,
        ves: 5,
        type: "кг",
        leftoversPrice: 60,
        leftoversVes: 2,
        leftoversSum: 120,
      },
      {
        codeid: 4,
        name: "Эстонская колбаса",
        kol: 6.1,
        ves: 5,
        type: "кг",
        leftoversPrice: 80,
        leftoversVes: 2,
        leftoversSum: 160,
      },
    ],
    result: 5000,
  },
  {
    codeid: 2,
    date: "18.03.2024",
    status: 1,
    list: [
      {
        codeid: 1,
        name: "белая колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
        leftoversPrice: 8000,
        leftoversVes: 2,
        leftoversSum: 16000,
      },
      {
        codeid: 2,
        name: "Эстонская колбаса ",
        kol: 10.5,
        ves: 10,
        type: "кг",
        leftoversPrice: 80,
        leftoversVes: 2,
        leftoversSum: 160,
      },
      {
        codeid: 3,
        name: "Докторская колбаса",
        kol: 6.1,
        ves: 10,
        type: "кг",
        leftoversPrice: 80,
        leftoversVes: 2,
        leftoversSum: 160,
      },
    ],
    result: 10000,
  },
  // {
  //   codeid: 3,
  //   date: "10.03.2024",
  //   status: 1,
  //   list: [],
  // },
  {
    codeid: 4,
    date: "05.03.2024",
    status: 1,
    list: [
      {
        codeid: 1,
        name: "белая колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
        leftoversPrice: 8000,
        leftoversVes: 2,
        leftoversSum: 160,
      },
      {
        codeid: 2,
        name: "Эстонская колбаса ",
        kol: 10.5,
        ves: 10,
        type: "кг",
        leftoversPrice: 80,
        leftoversVes: 2,
        leftoversSum: 160,
      },
      {
        codeid: 3,
        name: "Докторская колбаса",
        kol: 6.1,
        ves: 10,
        type: "кг",
        leftoversPrice: 80,
        leftoversVes: 2,
        leftoversSum: 160,
      },
    ],
    result: 15000,
  },
];
