import { Category, MenuItem, Topping } from '../types';

export const CATEGORIES: Category[] = [
  {
    "id": "all",
    "name": "الكل",
    "icon": "grid"
  },
  {
    "id": "pizza-it",
    "name": "بيتزا إيطالي",
    "icon": "/items/it-meat.webp"
  },
  {
    "id": "pizza-or",
    "name": "بيتزا شرقي",
    "icon": "/items/or-meat.webp"
  },
  {
    "id": "sarokh",
    "name": "صاروخ",
    "icon": "/items/sarokh-chicken.webp"
  },
  {
    "id": "hawawshi",
    "name": "حواوشي",
    "icon": "/items/haw-andalus.webp"
  },
  {
    "id": "sandwiches",
    "name": "سندوتشات",
    "icon": "/items/sand-shawarma.webp"
  },
  {
    "id": "bechamel",
    "name": "بشاميل",
    "icon": "/items/bechamel.webp"
  },
  {
    "id": "pasta",
    "name": "باستا",
    "icon": "/items/pasta-negresco.webp"
  },
  {
    "id": "crepe",
    "name": "كريبات",
    "icon": "/items/crepe-pane.webp"
  },
  {
    "id": "crepe-sw",
    "name": "كريب حلو",
    "icon": "/items/crepe-sweet.webp"
  },
  {
    "id": "crepe-kono",
    "name": "كريب كونو",
    "icon": "/items/crepe-kono.webp"
  },
  {
    "id": "pie-sav",
    "name": "فطائر حادق",
    "icon": "/items/pie-mix-cheese.webp"
  },
  {
    "id": "pie-sw",
    "name": "فطائر حلو",
    "icon": "/items/pie-sugar.webp"
  }
];

export const TOPPINGS: Topping[] = [
  {
    "id": "cheese",
    "name": "موتزاريلا",
    "price": 15,
    "icon": "🧀"
  },
  {
    "id": "mushroom",
    "name": "مشروم",
    "price": 10,
    "icon": "🍄"
  },
  {
    "id": "meat",
    "name": "لحم مفروم",
    "price": 20,
    "icon": "🥩"
  },
  {
    "id": "olive",
    "name": "زيتون",
    "price": 5,
    "icon": "🫒"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    "id": "it-meat",
    "name": "بيتزا لحمة إيطالي",
    "category": "pizza-it",
    "description": "لحمة - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-meat.webp",
    "rating": 4.8,
    "calories": 450,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "it-chicken",
    "name": "بيتزا فراخ إيطالي",
    "category": "pizza-it",
    "description": "فراخ - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-chicken.webp",
    "rating": 4.7,
    "calories": 420,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "it-ranch",
    "name": "تشيكن رانش إيطالي",
    "category": "pizza-it",
    "description": "فراخ - صوص رانش - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-ranch.webp",
    "rating": 4.9,
    "calories": 480,
    "prepTime": "20 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 200
      }
    ]
  },
  {
    "id": "it-bbq",
    "name": "تشيكن باربكيو إيطالي",
    "category": "pizza-it",
    "description": "فراخ - صوص باربكيو - صوص طماطم - موزاريلا - زيتون",
    "image": "/items/it-bbq.webp",
    "rating": 4.8,
    "calories": 460,
    "prepTime": "20 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 200
      }
    ]
  },
  {
    "id": "it-sausage",
    "name": "بيتزا سجق إيطالي",
    "category": "pizza-it",
    "description": "سجق - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/pizza-sausage.webp",
    "rating": 4.7,
    "calories": 470,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "it-mushroom",
    "name": "بيتزا مشروم إيطالي",
    "category": "pizza-it",
    "description": "مشروم - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-meat.webp",
    "rating": 4.6,
    "calories": 380,
    "prepTime": "15 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "it-hotdog",
    "name": "بيتزا هوت دوج إيطالي",
    "category": "pizza-it",
    "description": "هوت دوج - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/pizza-sausage.webp",
    "rating": 4.6,
    "calories": 440,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "it-tuna",
    "name": "بيتزا تونا إيطالي",
    "category": "pizza-it",
    "description": "تونا - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-meat.webp",
    "rating": 4.7,
    "calories": 410,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "it-mixcheese",
    "name": "ميكس جبن إيطالي",
    "category": "pizza-it",
    "description": "ميكس جبن - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-mixcheese.webp",
    "rating": 4.8,
    "calories": 500,
    "prepTime": "15 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 220
      }
    ]
  },
  {
    "id": "it-supreme",
    "name": "سوبر سوبريم إيطالي",
    "category": "pizza-it",
    "description": "لحمة - فراخ - سجق - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-andalus.webp",
    "rating": 4.9,
    "calories": 530,
    "prepTime": "25 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 220
      }
    ]
  },
  {
    "id": "it-andalus",
    "name": "بيتزا الأندلس إيطالي",
    "category": "pizza-it",
    "description": "لحمة - فراخ - سوسيس شرقي - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/it-andalus.webp",
    "rating": 5,
    "calories": 550,
    "prepTime": "25 دقيقة",
    "defaultPrice": 120,
    "discountPercent": 10,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 220
      }
    ]
  },
  {
    "id": "it-margherita",
    "name": "بيتزا مارجريتا إيطالي",
    "category": "pizza-it",
    "description": "صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/pizza-margherita.webp",
    "rating": 4.8,
    "calories": 370,
    "prepTime": "15 دقيقة",
    "defaultPrice": 95,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 95
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 120
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "or-meat",
    "name": "بيتزا لحمة شرقي",
    "category": "pizza-or",
    "description": "لحمة - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/or-meat.webp",
    "rating": 4.7,
    "calories": 480,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "or-chicken",
    "name": "بيتزا فراخ شرقي",
    "category": "pizza-or",
    "description": "فراخ - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/or-chicken.webp",
    "rating": 4.8,
    "calories": 450,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "or-mushroom",
    "name": "بيتزا مشروم شرقي",
    "category": "pizza-or",
    "description": "مشروم - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/or-meat.webp",
    "rating": 4.6,
    "calories": 400,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "or-hotdog",
    "name": "بيتزا هوت دوج شرقي",
    "category": "pizza-or",
    "description": "هوت دوج - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/pizza-sausage.webp",
    "rating": 4.6,
    "calories": 460,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "or-tuna",
    "name": "بيتزا تونا شرقي",
    "category": "pizza-or",
    "description": "تونا - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/or-meat.webp",
    "rating": 4.7,
    "calories": 430,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "or-mixcheese",
    "name": "بيتزا ميكس جبن شرقي",
    "category": "pizza-or",
    "description": "ميكس جبن - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/pie-mix-cheese.webp",
    "rating": 4.9,
    "calories": 520,
    "prepTime": "20 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 220
      }
    ]
  },
  {
    "id": "or-andalus",
    "name": "بيتزا الأندلس شرقي",
    "category": "pizza-or",
    "description": "لحمة - فراخ - سوسيس شرقي - صوص طماطم - موزاريلا - زيتون - فلفل",
    "image": "/items/or-meat.webp",
    "rating": 5,
    "calories": 560,
    "prepTime": "25 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 220
      }
    ]
  },
  {
    "id": "sarokh-chicken",
    "name": "صاروخ فراخ",
    "category": "sarokh",
    "description": "ساندوتش صاروخ ملفوف فراخ بتتبيلة الأندلس الخاصة",
    "image": "/items/sarokh-chicken.webp",
    "rating": 4.8,
    "calories": 550,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "sarokh-mix-chicken",
    "name": "صاروخ ميكس فراخ",
    "category": "sarokh",
    "description": "صاروخ ملفوف شاورما فراخ وبانية واستربس",
    "image": "/items/sarokh-chicken.webp",
    "rating": 4.9,
    "calories": 650,
    "prepTime": "15 دقيقة",
    "defaultPrice": 140,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 140
      }
    ]
  },
  {
    "id": "sarokh-meat",
    "name": "صاروخ لحمة",
    "category": "sarokh",
    "description": "صاروخ ملفوف لحمة متبلة بالبهارات الخاصة",
    "image": "/items/sarokh-mix-meat.webp",
    "rating": 4.7,
    "calories": 580,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "sarokh-mix-meat",
    "name": "صاروخ ميكس لحوم",
    "category": "sarokh",
    "description": "صاروخ ملفوف لحمة وسجق وكفتة وموزاريلا",
    "image": "/items/sarokh-mix-meat.webp",
    "rating": 4.9,
    "calories": 680,
    "prepTime": "15 دقيقة",
    "defaultPrice": 140,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 140
      }
    ]
  },
  {
    "id": "sarokh-mix-cheese",
    "name": "صاروخ ميكس جبن",
    "category": "sarokh",
    "description": "صاروخ ملفوف موتزاريلا وشيدر ورومي سايحة",
    "image": "/items/pie-mix-cheese.webp",
    "rating": 4.8,
    "calories": 600,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "sarokh-sausage",
    "name": "صاروخ سجق",
    "category": "sarokh",
    "description": "صاروخ سجق بلدي مبهر ومحمص على الصاج",
    "image": "/items/sarokh-mix-meat.webp",
    "rating": 4.7,
    "calories": 520,
    "prepTime": "15 دقيقة",
    "defaultPrice": 90,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 90
      }
    ]
  },
  {
    "id": "sarokh-kofta",
    "name": "صاروخ كفتة",
    "category": "sarokh",
    "description": "صاروخ كفتة مشوية على الجريل مع الطحينة",
    "image": "/items/sand-kofta.webp",
    "rating": 4.7,
    "calories": 510,
    "prepTime": "15 دقيقة",
    "defaultPrice": 90,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 90
      }
    ]
  },
  {
    "id": "sarokh-strips",
    "name": "صاروخ إستربس",
    "category": "sarokh",
    "description": "صاروخ دجاج استربس مقرمش حار وصوصات",
    "image": "/items/sarokh-chicken.webp",
    "rating": 4.9,
    "calories": 620,
    "prepTime": "15 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "haw-meat",
    "name": "حواوشي لحمة",
    "category": "hawawshi",
    "description": "رغيف حواوشي لحمة متبلة بالفرن ومقرمش",
    "image": "/items/haw-meat.webp",
    "rating": 4.8,
    "calories": 550,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 110
      }
    ]
  },
  {
    "id": "haw-chicken",
    "name": "حواوشي فراخ",
    "category": "hawawshi",
    "description": "رغيف حواوشي دجاج مفروم بالخلطة السرية",
    "image": "/items/haw-meat.webp",
    "rating": 4.7,
    "calories": 500,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 110
      }
    ]
  },
  {
    "id": "haw-mix-cheese",
    "name": "حواوشي ميكس جبن",
    "category": "hawawshi",
    "description": "رغيف حواوشي محشو ميكس جبن سايحة ومطاطية",
    "image": "/items/haw-andalus.webp",
    "rating": 4.9,
    "calories": 600,
    "prepTime": "15 دقيقة",
    "defaultPrice": 130,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 130
      }
    ]
  },
  {
    "id": "haw-sausage",
    "name": "حواوشي سجق",
    "category": "hawawshi",
    "description": "رغيف حواوشي بالسجق الاسكندراني المبهر",
    "image": "/items/haw-meat.webp",
    "rating": 4.7,
    "calories": 560,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 110
      }
    ]
  },
  {
    "id": "haw-andalus",
    "name": "حواوشي الأندلس",
    "category": "hawawshi",
    "description": "حواوشي لحمة وموتزاريلا بالخلطة الأندلسية المميزة",
    "image": "/items/haw-andalus.webp",
    "rating": 5,
    "calories": 650,
    "prepTime": "20 دقيقة",
    "defaultPrice": 130,
    "discountPercent": 15,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 130
      }
    ]
  },
  {
    "id": "haw-baladi",
    "name": "حواوشي بلدي",
    "category": "hawawshi",
    "description": "رغيف حواوشي بلدي أسمر مقرمش على الفحم",
    "image": "/items/haw-meat.webp",
    "rating": 4.6,
    "calories": 420,
    "prepTime": "15 دقيقة",
    "defaultPrice": 40,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 40
      }
    ]
  },
  {
    "id": "sand-kebda",
    "name": "سندوتش كبدة",
    "category": "sandwiches",
    "description": "كبدة اسكندراني حارة بالفلفل الأخضر والطحينة في فينو طازج",
    "image": "/items/sand-kebda.webp",
    "rating": 4.8,
    "calories": 250,
    "prepTime": "5 دقائق",
    "defaultPrice": 15,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 15
      }
    ]
  },
  {
    "id": "sand-kofta",
    "name": "سندوتش كفتة جريل",
    "category": "sandwiches",
    "description": "كفتة بلدي مشوية على الجريل مع بقدونس وطحينة",
    "image": "/items/sand-kofta.webp",
    "rating": 4.7,
    "calories": 320,
    "prepTime": "10 دقائق",
    "defaultPrice": 30,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 30
      }
    ]
  },
  {
    "id": "sand-fries",
    "name": "سندوتش بطاطس",
    "category": "sandwiches",
    "description": "بطاطس صوابع ذهبية مقرمشة مع كاتشب ومايونيز",
    "image": "/items/sand-fries.webp",
    "rating": 4.6,
    "calories": 280,
    "prepTime": "5 دقائق",
    "defaultPrice": 15,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 15
      }
    ]
  },
  {
    "id": "sand-qonbola",
    "name": "قنبلة الأندلس",
    "category": "sandwiches",
    "description": "ساندوتش عملاق محشو شاورما ولحوم وجبن وبطاطس",
    "image": "/items/sand-shawarma.webp",
    "rating": 5,
    "calories": 750,
    "prepTime": "15 دقيقة",
    "defaultPrice": 90,
    "discountPercent": 10,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 90
      }
    ]
  },
  {
    "id": "sand-fries-cheese",
    "name": "سندوتش بطاطس جبنة",
    "category": "sandwiches",
    "description": "بطاطس محمرة غرقانة صوص جبنة سايحة",
    "image": "/items/sand-fries.webp",
    "rating": 4.7,
    "calories": 360,
    "prepTime": "5 دقائق",
    "defaultPrice": 30,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 30
      }
    ]
  },
  {
    "id": "sand-shawarma-chicken",
    "name": "سندوتش شاورما فراخ",
    "category": "sandwiches",
    "description": "شاورما فراخ متبلة مع تومية وخيار مخلل في عيش صاج",
    "image": "/items/sand-shawarma.webp",
    "rating": 4.9,
    "calories": 420,
    "prepTime": "10 دقائق",
    "defaultPrice": 50,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 50
      }
    ]
  },
  {
    "id": "sand-shawarma-meat",
    "name": "سندوتش شاورما لحمة",
    "category": "sandwiches",
    "description": "شاورما لحمة بلدي مع طحينة وبقدونس وبصل",
    "image": "/items/sand-shawarma.webp",
    "rating": 4.8,
    "calories": 450,
    "prepTime": "10 دقائق",
    "defaultPrice": 50,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 50
      }
    ]
  },
  {
    "id": "sand-hotdog",
    "name": "سندوتش هوت دوج",
    "category": "sandwiches",
    "description": "هوت دوج مشوي مع صوصات مستردة وكاتشب",
    "image": "/items/sand-kofta.webp",
    "rating": 4.5,
    "calories": 340,
    "prepTime": "10 دقائق",
    "defaultPrice": 40,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 40
      }
    ]
  },
  {
    "id": "sand-pane",
    "name": "سندوتش بانية",
    "category": "sandwiches",
    "description": "قطع دجاج بانية مقرمشة في فينو ساخن مع صوص",
    "image": "/items/crepe-pane.webp",
    "rating": 4.7,
    "calories": 330,
    "prepTime": "10 دقائق",
    "defaultPrice": 30,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 30
      }
    ]
  },
  {
    "id": "sand-sausage",
    "name": "سندوتش سجق",
    "category": "sandwiches",
    "description": "سجق شرقي متبل بالبصل والطماطم والفلفل",
    "image": "/items/sand-kofta.webp",
    "rating": 4.6,
    "calories": 350,
    "prepTime": "10 دقائق",
    "defaultPrice": 30,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 30
      }
    ]
  },
  {
    "id": "sand-strips",
    "name": "سندوتش استربس",
    "category": "sandwiches",
    "description": "أصابع دجاج استربس مقرمشة حارة مع صوص الأندلس",
    "image": "/items/crepe-strips.webp",
    "rating": 4.8,
    "calories": 410,
    "prepTime": "10 دقائق",
    "defaultPrice": 50,
    "sizes": [
      {
        "id": "standard",
        "name": "سندوتش",
        "price": 50
      }
    ]
  },
  {
    "id": "sand-packet-fries",
    "name": "باكت بطاطس",
    "category": "sandwiches",
    "description": "علبة بطاطس صوابع مقلية ذهبية ومقرمشة",
    "image": "/items/sand-fries.webp",
    "rating": 4.7,
    "calories": 300,
    "prepTime": "5 دقائق",
    "defaultPrice": 25,
    "sizes": [
      {
        "id": "standard",
        "name": "باكت",
        "price": 25
      }
    ]
  },
  {
    "id": "bech-plain",
    "name": "بشاميل سادة",
    "category": "bechamel",
    "description": "طاجن مكرونة بصوص البشاميل الكريمي الغني والجبن",
    "image": "/items/bechamel.webp",
    "rating": 4.6,
    "calories": 450,
    "prepTime": "15 دقيقة",
    "defaultPrice": 45,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 45
      }
    ]
  },
  {
    "id": "bech-chicken",
    "name": "بشاميل فراخ",
    "category": "bechamel",
    "description": "مكرونة بشاميل غنية بقطع الدجاج المتبلة والجبن",
    "image": "/items/bechamel.webp",
    "rating": 4.8,
    "calories": 550,
    "prepTime": "20 دقيقة",
    "defaultPrice": 65,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 65
      }
    ]
  },
  {
    "id": "bech-meat",
    "name": "بشاميل لحمة",
    "category": "bechamel",
    "description": "طاجن مكرونة بشاميل باللحم المفروم المعصج بالفرن",
    "image": "/items/bechamel.webp",
    "rating": 4.9,
    "calories": 580,
    "prepTime": "20 دقيقة",
    "defaultPrice": 65,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 65
      }
    ]
  },
  {
    "id": "bech-kebda",
    "name": "بشاميل كبدة",
    "category": "bechamel",
    "description": "طاجن بشاميل بالكبدة الإسكندراني المبهرة",
    "image": "/items/bechamel.webp",
    "rating": 4.7,
    "calories": 520,
    "prepTime": "20 دقيقة",
    "defaultPrice": 60,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 60
      }
    ]
  },
  {
    "id": "bech-mushroom",
    "name": "بشاميل مشروم",
    "category": "bechamel",
    "description": "طاجن بشاميل بالمشروم الطازج والكريمة",
    "image": "/items/bechamel.webp",
    "rating": 4.7,
    "calories": 480,
    "prepTime": "20 دقيقة",
    "defaultPrice": 60,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 60
      }
    ]
  },
  {
    "id": "bech-soseg",
    "name": "بشاميل سوسيس",
    "category": "bechamel",
    "description": "طاجن بشاميل بقطع السوسيس وصوص الجبن",
    "image": "/items/bechamel.webp",
    "rating": 4.6,
    "calories": 540,
    "prepTime": "20 دقيقة",
    "defaultPrice": 65,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 65
      }
    ]
  },
  {
    "id": "bech-sausage",
    "name": "بشاميل سجق",
    "category": "bechamel",
    "description": "طاجن بشاميل بالسجق البلدي المتبل والبهارات",
    "image": "/items/bechamel.webp",
    "rating": 4.8,
    "calories": 560,
    "prepTime": "20 دقيقة",
    "defaultPrice": 65,
    "sizes": [
      {
        "id": "single",
        "name": "طاجن",
        "price": 65
      }
    ]
  },
  {
    "id": "pasta-plain",
    "name": "باستا سادة",
    "category": "pasta",
    "description": "مكرونة بيني بالصلصة الحمراء الغنية والريحان",
    "image": "/items/pasta-sausage.webp",
    "rating": 4.6,
    "calories": 380,
    "prepTime": "15 دقيقة",
    "defaultPrice": 55,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 55
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 65
      }
    ]
  },
  {
    "id": "pasta-negresco",
    "name": "باستا نجرسكو",
    "category": "pasta",
    "description": "مكرونة نجرسكو بالفراخ والوايت صوص والموزاريلا",
    "image": "/items/pasta-negresco.webp",
    "rating": 4.9,
    "calories": 550,
    "prepTime": "20 دقيقة",
    "defaultPrice": 70,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 70
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 90
      }
    ]
  },
  {
    "id": "pasta-meat",
    "name": "باستا لحمة",
    "category": "pasta",
    "description": "مكرونة باللحم المفروم والصلصة المتبلة بالجبن",
    "image": "/items/pasta-sausage.webp",
    "rating": 4.8,
    "calories": 520,
    "prepTime": "20 دقيقة",
    "defaultPrice": 70,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 70
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 90
      }
    ]
  },
  {
    "id": "pasta-kebda",
    "name": "باستا كبدة",
    "category": "pasta",
    "description": "مكرونة بقطع الكبدة الإسكندراني الحارة",
    "image": "/items/pasta-sausage.webp",
    "rating": 4.7,
    "calories": 470,
    "prepTime": "15 دقيقة",
    "defaultPrice": 60,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 60
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 75
      }
    ]
  },
  {
    "id": "pasta-mushroom",
    "name": "باستا مشروم",
    "category": "pasta",
    "description": "مكرونة بالمشروم وصوص الكريمة اللذيذ",
    "image": "/items/pasta-negresco.webp",
    "rating": 4.7,
    "calories": 430,
    "prepTime": "15 دقيقة",
    "defaultPrice": 55,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 55
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 75
      }
    ]
  },
  {
    "id": "pasta-soseg",
    "name": "باستا سوسيس",
    "category": "pasta",
    "description": "مكرونة بالسوسيس والصلصة الخاصة والجبن",
    "image": "/items/pasta-sausage.webp",
    "rating": 4.6,
    "calories": 490,
    "prepTime": "15 دقيقة",
    "defaultPrice": 70,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 70
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 85
      }
    ]
  },
  {
    "id": "pasta-sausage",
    "name": "باستا سجق",
    "category": "pasta",
    "description": "مكرونة بالسجق البلدي والصلصة والفلفل الحار",
    "image": "/items/pasta-sausage.webp",
    "rating": 4.8,
    "calories": 510,
    "prepTime": "15 دقيقة",
    "defaultPrice": 70,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 70
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 85
      }
    ]
  },
  {
    "id": "crepe-shawarma-chicken",
    "name": "كريب شاورما فراخ",
    "category": "crepe",
    "description": "كريب محشو شاورما فراخ متبلة وموتزاريلا وبطاطس",
    "image": "/items/crepe-strips.webp",
    "rating": 4.9,
    "calories": 480,
    "prepTime": "10 دقائق",
    "defaultPrice": 95,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 95
      }
    ]
  },
  {
    "id": "crepe-shawarma-meat",
    "name": "كريب شاورما لحمة",
    "category": "crepe",
    "description": "كريب محشو شاورما لحم وموتزاريلا وصوصات",
    "image": "/items/crepe-strips.webp",
    "rating": 4.8,
    "calories": 510,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-pane",
    "name": "كريب بانية",
    "category": "crepe",
    "description": "كريب دجاج بانية مقرمش مع بطاطس وموتزاريلا",
    "image": "/items/crepe-pane.webp",
    "rating": 4.8,
    "calories": 450,
    "prepTime": "10 دقائق",
    "defaultPrice": 90,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 90
      }
    ]
  },
  {
    "id": "crepe-crispy",
    "name": "كريب كريسبي",
    "category": "crepe",
    "description": "كريب دجاج كريسبي مقرمش مع جبنة وصوص كاتشب ومايونيز",
    "image": "/items/crepe-pane.webp",
    "rating": 4.8,
    "calories": 490,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-strips",
    "name": "كريب استربس",
    "category": "crepe",
    "description": "كريب أصابع استربس دجاج حارة مع جبن موتزاريلا",
    "image": "/items/crepe-strips.webp",
    "rating": 4.9,
    "calories": 500,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-kofta",
    "name": "كريب كفتة",
    "category": "crepe",
    "description": "كريب محشو كفتة مشوية وموتزاريلا وخضار",
    "image": "/items/crepe-strips.webp",
    "rating": 4.6,
    "calories": 430,
    "prepTime": "10 دقائق",
    "defaultPrice": 70,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 70
      }
    ]
  },
  {
    "id": "crepe-sausage",
    "name": "كريب سجق",
    "category": "crepe",
    "description": "كريب سجق بلدي بالبهارات والموزاريلا",
    "image": "/items/crepe-strips.webp",
    "rating": 4.7,
    "calories": 450,
    "prepTime": "10 دقائق",
    "defaultPrice": 80,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 80
      }
    ]
  },
  {
    "id": "crepe-soseg",
    "name": "كريب سوسيس",
    "category": "crepe",
    "description": "كريب سوسيس وموتزاريلا وبطاطس",
    "image": "/items/crepe-strips.webp",
    "rating": 4.6,
    "calories": 440,
    "prepTime": "10 دقائق",
    "defaultPrice": 80,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 80
      }
    ]
  },
  {
    "id": "crepe-kebda",
    "name": "كريب كبدة",
    "category": "crepe",
    "description": "كريب كبدة اسكندراني حارة مع موتزاريلا",
    "image": "/items/crepe-strips.webp",
    "rating": 4.7,
    "calories": 410,
    "prepTime": "10 دقائق",
    "defaultPrice": 65,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 65
      }
    ]
  },
  {
    "id": "crepe-tuna",
    "name": "كريب تونة",
    "category": "crepe",
    "description": "كريب تونة مع زيتون وفلفل وموتزاريلا",
    "image": "/items/crepe-pane.webp",
    "rating": 4.7,
    "calories": 420,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-fries",
    "name": "كريب بطاطس",
    "category": "crepe",
    "description": "كريب بطاطس مقلية ذهبية مع موتزاريلا وصوص",
    "image": "/items/crepe-pane.webp",
    "rating": 4.5,
    "calories": 390,
    "prepTime": "10 دقائق",
    "defaultPrice": 60,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 60
      }
    ]
  },
  {
    "id": "crepe-fries-pane",
    "name": "كريب بطاطس وبانية",
    "category": "crepe",
    "description": "كريب مكس بطاطس وبانية مقرمش وموتزاريلا",
    "image": "/items/crepe-pane.webp",
    "rating": 4.8,
    "calories": 510,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-kofta-pane",
    "name": "كريب كفتة وبانية",
    "category": "crepe",
    "description": "كريب مشكل كفتة ودجاج بانية وجبن",
    "image": "/items/crepe-strips.webp",
    "rating": 4.8,
    "calories": 520,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-soseg-pane",
    "name": "كريب سوسيس وبانية",
    "category": "crepe",
    "description": "كريب مشكل سوسيس ودجاج بانية وموتزاريلا",
    "image": "/items/crepe-strips.webp",
    "rating": 4.8,
    "calories": 530,
    "prepTime": "10 دقائق",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 100
      }
    ]
  },
  {
    "id": "crepe-mix-cheese",
    "name": "كريب ميكس جبن",
    "category": "crepe",
    "description": "كريب غني بميكس جبن موتزاريلا وشيدر ورومي",
    "image": "/items/crepe-pane.webp",
    "rating": 4.9,
    "calories": 540,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "crepe-mix-cheese-pane",
    "name": "كريب ميكس جبن وبانية",
    "category": "crepe",
    "description": "كريب ميكس جبن ودجاج بانية كرسبي وموتزاريلا",
    "image": "/items/crepe-pane.webp",
    "rating": 4.9,
    "calories": 570,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "crepe-mix-cheese-shawarma-chicken",
    "name": "كريب ميكس جبن وشاورما فراخ",
    "category": "crepe",
    "description": "كريب ميكس جبن مع شاورما دجاج متبلة وبطاطس",
    "image": "/items/crepe-strips.webp",
    "rating": 5,
    "calories": 590,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "crepe-mix-cheese-mix-chicken",
    "name": "كريب ميكس جبن وميكس فراخ",
    "category": "crepe",
    "description": "كريب غارق أجبان مع تشكيلة فراخ كاملة (شاورما، بانية، استربس)",
    "image": "/items/crepe-strips.webp",
    "rating": 5,
    "calories": 640,
    "prepTime": "10 دقائق",
    "defaultPrice": 140,
    "discountPercent": 10,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 140
      }
    ]
  },
  {
    "id": "crepe-mix-chicken",
    "name": "كريب ميكس فراخ",
    "category": "crepe",
    "description": "كريب شاورما وبانية واستربس فراخ وموتزاريلا",
    "image": "/items/crepe-strips.webp",
    "rating": 4.9,
    "calories": 580,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "crepe-mix-meat",
    "name": "كريب ميكس لحوم",
    "category": "crepe",
    "description": "كريب لحمة مفرومة وسجق وكفتة وموتزاريلا وبطاطس",
    "image": "/items/crepe-strips.webp",
    "rating": 4.9,
    "calories": 600,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "crepe-sw-chocolate",
    "name": "كريب شوكولاتة",
    "category": "crepe-sw",
    "description": "كريب محشو نوتيلا وصوص شوكولاتة غني",
    "image": "/items/crepe-sweet.webp",
    "rating": 4.9,
    "calories": 420,
    "prepTime": "10 دقائق",
    "defaultPrice": 80,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 80
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 90
      }
    ]
  },
  {
    "id": "crepe-sw-chocolate-banana",
    "name": "كريب شوكولاتة وموز",
    "category": "crepe-sw",
    "description": "كريب شوكولاتة نوتيلا مع قطع الموز الطازج",
    "image": "/items/crepe-sweet.webp",
    "rating": 5,
    "calories": 460,
    "prepTime": "10 دقائق",
    "defaultPrice": 85,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 85
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 95
      }
    ]
  },
  {
    "id": "crepe-sw-cream-banana",
    "name": "كريب قشطة وموز",
    "category": "crepe-sw",
    "description": "كريب قشطة بلدي مع شرائح الموز والعسل الطبيعي",
    "image": "/items/crepe-sweet.webp",
    "rating": 4.8,
    "calories": 440,
    "prepTime": "10 دقائق",
    "defaultPrice": 85,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 85
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 95
      }
    ]
  },
  {
    "id": "kono-shawarma-chicken",
    "name": "شاورما فراخ كونو",
    "category": "crepe-kono",
    "description": "كونو كريب ملفوف محشو شاورما فراخ وجبن وبطاطس",
    "image": "/items/crepe-kono.webp",
    "rating": 4.8,
    "calories": 490,
    "prepTime": "10 دقائق",
    "defaultPrice": 105,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 105
      }
    ]
  },
  {
    "id": "kono-shawarma-meat",
    "name": "شاورما لحمة كونو",
    "category": "crepe-kono",
    "description": "كونو كريب ملفوف محشو شاورما لحم وموتزاريلا",
    "image": "/items/crepe-kono.webp",
    "rating": 4.8,
    "calories": 520,
    "prepTime": "10 دقائق",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 120
      }
    ]
  },
  {
    "id": "kono-mix",
    "name": "ميكس كونو",
    "category": "crepe-kono",
    "description": "كونو كريب مشكل لحوم ودجاج غرقان صوصات وموتزاريلا",
    "image": "/items/crepe-kono.webp",
    "rating": 5,
    "calories": 580,
    "prepTime": "10 دقائق",
    "defaultPrice": 130,
    "sizes": [
      {
        "id": "standard",
        "name": "عادي",
        "price": 130
      }
    ]
  },
  {
    "id": "pie-sav-chicken",
    "name": "فطيرة فراخ حادق",
    "category": "pie-sav",
    "description": "فطيرة حادقة مورقة محشوة قطع دجاج وموتزاريلا وزيتون وفلفل",
    "image": "/items/or-chicken.webp",
    "rating": 4.8,
    "calories": 490,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "pie-sav-meat",
    "name": "فطيرة لحمة حادق",
    "category": "pie-sav",
    "description": "فطيرة حادقة مورقة محشوة لحم مفروم وخضار وموزاريلا",
    "image": "/items/or-meat.webp",
    "rating": 4.8,
    "calories": 520,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "pie-sav-mushroom",
    "name": "فطيرة مشروم حادق",
    "category": "pie-sav",
    "description": "فطيرة حادقة بالمشروم الطازج والموزاريلا والزيتون",
    "image": "/items/pie-mix-cheese.webp",
    "rating": 4.7,
    "calories": 430,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "pie-sav-soseg",
    "name": "فطيرة سوسيس حادق",
    "category": "pie-sav",
    "description": "فطيرة حادقة بالسوسيس والجبنة المورقة والخضروات",
    "image": "/items/pizza-sausage.webp",
    "rating": 4.6,
    "calories": 480,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "pie-sav-sausage",
    "name": "فطيرة سجق حادق",
    "category": "pie-sav",
    "description": "فطيرة حادقة بالسجق البلدي المتبل والجبن والموتزاريلا",
    "image": "/items/pizza-sausage.webp",
    "rating": 4.8,
    "calories": 510,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "pie-sav-tuna",
    "name": "فطيرة تونة حادق",
    "category": "pie-sav",
    "description": "فطيرة حادقة بالتونة والزيتون والفلفل والموتزاريلا",
    "image": "/items/or-meat.webp",
    "rating": 4.7,
    "calories": 440,
    "prepTime": "20 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 110
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 140
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 190
      }
    ]
  },
  {
    "id": "pie-sav-mix-meat",
    "name": "فطيرة مشكل لحوم",
    "category": "pie-sav",
    "description": "فطيرة حادقة مشكل لحم وسجق وسوسيس وموتزاريلا",
    "image": "/items/or-meat.webp",
    "rating": 4.9,
    "calories": 560,
    "prepTime": "20 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 200
      }
    ]
  },
  {
    "id": "pie-sav-mix-cheese",
    "name": "فطيرة مشكل جبن",
    "category": "pie-sav",
    "description": "فطيرة حادقة مشكل جبن رومي وشيدر وموتزاريلا وكيري",
    "image": "/items/pie-mix-cheese.webp",
    "rating": 4.9,
    "calories": 580,
    "prepTime": "20 دقيقة",
    "defaultPrice": 120,
    "sizes": [
      {
        "id": "small",
        "name": "صغير",
        "price": 120
      },
      {
        "id": "medium",
        "name": "وسط",
        "price": 150
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 220
      }
    ]
  },
  {
    "id": "pie-sav-meshaltet",
    "name": "فطير مشلتت فلاحي",
    "category": "pie-sav",
    "description": "فطير مشلتت فلاحي مورق بالسمن البلدي الفاخر",
    "image": "/items/pie-mix-cheese.webp",
    "rating": 5,
    "calories": 600,
    "prepTime": "25 دقيقة",
    "defaultPrice": 110,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 110
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 170
      }
    ]
  },
  {
    "id": "pie-sw-sugar",
    "name": "فطيرة سكر ولبن",
    "category": "pie-sw",
    "description": "فطيرة حلوة مورقة بالسكر البودرة واللبن الدافئ",
    "image": "/items/pie-sugar.webp",
    "rating": 4.9,
    "calories": 380,
    "prepTime": "15 دقيقة",
    "defaultPrice": 60,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 60
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 90
      }
    ]
  },
  {
    "id": "pie-sw-custard",
    "name": "فطيرة كاستر",
    "category": "pie-sw",
    "description": "فطيرة محشوة كاستر كريمي لذيذ وسكر بودرة",
    "image": "/items/pie-sugar.webp",
    "rating": 4.8,
    "calories": 410,
    "prepTime": "15 دقيقة",
    "defaultPrice": 70,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 70
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 100
      }
    ]
  },
  {
    "id": "pie-sw-custard-banana",
    "name": "فطيرة كاستر - موز",
    "category": "pie-sw",
    "description": "فطيرة كاستر مع شرائح الموز الطازج واللبن",
    "image": "/items/pie-sugar.webp",
    "rating": 4.9,
    "calories": 430,
    "prepTime": "15 دقيقة",
    "defaultPrice": 80,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 80
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 120
      }
    ]
  },
  {
    "id": "pie-sw-custard-nuts",
    "name": "فطيرة كاستر مكسرات",
    "category": "pie-sw",
    "description": "فطيرة كاستر غنية بالمكسرات المحمصة والزبيب وجوز الهند",
    "image": "/items/pie-sugar.webp",
    "rating": 4.9,
    "calories": 470,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 100
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 130
      }
    ]
  },
  {
    "id": "pie-sw-chocolate",
    "name": "فطيرة شوكولاتة",
    "category": "pie-sw",
    "description": "فطيرة مورقة غارقة في شوكولاتة النوتيلا اللذيذة",
    "image": "/items/pie-chocolate.webp",
    "rating": 5,
    "calories": 510,
    "prepTime": "15 دقيقة",
    "defaultPrice": 90,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 90
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 170
      }
    ]
  },
  {
    "id": "pie-sw-chocolate-banana",
    "name": "فطيرة شوكولاتة موز",
    "category": "pie-sw",
    "description": "فطيرة شوكولاتة نوتيلا مع شرائح الموز الطازج",
    "image": "/items/pie-chocolate.webp",
    "rating": 5,
    "calories": 540,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 100
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 200
      }
    ]
  },
  {
    "id": "pie-sw-basbousa",
    "name": "فطيرة بسبوسة",
    "category": "pie-sw",
    "description": "فطيرة محشوة بسبوسة مرملة بالسمن البلدي وقشطة",
    "image": "/items/pie-chocolate.webp",
    "rating": 4.8,
    "calories": 520,
    "prepTime": "15 دقيقة",
    "defaultPrice": 90,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 90
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 120
      }
    ]
  },
  {
    "id": "pie-sw-konafa",
    "name": "فطيرة كنافة",
    "category": "pie-sw",
    "description": "فطيرة محشوة كنافة ذهبية مقرمشة وشربات خفيف",
    "image": "/items/pie-chocolate.webp",
    "rating": 4.8,
    "calories": 530,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 100
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 120
      }
    ]
  },
  {
    "id": "pie-sw-cream",
    "name": "فطيرة قشطة",
    "category": "pie-sw",
    "description": "فطيرة محشوة قشطة بلدي طبيعية وعسل نحل نقي",
    "image": "/items/pie-sugar.webp",
    "rating": 4.9,
    "calories": 480,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 100
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 120
      }
    ]
  },
  {
    "id": "pie-sw-apple",
    "name": "فطيرة تفاح",
    "category": "pie-sw",
    "description": "فطيرة تفاح مكرمل بالقرفة والسكر البني الدافئ",
    "image": "/items/pie-sugar.webp",
    "rating": 4.7,
    "calories": 420,
    "prepTime": "15 دقيقة",
    "defaultPrice": 100,
    "sizes": [
      {
        "id": "medium",
        "name": "وسط",
        "price": 100
      },
      {
        "id": "large",
        "name": "كبير",
        "price": 120
      }
    ]
  }
];
