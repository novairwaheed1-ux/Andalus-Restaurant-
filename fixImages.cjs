const fs = require('fs');
let data = fs.readFileSync('src/data/menuData.ts', 'utf8');

const sarokhImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Shawarma_wrap.jpg/800px-Shawarma_wrap.jpg';
const crepeImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cr%C3%AApe_au_chocolat.jpg/800px-Cr%C3%AApe_au_chocolat.jpg';

data = data.replace(/image:\s*'[^']+'/g, (match, offset, string) => {
    const preceding = string.substring(Math.max(0, offset - 120), offset);
    if (preceding.includes("'sarokh'")) return `image: '${sarokhImg}'`;
    if (preceding.includes("'crepe'")) return `image: '${crepeImg}'`;
    return match; // Keep others unchanged
});

fs.writeFileSync('src/data/menuData.ts', data);
