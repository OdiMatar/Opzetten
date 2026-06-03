# React Hello World App

Deze app is opgezet met React en Vite. De app haalt bij het laden data op uit de Open-Meteo API en toont de opgehaalde data met `console.log(data)` in de browserconsole.

## Starten

```bash
npm install
npm run dev
```

Open daarna de lokale Vite-url en bekijk de browserconsole.

## API-onderzoek

Voor deze opdracht zijn drie API's bekeken: Open-Meteo, REST Countries en The Dog API.

Open-Meteo levert actuele weergegevens, zoals temperatuur en windsnelheid. De API is nuttig voor een eerste koppeling, omdat de data direct herkenbaar en controleerbaar zijn. Authenticatie is eenvoudig: er is geen API-sleutel en geen OAuth nodig. Daardoor is de API geschikt voor een basisproject waarin vooral het ophalen van data getest moet worden. De documentatie is duidelijk en bevat voorbeeld-url's die direct in de browser getest kunnen worden. Voor normaal educatief gebruik zijn de limieten ruim genoeg.

REST Countries levert landeninformatie, zoals namen, hoofdsteden, vlaggen en populatie. Ook deze API heeft geen authenticatie nodig en is makkelijk te gebruiken. De data zijn breed toepasbaar, maar minder passend bij een eerste demo waarbij je snel actuele data wilt herkennen.

The Dog API levert afbeeldingen en informatie over hondenrassen. De API is toegankelijk en de documentatie is begrijpelijk. Voor sommige onderdelen is een API-sleutel handig of nodig. Daardoor is deze API iets minder eenvoudig voor deze eerste hello-world-koppeling.

Gekozen API: Open-Meteo. Deze keuze past het beste bij de opdracht, omdat de API zonder sleutel werkt, duidelijke documentatie heeft en direct bruikbare data teruggeeft. Hierdoor kan de React-app snel bewijzen dat de basis van de API-koppeling werkt.
