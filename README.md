# React Hello World App

Deze app is opgezet met React en Vite. De app haalt bij het laden data op uit de Steam Web API en toont de opgehaalde data met `console.log(data)` in de browserconsole.

## Starten

Maak eerst een `.env` bestand aan op basis van `.env.example` en vul je Steam API-key in:

```bash
STEAM_API_KEY=jouw_steam_api_key
```

Start daarna de app:

```bash
npm install
npm run dev
```

Open daarna de lokale Vite-url en bekijk de browserconsole. De React-app roept `/api/steam/global-stats` aan. Vite haalt server-side de data op bij Steam, zodat de API-key niet in de browsercode staat.

## API-onderzoek

Voor deze opdracht zijn drie API's bekeken: Steam Web API, RAWG Video Games Database API en Open-Meteo.

Steam Web API levert nuttige gamegegevens, zoals globale statistieken, gebruikersinformatie en informatie rondom games op Steam. De authenticatie is overzichtelijk: er is een API-sleutel nodig, maar geen ingewikkelde OAuth-flow voor deze basisdemo. De documentatie is technisch, maar de endpoints zijn goed genoeg beschreven om snel een testrequest te maken. Een aandachtspunt is dat je de API-key niet direct in frontend-code moet zetten. Daarom gebruikt dit project een lokale Vite API-route.

RAWG Video Games Database API levert uitgebreide gamegegevens, screenshots, genres en platforminformatie. De data zijn heel bruikbaar voor een gameproject en de documentatie is duidelijk. Er is wel een API-key nodig en de gratis limieten zijn afhankelijk van het account, dus je moet daar rekening mee houden.

Open-Meteo levert actuele weergegevens. De API is makkelijk te gebruiken, heeft duidelijke documentatie en vereist geen API-key. Voor een algemene API-demo is dat handig, maar voor dit project is Steam inhoudelijk passender omdat de data aansluiten bij games.

Gekozen API: Steam Web API. Deze keuze past het beste bij de opdracht, omdat er met een eenvoudige API-key gewerkt kan worden en de data relevant zijn voor een gamegerelateerd project. Voor deze eerste versie haalt de app alleen globale statistieken op en logt deze in de console. Verdere weergave en functionaliteit kunnen later worden uitgewerkt.
