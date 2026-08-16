const fs = require('fs');
const files = ['src/pages/MainPage.tsx', 'src/sections/Footer.tsx', 'src/sections/Navigation.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // There were issues with replacing quotes, where it might have replaced part of the font family causing unquoted parts
    content = content.replace(/fontFamily:\s*'Montserrat',\s*system-ui,\s*sans-serif/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
    content = content.replace(/fontFamily:\s*'Playfair Display',\s*Georgia,\s*serif/g, "fontFamily: '\"Playfair Display\", Georgia, serif'");
    content = content.replace(/fontFamily:\s*'Montserrat',\s*sans-serif/g, "fontFamily: '\"Montserrat\", sans-serif'");
    
    // Fix those we accidentally replaced with ''Montserrat' etc.
    content = content.replace(/fontFamily:\s*''Montserrat',\s*system-ui,\s*sans-serif'/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
    content = content.replace(/fontFamily:\s*''Playfair Display',\s*Georgia,\s*serif'/g, "fontFamily: '\"Playfair Display\", Georgia, serif'");
    content = content.replace(/fontFamily:\s*''Montserrat',\s*sans-serif'/g, "fontFamily: '\"Montserrat\", sans-serif'");
    
    content = content.replace(/fontFamily:\s*''Montserrat',\s*system-ui,\s*sans-serif/g, "fontFamily: '\"Montserrat\", system-ui, sans-serif'");
    content = content.replace(/fontFamily:\s*''Playfair Display',\s*Georgia,\s*serif/g, "fontFamily: '\"Playfair Display\", Georgia, serif'");
    content = content.replace(/fontFamily:\s*''Montserrat',\s*sans-serif/g, "fontFamily: '\"Montserrat\", sans-serif'");
    
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Fixed fonts 2');
