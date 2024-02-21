const { translate } = require("@vitalets/google-translate-api");
const fs = require('fs');

// Dictionnaire des langues cibles
const langues = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'zh-CN': 'Chinese (Simplified)'
};

// Fonction sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Lire le contenu du fichier
fs.readFile('../README.md', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let links = '';

  // Traduire et écrire le contenu dans un autre fichier pour chaque langue
  for (let [code, langue] of Object.entries(langues)) {
    try {
      let translatedText = await traduire(data, code);
      let filename = `README_${code.toUpperCase()}.md`;
      fs.writeFile(`../Version_README/${filename}`, translatedText, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`The file has been saved in ${langue}!`);
      });
      links += `[${langue}](./${filename})\n`;
      await sleep(1000); // Attendre 1 seconde
    } catch (err) {
      console.error(err);
    }
  }

  fs.writeFile('../Version_README/INDEX.md', links, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('The index file has been saved!');
  });
});

async function traduire(mot, langueCible) {
  //! Attention : api google translate est payante
  try {
    const resultat = await translate(mot, { to: langueCible });
    return resultat.text;
  } catch (erreur) {
    console.error("Une erreur s'est produite :", erreur);
    return '';
  }
}