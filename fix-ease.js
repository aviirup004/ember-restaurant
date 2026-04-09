const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/User/Desktop/ember/components/ember';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace existing ease string or array with the cinematic ease
  content = content.replace(/ease:\s*(\"[^\"]+\"|\[[\d\.\s,]+\])/g, 'ease: [0.25, 0.1, 0.25, 1]');
  
  // Handle transitions missing ease
  let parts = content.split('transition={{');
  for (let i = 1; i < parts.length; i++) {
    let endIdx = parts[i].indexOf('}}');
    if (endIdx !== -1) {
      let objStr = parts[i].substring(0, endIdx);
      if (!objStr.includes('ease:')) {
        parts[i] = ' ease: [0.25, 0.1, 0.25, 1],' + parts[i];
      }
    }
  }
  content = parts.join('transition={{');
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
console.log('Done.');
