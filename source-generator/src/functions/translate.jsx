import translate from "@vitalets/google-translate-api"

async function traduire(string, langueCible) {
  try {
    const resultat = await translate(string, { to: langueCible })
    console.log(`${resultat.text}`)
    return resultat.text
  } catch (erreur) {
    console.error("Une erreur s'est produite :", erreur)
  }
}

export default traduire
