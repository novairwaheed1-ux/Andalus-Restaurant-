const fs = require('fs');
let data = fs.readFileSync('src/data/menuData.ts', 'utf8');

data = data.replace(/image:\s*'[^']+'/g, (match, offset, string) => {
    const preceding = string.substring(Math.max(0, offset - 120), offset);
    if (preceding.includes("'pizza-it'") || preceding.includes("'pizza-or'")) return `image: '/pizza.jpg'`;
    if (preceding.includes("'crepe'")) return `image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80'`;
    if (preceding.includes("'pie-sav'") || preceding.includes("'pie-sw'")) return `image: '/pie.jpg'`;
    if (preceding.includes("'pasta'")) return `image: '/pasta.jpg'`;
    if (preceding.includes("'hawawshi'")) return `image: '/hawawshi.jpg'`;
    if (preceding.includes("'sarokh'")) return `image: '/sarokh.jpg'`;
    return `image: '/pizza.jpg'`;
});

fs.writeFileSync('src/data/menuData.ts', data);
