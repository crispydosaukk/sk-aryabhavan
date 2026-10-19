const fs = require('fs');
const html = fs.readFileSync('live_central_london.html', 'utf8');
const allStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
['a940439', 'e7373a1'].forEach(id => {
  const reg = new RegExp(`\\.elementor-element-${id}[^{]*\\{([^}]*)\\}`, 'g');
  let m;
  console.log(`=== CSS for ${id} ===`);
  while ((m = reg.exec(allStyles)) !== null) {
    console.log(m[0]);
  }
});
