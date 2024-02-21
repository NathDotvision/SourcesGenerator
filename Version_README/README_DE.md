# Quellen-Generator

## Erklärung

Mit dem Ziel, die Quellen zu erfassen und sowohl für Entwickler als auch für Manager nützlich zu sein.

Dazu haben wir mehrere Programme entwickelt, die es ermöglichen, die Quellen eines Projekts zu erfassen.

### Die Python-Dateien

Sie haben eine Datei (main.py)[./main.py], mit der das Programm gestartet werden kann.
Aber Achtung:

- Fügen Sie nicht mehr als 100 Codezeilen in die Referenzdateien ein -> Risiko der Speicherüberschreitung
- Diese Datei dauert sehr lange, um ausgeführt zu werden

Es wird eine PDF-Datei namens (data.pdf)[./data.pdf] generiert, die alle Quellen Ihres Projekts mit Logos, Links und Titeln der verschiedenen Seiten enthält.

#### Starten

Vergessen Sie nicht, den Befehl auszuführen, um die Abhängigkeiten zu installieren.

```shell
pip install -r requirements.txt
```

Starten Sie dann die Datei main.py.

### Die Web-Schnittstelle

Um die Web-Schnittstelle zu starten, starten Sie einfach die Datei (app.py)[./app.py].

Es wird die erforderlichen Abhängigkeiten für das ordnungsgemäße Funktionieren des Programms installieren durch ein `npm install`.

## Nächste Schritte

- Datenbank im Website ändern
- In verschiedene Konten einloggen
- Projekte in die Datenbank implementieren
