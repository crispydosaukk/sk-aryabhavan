const fs = require('fs');
const o = JSON.parse(fs.readFileSync('extracted_pages/outdoor-catering.json', 'utf8'));

console.log('Array.isArray(o.elementorData):', Array.isArray(o.elementorData));
let galleryWidget = null;
function check(el) {
  if (el.widgetType === 'gallery') {
    galleryWidget = el;
  }
  if (el.elements) el.elements.forEach(check);
}
o.elementorData.forEach(check);

if (galleryWidget) {
  console.log('Gallery found!');
  console.log(galleryWidget.settings.gallery);
} else {
  console.log('Gallery widget not found in tree');
}
