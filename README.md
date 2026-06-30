# Odi Search Steam

Odi Search Steam is een website die ik heb gemaakt om Steam-games te zoeken, te filteren en duidelijk te bekijken. Ik wilde niet alleen data ophalen en in de console tonen, maar er echt een bruikbare website van maken. Daarom heb ik een homepage, een game-overzicht, detailpagina's, gedeelde state en een eigen stijl toegevoegd.

De website gebruikt Steam-data om games als duidelijke kaarten te tonen. Een bezoeker kan zoeken naar games zoals `counter`, `portal` of `dota`, en daarna filteren op spelers, servers en achievements. Zo kan iemand snel zien welke games actief zijn en welke informatie Steam over die games teruggeeft.

## Starten

Maak eerst een `.env` bestand aan op basis van `.env.example` en vul je Steam API-key in:

```bash
STEAM_API_KEY=jouw_steam_api_key
```

Daarna kun je de website starten:

```bash
npm install
npm run dev
```

De website gebruikt een lokale API-route: `/api/steam/games`. Die route staat in `vite.config.js`. Ik gebruik deze route zodat de Steam API-key niet zichtbaar wordt in de browser.

## Opdracht 1: Ontwikkelomgeving en API-onderzoek

Bij de eerste stap heb ik de ontwikkelomgeving opgezet en onderzocht welke API ik wilde gebruiken. Ik ben begonnen met een simpele React/Vite app en een eerste API-call. In het begin was het doel vooral om te bewijzen dat mijn website data kon ophalen.

Ik heb gekozen voor de Steam API, omdat die goed past bij het onderwerp games. Steam heeft veel bruikbare data, zoals gametitels, afbeeldingen, spelersaantallen, achievements en serverinformatie. Daardoor kon ik later meer bouwen dan alleen een simpele lijst met namen.

Ik heb ook andere API's bekeken:

- **Steam API:** past goed bij games, maar sommige endpoints zijn technisch en niet alle informatie zit in een request.
- **RAWG API:** handig voor game-informatie, screenshots en genres, maar ik wilde uiteindelijk dichter bij Steam-data blijven.
- **Open-Meteo:** makkelijk en zonder key, maar minder passend omdat mijn website over games gaat.

Uiteindelijk heb ik Steam gekozen omdat de data het beste aansluit bij wat ik wilde maken: een website waar je games kunt zoeken en vergelijken.

Wat ik in deze stap heb gedaan:

- Een React/Vite project opgezet.
- Een `.env` bestand gebruikt voor de Steam API-key.
- Een lokale Vite API-route gemaakt in `vite.config.js`.
- De Steam API getest met een fetch.
- De eerste API-response gecontroleerd met `console.log`.
- Het project bijgehouden met git.

Zo zou ik dit uitleggen:

Ik ben eerst klein begonnen. Mijn eerste doel was om te testen of mijn website verbinding kon maken met een externe API. Toen dat werkte, heb ik gekeken welke API het beste bij mijn idee paste. Steam was logisch, omdat Odi Search Steam draait om games zoeken en vergelijken.

## Opdracht 2: Data weergeven

Daarna heb ik de API-data zichtbaar gemaakt op de pagina. De data staat nu niet alleen meer in de console, maar wordt echt getoond in de interface.

De game-overzichtspagina staat op:

```txt
/games
```

Op deze pagina kan de gebruiker zoeken naar games. De resultaten worden als kaarten weergegeven. Elke kaart hoort bij een game.

Op een gamekaart staat:

- de afbeelding van de game
- de naam van de game
- een link naar de detailpagina
- Metascore als Steam die teruggeeft
- huidige spelers
- gevonden servers
- aantal achievements

De data wordt opgehaald wanneer de app laadt. Daarvoor gebruik ik `useEffect` in de Context provider. De eerste standaardzoekterm is `counter`, zodat de pagina meteen gevuld is en niet leeg begint.

De lijst wordt gemaakt met `.map()`. Daarmee loop ik door de games heen en maak ik voor elke game een kaart:

```js
filteredGames.map((game) => (
  <GameCard game={game} key={game.appid} />
))
```

Waarom dit goed werkt:

- Er is een echte overzichtspagina.
- De API-data wordt opgehaald bij het laden.
- De resultaten worden opgeslagen in state.
- Elk item wordt met `.map()` omgezet naar een kaart.
- De gebruiker ziet duidelijke informatie in plaats van ruwe JSON.

Zo zou ik dit uitleggen:

Steam geeft ruwe data terug. Ik heb die data omgezet naar gamekaarten, zodat de gebruiker meteen ziet welke games gevonden zijn en welke informatie daarbij hoort. Daardoor voelt de website meer als een echte zoekmachine en minder als een API-test.

## Opdracht 3: Routing toevoegen

Daarna heb ik client-side routing toegevoegd met `react-router-dom`. Hierdoor heeft de website meerdere pagina's, zonder dat de browser steeds helemaal opnieuw hoeft te laden.

De routes zijn:

```txt
/              Homepagina
/games         Overzichtspagina met games
/games/:appid  Detailpagina van een game
/over          Uitlegpagina over de website
```

De homepagina is het startpunt van Odi Search Steam. Daar leg ik kort uit wat de website doet. Vanuit daar kan de gebruiker naar de gamezoeker.

De overzichtspagina toont alle gevonden games. Elke gamekaart linkt naar een detailpagina. Bijvoorbeeld:

```txt
/games/730
```

Het getal is de Steam App ID. Daardoor krijgt elke game een eigen URL.

Waarom React Router handig is:

- De gebruiker kan direct naar een pagina gaan via een URL.
- De detailpagina van een game voelt als een echte pagina.
- De browsergeschiedenis werkt normaal.
- De website blijft snel omdat het een single-page application blijft.

Alternatieven voor React Router zijn bijvoorbeeld:

- Zelf pagina's tonen of verbergen met state.
- Next.js routing gebruiken.
- TanStack Router gebruiken.

Voor mijn website is React Router een goede keuze, omdat het duidelijk is, veel gebruikt wordt en goed past bij de pagina's die ik nodig heb.

Zo zou ik dit uitleggen:

Eerst stond bijna alles op een pagina. Daarna heb ik routes toegevoegd, zodat de website voelt als een echte site. De gebruiker kan nu naar home, games, een detailpagina en een over-pagina. Vooral de detailpagina is handig, omdat elke game via zijn eigen App ID geopend kan worden.

## Opdracht 4: State management toevoegen

Daarna heb ik state management toegevoegd met de **Context API**.

In het begin stond bijna alle state in `App.jsx`. Dat werkte toen de website nog klein was. Maar toen ik routing toevoegde, hadden meerdere pagina's dezelfde game-data nodig. De overzichtspagina gebruikt de games, maar de detailpagina gebruikt dezelfde games ook. Daarom heb ik de gedeelde state verplaatst naar Context.

De gedeelde state staat in:

```txt
src/GameContext.jsx
src/useGameContext.js
```

In deze state bewaar ik:

- de zoekterm
- de opgehaalde games
- de gefilterde games
- de loading-status
- de statusmelding
- de filter voor minimale spelers
- de filter voor servers
- de filter voor achievements
- eerder opgehaalde zoekresultaten als cache

De cache is belangrijk. Als dezelfde zoekterm al eerder is opgehaald, gebruikt de website de opgeslagen resultaten. Daardoor hoeft dezelfde API-call niet opnieuw gedaan te worden. Dat is beter voor performance en ook netter richting de API.

Waarom ik Context API gebruik:

- De website is niet groot genoeg om Redux nodig te hebben.
- De data moet wel door meerdere pagina's gebruikt worden.
- Context zit standaard in React.
- De code blijft overzichtelijk en goed uit te leggen.

Redux zou pas logischer worden als de website veel groter wordt. Bijvoorbeeld met accounts, favorieten, meerdere lijsten, uitgebreide caching of veel losse onderdelen die allemaal dezelfde data nodig hebben.

Wat is state in React?

State is data die kan veranderen terwijl iemand de website gebruikt. Bijvoorbeeld: de zoekterm verandert wanneer de gebruiker typt, de game-lijst verandert na een API-call en filters veranderen wanneer iemand een checkbox aanklikt. React gebruikt die state om de interface opnieuw te tekenen.

Zo zou ik dit uitleggen:

Ik gebruik Context API omdat meerdere pagina's dezelfde game-data nodig hebben. De overzichtspagina haalt games op en de detailpagina gebruikt dezelfde data. Daardoor hoef ik niet steeds opnieuw dezelfde informatie op te halen en blijft de website sneller en overzichtelijker.

## Opdracht 5: Stijl toevoegen

Als laatste heb ik de website een eigen stijl gegeven. Ik wilde dat Odi Search Steam niet meer leek op een standaard demo, maar op een eigen website.

Wat ik heb toegevoegd aan de stijl:

- een eigen naam: **Odi Search Steam**
- een eigen rond **OS**-logo
- een Steam-achtige achtergrond over de hele pagina
- een donkere overlay zodat tekst leesbaar blijft
- duidelijke navigatie
- een homepage met hero-sectie
- kaarten voor games
- responsive layout voor kleinere schermen
- filters en knoppen die bij de stijl passen
- een footer met korte slogan

Ik gebruik niet meer het standaard Steam-logo als eigen logo. Steam is de databron en het onderwerp, maar Odi Search Steam is mijn eigen website. Daarom gebruik ik het **OS**-logo als herkenbaar teken.

De achtergrondafbeelding geeft meteen een game/Steam-sfeer. Omdat de achtergrond donker is, heb ik de tekst en kaarten zo gestyled dat alles goed leesbaar blijft. De kaarten hebben genoeg contrast, afgeronde hoeken en een vaste structuur, zodat de game-informatie makkelijk te scannen is.

Waarom deze stijl past:

- Het onderwerp is gaming, dus een donkere Steam-achtige sfeer past goed.
- De interface blijft overzichtelijk.
- De gebruiker ziet direct dat het om games gaat.
- De gamekaarten maken de API-data rustiger en duidelijker.

Zo zou ik dit uitleggen:

Ik heb de stijl aangepast aan het onderwerp. Omdat Odi Search Steam over Steam-games gaat, past een donkere game-achtergrond goed. Ik heb ook een eigen logo gemaakt, zodat de website voelt als mijn eigen project en niet alleen als een kopie van Steam.

## Gebruikte Steam-data

De website gebruikt meerdere Steam endpoints, omdat Steam niet een endpoint heeft die alles tegelijk teruggeeft.

Ik gebruik:

- Steam Store Search voor de zoekresultaten.
- `GetNumberOfCurrentPlayers` voor huidige spelers.
- `GetGlobalAchievementPercentagesForApp` voor achievements.
- `IGameServersService/GetServerList` voor serverinformatie.

Belangrijk: `0 servers` betekent niet altijd dat een game geen multiplayer heeft. Het betekent alleen dat deze Steam endpoint geen servers teruggeeft voor die game.

## Korte presentatie-uitleg

Als ik Odi Search Steam kort moet uitleggen, zou ik zeggen:

Odi Search Steam is een website die ik heb gemaakt om Steam-games te zoeken en te vergelijken. Ik haal echte data op uit de Steam API en toon die als overzichtelijke kaarten. Daarna heb ik routing toegevoegd, zodat er een homepagina, overzichtspagina, detailpagina en over-pagina is. De opgehaalde games worden opgeslagen in Context API, zodat meerdere pagina's dezelfde data kunnen gebruiken en dubbele API-aanvragen worden beperkt. Tot slot heb ik de website een eigen stijl gegeven met een OS-logo, donkere Steam-achtergrond en duidelijke gamekaarten.

## Bestanden die belangrijk zijn

- `vite.config.js`: lokale API-route naar Steam.
- `src/GameContext.jsx`: gedeelde state en API-cache.
- `src/useGameContext.js`: hook om de gedeelde state te gebruiken.
- `src/App.jsx`: routes, pagina's en gamekaarten.
- `src/App.css`: styling van de website.
- `src/index.css`: globale achtergrond en basisstijl.
