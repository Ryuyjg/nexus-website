const fs = require('fs');
const path = require('path');

const srcDir = 'c:/website/next_temp';
const destDir = 'c:/website';
const oldDir = 'c:/website/_old';

if (!fs.existsSync(oldDir)) {
  fs.mkdirSync(oldDir);
}

// Move old files to _old
const oldFiles = ['index.html', 'contact.html', 'css', 'js', 'admin'];
oldFiles.forEach(file => {
  const p = path.join(destDir, file);
  if (fs.existsSync(p)) {
    fs.renameSync(p, path.join(oldDir, file));
  }
});

// Merge .gitignore
const oldGitignore = path.join(destDir, '.gitignore');
const newGitignore = path.join(srcDir, '.gitignore');
if (fs.existsSync(oldGitignore) && fs.existsSync(newGitignore)) {
    const oldContent = fs.readFileSync(oldGitignore, 'utf8');
    const newContent = fs.readFileSync(newGitignore, 'utf8');
    fs.writeFileSync(oldGitignore, oldContent + '\n' + newContent);
    fs.unlinkSync(newGitignore);
}

// Move next_temp to root
const items = fs.readdirSync(srcDir);
items.forEach(item => {
  const src = path.join(srcDir, item);
  const dest = path.join(destDir, item);
  
  // if dest exists, remove it first (for files like README.md)
  if (fs.existsSync(dest)) {
    if (fs.statSync(dest).isFile()) {
        fs.unlinkSync(dest);
    }
  }
  
  fs.renameSync(src, dest);
});

fs.rmdirSync(srcDir);
console.log('Files moved successfully.');
