# [NÁZEV] – web e-shopu s dárkovými krabicemi

Statický vícestránkový web (HTML + CSS + JS, bez frameworků a knihoven).
Stačí otevřít `index.html` v prohlížeči, žádný server ani instalace nejsou potřeba.

> Web se zatím **nezveřejňuje**. Každá stránka má `<meta name="robots" content="noindex">`.

## Struktura

| Soubor | Obsah |
| --- | --- |
| `index.html` | Úvodní stránka: hero, Jak to funguje, náhled krabic, výzva k objednávce |
| `krabice.html` | Velikosti a ceny, 4 témata × 3 velikosti, filtr |
| `objednavka.html` | Postup objednání, tlačítko na formulář, časté dotazy |
| `doprava-a-platba.html` | Osobní předání / Zásilkovna, převod / hotově |
| `kontakt.html` | E-mail, Instagram, údaje prodávajícího |
| `obchodni-podminky.html` | Kostra s nadpisy |
| `ochrana-osobnich-udaju.html` | Kostra s nadpisy |
| `css/style.css` | Veškeré styly, barvy a písma jsou v proměnných na začátku souboru |
| `js/script.js` | Mobilní menu, filtr krabic, hladké rolování |
| `fonts/` | Písmo Yellowtail pro nadpisy (uložené lokálně, žádné načítání z Google; licence v `fonts/LICENSE.txt`) |
| `img/` | Zatím prázdné (místo fotek jsou zástupné bloky s emoji) |

## Vzhled

Retro americký diner: paprsky za úvodním nadpisem, šachovnice, chromová lišta,
jídelní lístek s tečkovanými cenami, cenovky ve tvaru hvězdy, visačky, razítka,
vstupenka s výzvou k objednání, poštovní známky (doprava), účtenky (platba)
a pohlednice s okrajem letecké pošty (kontakt). Barvy a písma jsou
v proměnných na začátku `css/style.css`. Ilustrace na úvodní stránce jsou
kreslené přímo v HTML jako SVG, takže nepotřebují žádné soubory.

Hlavička a patička jsou na všech stránkách stejné. Když je měníš, uprav je ve všech 7 souborech.
Aktivní stránka se v menu označuje atributem `aria-current="page"`.

## Zástupné hodnoty k nahrazení

Hledej v HTML souborech (např. „Najít a nahradit ve všech souborech“):

| Hledej | Nahraď za |
| --- | --- |
| `[NÁZEV]` | název obchodu |
| `[E-MAIL]` | e-mail (je i v odkazech `mailto:`) |
| `[@ÚČET]` | Instagram, jak se zobrazí (např. `@mujucet`) |
| `[ÚČET]` | Instagram v adrese odkazu, bez zavináče |
| `[JMÉNO A PŘÍJMENÍ]`, `[ULICE A ČÍSLO, PSČ MĚSTO]`, `[IČO]` | údaje prodávajícího (`kontakt.html`) |
| `DOPLNIT` | komentáře s úkoly: odkaz na Google formulář (`objednavka.html`), `og:url` a `og:image` |
| `doplníme` | složení, alergeny, hmotnost, trvanlivost, ceny dopravy, právní texty |

## Filtr krabic

Karty v `krabice.html` mají atributy `data-tema` (`gamer`, `palivy`, `sladky`, `vanocni`)
a `data-velikost` (`maly`, `stredni`, `velky`). Filtr jde předvolit v odkazu,
např. `krabice.html?tema=gamer` nebo `krabice.html?velikost=velky`.
Bez JavaScriptu se filtr skryje a zobrazí se všechny krabice.

## Před spuštěním

- [ ] Nahradit všechny zástupné hodnoty a „doplníme“
- [ ] Vložit odkaz na Google formulář a smazat poznámku pod tlačítkem
- [ ] Doplnit obchodní podmínky a ochranu osobních údajů
- [ ] Nahradit zástupné obrázky fotkami do `img/` (s popisným `alt`)
- [ ] Doplnit `og:url` a `og:image` (absolutní adresy)
- [ ] Odstranit `<meta name="robots" content="noindex">` ze všech stránek
