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
      if(file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = [...walk('src'), 'index.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    // Replace all inline React font-families
    newContent = newContent.replace(/fontFamily:\s*['"][^'"]+['"]/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
    // Also handle nested quotes like '"Playfair Display", Georgia, serif'
    newContent = newContent.replace(/fontFamily:\s*['"]?["'][^"']+["']?,\s*[^'"]+['"]/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
    newContent = newContent.replace(/fontFamily:\s*'[^']+'/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
  } else if (file.endsWith('.css')) {
    // Replace CSS font-families
    newContent = newContent.replace(/font-family:\s*[^;]+;/g, "font-family: 'Montserrat', system-ui, sans-serif;");
  } else if (file.endsWith('.html')) {
    // Just replace Playfair in the URL if present so it doesn't load unnecessarily, or keep as is.
    newContent = newContent.replace(/&family=Playfair\+Display[^&"']+/g, "");
  }

  if(newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
