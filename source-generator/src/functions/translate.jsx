import translate from "@vitalets/google-translate-api"

/**
 * Translates a string to the target language.
 * @param {string} string - The string to be translated.
 * @param {string} langueCible - The target language.
 * @returns {Promise<string>} The translated string.
 */
async function traduire(string, langueCible) {
  //! Attention : la traduction est limitée à 5000 caractères par jour.
  try {
    const resultat = await translate(string, { to: langueCible })
    console.log(`${resultat.text}`)
    return resultat.text
  } catch (erreur) {
    console.error("Une erreur s'est produite :", erreur)
  }
}

export default traduire
