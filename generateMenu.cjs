const fs = require('fs');

const categories = [
  { id: 'all', name: 'الكل', icon: 'grid' },
  { id: 'pizza-it', name: 'بيتزا إيطالي', icon: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=160&q=80' },
  { id: 'pizza-or', name: 'بيتزا شرقي', icon: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=160&q=80' },
  { id: 'crepes', name: 'كريبات', icon: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=160&q=80' },
  { id: 'sarokh', name: 'صاروخ', icon: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=160&q=80' },
  { id: 'hawawshi', name: 'حواوشي', icon: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&q=80' },
  { id: 'sandwiches', name: 'سندوتشات', icon: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=160&q=80' },
  { id: 'pasta', name: 'باستا', icon: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=160&q=80' },
  { id: 'bechamel', name: 'بشاميل', icon: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=160&q=80' },
  { id: 'pie-savory', name: 'فطائر حادق', icon: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&q=80' },
  { id: 'pie-sweet', name: 'فطائر حلو', icon: 'https://images.unsplash.com/photo-1588880313063-4ceea2008fb9?w=160&q=80' },
];

const pizzaIt = [
  ['لحمة', 110, 140, 190],
  ['فراخ', 110, 140, 190],
  ['تشيكن رانش', 120, 150, 200],
  ['تشيكن باربكيو', 120, 150, 200],
  ['سجق', 110, 140, 190],
  ['مشروم', 110, 140, 190],
  ['هوت دوج', 110, 140, 190],
  ['تونا', 110, 140, 190],
  ['ميكس جبن', 120, 150, 220],
  ['سوبر سوبريم', 120, 150, 220],
  ['الأندلس', 120, 150, 220],
  ['مارجريتا', 95, 120, 190],
];

const pizzaOr = [
  ['لحمة', 110, 140, 190],
  ['فراخ', 110, 140, 190],
  ['مشروم', 110, 140, 190],
  ['هوت دوج', 110, 140, 190],
  ['تونا', 110, 140, 190],
  ['ميكس جبن', 120, 150, 220],
  ['الأندلس', 120, 150, 220],
];

const sarokh = [
  ['فراخ', 100], ['ميكس فراخ', 140], ['لحمة', 100], ['ميكس لحوم', 140],
  ['ميكس جبن', 120], ['سجق', 90], ['كفتة', 90], ['برجر', 90], ['إستربس', 120],
];

const hawawshi = [
  ['لحمة', 110], ['فراخ', 110], ['ميكس جبن', 130], ['سجق', 110],
  ['الأندلس', 130], ['حواوشي بلدي', 40],
];

const sandwiches = [
  ['كبدة', 15], ['كفتة جريل', 30], ['برجر', 30], ['برجر بيض', 40],
  ['برجر جبنه', 40], ['برجر بيض جبنة', 55], ['بطاطس', 15],
  ['قنبلة الأندلس', 90], ['بطاطس جبنة', 30], ['شاورما فراخ', 50],
  ['شاورما لحمة', 50], ['هوت دوج', 40], ['بانية', 30], ['سجق', 30],
  ['استربس', 50], ['باكت بطاطس', 25]
];

const bechamel = [
  ['سادة', 45], ['فراخ', 65], ['لحمة', 65], ['كبدة', 60],
  ['مشروم', 60], ['سوسيس', 65], ['سجق', 65]
];

const pasta = [
  ['سادة', 55, 65], ['نجرسكو', 70, 90], ['لحمة', 70, 90],
  ['كبدة', 60, 75], ['مشروم', 55, 75], ['سوسيس', 70, 85], ['سجق', 70, 85]
];

const crepes = [
  ['شاورما فراخ', 95], ['شاورما لحمة', 100], ['بانية', 90],
  ['كريسبي', 100], ['استربس', 100], ['كفتة', 70], ['سجق', 80],
  ['سوسيس', 80], ['برجر', 70], ['كبدة', 65], ['تونة', 100],
  ['بطاطس', 60], ['بطاطس وبانية', 100], ['كفتة وبانية', 100],
  ['سوسيس وبانية', 100], ['ميكس جبن', 120], ['ميكس جبن وبانية', 120],
  ['ميكس جبن وشاورما فراخ', 120], ['ميكس جبن وميكس فراخ', 140],
  ['ميكس فراخ', 120], ['ميكس لحوم', 120]
];

const crepesSweet = [
  ['شوكولاتة', 80, 90], ['شوكولاتة وموز', 85, 95], ['قشطة وموز', 85, 95]
];

const crepeKono = [
  ['شاورما فراخ كونو', 105], ['شاورما لحمة كونو', 120], ['ميكس كونو', 130]
];

const pieSavory = [
  ['فراخ', 110, 140, 190], ['لحمة', 110, 140, 190], ['مشروم', 110, 140, 190],
  ['سوسيس', 110, 140, 190], ['سجق', 110, 140, 190], ['تونة', 110, 140, 190],
  ['مشكل لحوم', 120, 150, 200], ['مشكل جبن', 120, 150, 220], ['مشلتت', 110, 170]
];

const pieSweet = [
  ['سكر ولبن', 60, 90], ['كاستر', 70, 100], ['كاستر - موز', 80, 120],
  ['كاستر مكسرات', 100, 130], ['شوكولاتة', 90, 170], ['شوكولاتة موز', 100, 200],
  ['بسبوسة', 90, 120], ['كنافة', 100, 120], ['قشطة', 100, 120], ['تفاح', 100, 120]
];

let menuItems = [];

// Base pizza image array for variety in filling looks but uniform shape
const pizzaImages = [
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
  'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80',
  'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80'
];

function generateId(prefix, name) {
  return `${prefix}-${name.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${Math.random().toString(36).substr(2, 4)}`;
}

// Helper to create items
function createPizza(category, data, prefix) {
  data.forEach((p, idx) => {
    menuItems.push({
      id: generateId(prefix, p[0]),
      name: `بيتزا ${p[0]}`,
      category: category,
      description: 'أشهى المكونات مع جبنة الموزاريلا',
      image: pizzaImages[idx % pizzaImages.length],
      rating: 4.8,
      calories: 320,
      prepTime: '15 دقيقة',
      defaultPrice: p[1],
      sizes: [
        { id: 'small', name: 'صغير', price: p[1] },
        { id: 'medium', name: 'وسط', price: p[2] },
        { id: 'large', name: 'كبير', price: p[3] }
      ]
    });
  });
}

createPizza('pizza-it', pizzaIt, 'pit');
createPizza('pizza-or', pizzaOr, 'por');

// Sarokh
sarokh.forEach(p => {
  menuItems.push({
    id: generateId('sarokh', p[0]),
    name: `صاروخ ${p[0]}`,
    category: 'sarokh',
    description: 'صاروخ الأندلس المميز',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
    rating: 4.7,
    calories: 400,
    prepTime: '10 دقائق',
    defaultPrice: p[1],
    sizes: [{ id: 'single', name: 'عادي', price: p[1] }]
  });
});

// Hawawshi
hawawshi.forEach(p => {
  menuItems.push({
    id: generateId('hawawshi', p[0]),
    name: `حواوشي ${p[0]}`,
    category: 'hawawshi',
    description: 'حواوشي الأندلس المقرمش',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    rating: 4.6,
    calories: 450,
    prepTime: '15 دقيقة',
    defaultPrice: p[1],
    sizes: [{ id: 'single', name: 'عادي', price: p[1] }]
  });
});

// Sandwiches
sandwiches.forEach(p => {
  menuItems.push({
    id: generateId('sand', p[0]),
    name: `سندوتش ${p[0]}`,
    category: 'sandwiches',
    description: 'سندوتش طازج ولذيذ',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
    rating: 4.5,
    calories: 300,
    prepTime: '10 دقائق',
    defaultPrice: p[1],
    sizes: [{ id: 'single', name: 'عادي', price: p[1] }]
  });
});

// Bechamel
bechamel.forEach(p => {
  menuItems.push({
    id: generateId('bech', p[0]),
    name: `بشاميل ${p[0]}`,
    category: 'bechamel',
    description: 'مكرونة بشاميل غنية بالكريمة',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80',
    rating: 4.8,
    calories: 500,
    prepTime: '20 دقيقة',
    defaultPrice: p[1],
    sizes: [{ id: 'single', name: 'طاجن', price: p[1] }]
  });
});

// Pasta
pasta.forEach(p => {
  menuItems.push({
    id: generateId('pasta', p[0]),
    name: `باستا ${p[0]}`,
    category: 'pasta',
    description: 'مكرونة لذيذة بصوص الأندلس الخاص',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=400&q=80',
    rating: 4.7,
    calories: 350,
    prepTime: '15 دقيقة',
    defaultPrice: p[1],
    sizes: p.length === 3 ? [
      { id: 'medium', name: 'وسط', price: p[1] },
      { id: 'large', name: 'كبير', price: p[2] }
    ] : [
      { id: 'single', name: 'طبق', price: p[1] }
    ]
  });
});

// Crepes
crepes.forEach(p => {
  menuItems.push({
    id: generateId('crepe', p[0]),
    name: `كريب ${p[0]}`,
    category: 'crepes',
    description: 'كريب محشو بأشهى المكونات',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80',
    rating: 4.8,
    calories: 450,
    prepTime: '10 دقائق',
    defaultPrice: p[1],
    sizes: [{ id: 'single', name: 'عادي', price: p[1] }]
  });
});

crepeKono.forEach(p => {
  menuItems.push({
    id: generateId('crepekono', p[0]),
    name: `كريب ${p[0]}`,
    category: 'crepes',
    description: 'كريب كونو',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80',
    rating: 4.7,
    calories: 400,
    prepTime: '10 دقائق',
    defaultPrice: p[1],
    sizes: [{ id: 'single', name: 'عادي', price: p[1] }]
  });
});

crepesSweet.forEach(p => {
  menuItems.push({
    id: generateId('crepesw', p[0]),
    name: `كريب حلو ${p[0]}`,
    category: 'crepes',
    description: 'كريب حلو ولذيذ',
    image: 'https://images.unsplash.com/photo-1588880313063-4ceea2008fb9?w=400&q=80',
    rating: 4.9,
    calories: 300,
    prepTime: '10 دقائق',
    defaultPrice: p[1],
    sizes: p.length === 3 ? [
      { id: 'small', name: 'صغير', price: p[1] },
      { id: 'large', name: 'كبير', price: p[2] }
    ] : [
      { id: 'single', name: 'عادي', price: p[1] }
    ]
  });
});

// Pies Savory
pieSavory.forEach(p => {
  menuItems.push({
    id: generateId('piesav', p[0]),
    name: `فطيرة ${p[0]}`,
    category: 'pie-savory',
    description: 'فطيرة حادقة مورقة',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    rating: 4.7,
    calories: 450,
    prepTime: '20 دقيقة',
    defaultPrice: p[1],
    sizes: p.length === 4 ? [
      { id: 'small', name: 'صغير', price: p[1] },
      { id: 'medium', name: 'وسط', price: p[2] },
      { id: 'large', name: 'كبير', price: p[3] }
    ] : p.length === 3 ? [
      { id: 'medium', name: 'وسط', price: p[1] },
      { id: 'large', name: 'كبير', price: p[2] }
    ] : [
      { id: 'single', name: 'عادي', price: p[1] }
    ]
  });
});

// Pies Sweet
pieSweet.forEach(p => {
  menuItems.push({
    id: generateId('piesw', p[0]),
    name: `فطيرة ${p[0]}`,
    category: 'pie-sweet',
    description: 'فطيرة حلوة مورقة',
    image: 'https://images.unsplash.com/photo-1588880313063-4ceea2008fb9?w=400&q=80',
    rating: 4.8,
    calories: 400,
    prepTime: '15 دقيقة',
    defaultPrice: p[1],
    sizes: p.length === 3 ? [
      { id: 'medium', name: 'وسط', price: p[1] },
      { id: 'large', name: 'كبير', price: p[2] }
    ] : [
      { id: 'single', name: 'عادي', price: p[1] }
    ]
  });
});

const fileContent = `
export const CATEGORIES = ${JSON.stringify(categories, null, 2)};
export const MENU_ITEMS = ${JSON.stringify(menuItems, null, 2)};
`;

fs.writeFileSync('src/data/menuData.ts', fileContent);
console.log('Generated menu data');
