const fs = require('fs');
let content = fs.readFileSync('src/components/MemberSanctuary.tsx', 'utf8');
content = content.replace(/financial downloads/g, 'financial transmissions');
fs.writeFileSync('src/components/MemberSanctuary.tsx', content);
console.log("Replaced downloads.");
