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
  
  // To make everything uniform: 
  // We want to make all fontWeights for big text to be 800.
  // Actually, replacing specific instances is safer.
  
  // Replace fontWeight 400 or 300 with 800 for any block with font-family
  newContent = newContent.replace(/(fontFamily:\s*'"Montserrat",\s*system-ui,\s*sans-serif',\s*fontSize:\s*'[^']+',\s*fontWeight:\s*)400/g, '$1800');
  newContent = newContent.replace(/(fontFamily:\s*'"Montserrat",\s*system-ui,\s*sans-serif',\s*fontSize:\s*'[^']+',\s*fontWeight:\s*)300/g, '$1800');
  
  if(newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
