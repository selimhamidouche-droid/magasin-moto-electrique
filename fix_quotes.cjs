const fs = require('fs');
const files = ['src/pages/MainPage.tsx', 'src/sections/Footer.tsx', 'src/sections/Navigation.tsx'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace incorrectly nested single quotes
    content = content.replace(/''Playfair Display', Georgia, serif'/g, "'\"Playfair Display\", Georgia, serif'");
    content = content.replace(/''Montserrat', system-ui, sans-serif'/g, "'\"Montserrat\", system-ui, sans-serif'");
    content = content.replace(/''Montserrat', sans-serif'/g, "'\"Montserrat\", sans-serif'");

    // Just in case:
    content = content.replace(/fontFamily: ''Playfair Display', Georgia, serif',/g, "fontFamily: '\"Playfair Display\", Georgia, serif',");
    content = content.replace(/fontFamily: ''Montserrat', system-ui, sans-serif',/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif',");
    
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Fixed');
