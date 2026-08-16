const fs = require('fs');
const files = ['src/pages/MainPage.tsx', 'src/sections/Footer.tsx', 'src/sections/Navigation.tsx'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace fonts
    content = content.replace(/'Outfit',\s*'Inter',\s*system-ui,\s*sans-serif/g, "'Montserrat', system-ui, sans-serif");
    content = content.replace(/'Outfit',\s*sans-serif/g, "'Montserrat', sans-serif");
    content = content.replace(/'Outfit',\s*'Inter',\s*sans-serif/g, "'Montserrat', sans-serif");
    content = content.replace(/'Inter,\s*system-ui,\s*sans-serif'/g, "'Montserrat', system-ui, sans-serif");
    content = content.replace(/'Inter',\s*system-ui,\s*sans-serif/g, "'Montserrat', system-ui, sans-serif");
    content = content.replace(/\"Cormorant Garamond\",\s*Georgia,\s*serif/g, "'Playfair Display', Georgia, serif");
    
    // Replace colors
    content = content.replace(/#180c04/g, '#0F0F0F');
    content = content.replace(/#fcfaee/g, '#FDFBF7');
    content = content.replace(/#938977/g, '#D4AF37');
    
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Done');
