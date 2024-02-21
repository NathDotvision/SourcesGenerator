# Generatore di Fonti

Se non parli francese, puoi trovare le versioni linguistiche di questo file [qui](./Version_README/).

## Spiegazione

Con lo scopo di raccogliere fonti e essere utile sia per gli sviluppatori che per i gestori.

Per fare ciò, abbiamo sviluppato diversi programmi che consentono di raccogliere le fonti di un progetto.

### File Python

Hai un file (main.py)[./main.py] che consente di avviare il programma.
Tuttavia, fai attenzione a:

- Non includere più di 100 linee di codice nei file di riferimento -> rischio di saturare la memoria
- Questo file impiega parecchio tempo per essere eseguito

Genererà un file PDF chiamato (data.pdf)[./data.pdf] che conterrà tutte le fonti del tuo progetto con loghi, collegamenti e titoli delle diverse pagine.

#### Avvio

Non dimenticare di eseguire il comando per installare le dipendenze.

```shell
pip install -r requirements.txt
```

Successivamente, esegui il file main.py.

### Interfaccia web

Per avviare l'interfaccia web, basta eseguire il file (app.py)[./app.py].

Si occuperà di installare le dipendenze necessarie per il corretto funzionamento del programma tramite `npm install`.

## Passaggi successivi

- Modificare il database del sito web
- Effettuare l'accesso con diversi account
- Implementazione dei progetti nel database
