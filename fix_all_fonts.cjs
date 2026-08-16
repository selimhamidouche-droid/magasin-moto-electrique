const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  newContent = newContent.replace(/fontFamily:\s*'Inter,\s*system-ui,\s*sans-serif'/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
  newContent = newContent.replace(/fontFamily:\s*'Inter,\s*sans-serif'/g, "fontFamily: '\"Montserrat\", sans-serif'");
  newContent = newContent.replace(/fontFamily:\s*'"Cormorant Garamond",\s*Georgia,\s*serif'/g, "fontFamily: '\"Playfair Display\", Georgia, serif'");

  if(newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
