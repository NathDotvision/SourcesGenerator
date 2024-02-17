const { translate } = require('@vitalets/google-translate-api');

async function traduire(mot, langueCible) {
    try {
        const resultat = await translate(mot, { to: langueCible });
        console.log(`${resultat.text}`);
    } catch (erreur) {
        console.error("Une erreur s'est produite :", erreur);
    }
}

const str_test = "Il semble y avoir une erreur lors de l'exécution du code JavaScript. Il est possible que l'API utilisée (@vitalets/google-translate-api) ait changé ou que son utilisation nécessite une mise à jour. Je vous suggère de vérifier la documentation de l'API ou d'utiliser une autre bibliothèque de traduction JavaScript pour obtenir les résultats souhaités.";

traduire(str_test, 'en')
traduire(str_test, 'es')
traduire(str_test, 'de')
traduire(str_test, 'it')
traduire(str_test, 'pt')
traduire(str_test, 'nl')
traduire(str_test, 'pl')
traduire(str_test, 'ru')
traduire(str_test, 'ja')
traduire(str_test, 'ko')
traduire(str_test, 'zh-CN')
traduire(str_test, 'ar')