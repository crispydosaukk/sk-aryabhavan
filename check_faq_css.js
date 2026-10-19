const fs = require('fs');
const html = fs.readFileSync('outdoor_extracted.html', 'utf8');
const pos = html.indexOf('e-n-accordion');
console.log('e-n-accordion found at:', pos);
console.log(html.substring(Math.max(0, pos - 500), pos + 300));

const allStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
console.log('Total style tags:', allStyles.length);
allStyles.forEach((s, idx) => {
  if (s[1].includes('04ca26f')) {
    console.log(`Style tag ${idx} has 04ca26f:`);
    s[1].split('}').filter(r => r.includes('04ca26f')).forEach(r => console.log(' ', r.trim() + '}'));
  }
});
