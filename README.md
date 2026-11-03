# [NÁZEV] – web e-shopu s Americkým boxem

Statický vícestránkový web (HTML + CSS + JS, bez frameworků a knihoven).
Stačí otevřít `index.html` v prohlížeči, žádný server ani instalace nejsou potřeba.

> Web se zatím **nezveřejňuje**. Každá stránka má `<meta name="robots" content="noindex">`.

## Nabídka

Jeden produkt: **Americký box (střední)** za **490 Kč** (7 kusů, cca 1,5 kg,
krabice cca 30 × 25 × 14 cm). Doprava: osobně v Praze zdarma, Zásilkovna / AlzaBox 89 Kč.
Platba převodem předem. Celkem 490 Kč osobně, 579 Kč se zásilkou.

## Struktura

| Soubor | Obsah |
| --- | --- |
| `index.html` | Úvod: hero s ilustrací krabice, jak to funguje, karta boxu, výzva k objednávce |
| `krabice.html` | Detail boxu, 7 karet s obsahem, složení/alergeny/trvanlivost, ceník |
| `objednavka.html` | Postup objednání, tlačítko na Google formulář, ceník, časté dotazy |
| `doprava-a-platba.html` | Osobní předání v Praze, Zásilkovna / AlzaBox, platba převodem, ceník |
| `kontakt.html` | E-mail, Instagram, údaje prodávajícího |
| `obchodni-podminky.html` | Kostra s nadpisy |
| `ochrana-osobnich-udaju.html` | Kostra s nadpisy |
| `css/style.css` | Veškeré styly; barvy a písma jsou v proměnných na začátku souboru |
| `js/script.js` | Mobilní menu, animace při rolování, hladké rolování |
| `fonts/` | Písma Bangers (nadpisy) a Nunito (text), uložená lokálně, licence SIL OFL |
| `img/` | Zatím prázdné (místo fotek jsou zástupné bloky s emoji) |

Hlavička a patička jsou na všech stránkách stejné. Když je měníš, uprav je ve všech 7 souborech.
Aktivní stránka se v menu označuje atributem `aria-current="page"`.

## Retro verze (složka `retro/`)

Stejný obsah, ceny a zástupné hodnoty ve stylu amerického webu z konce 90. let:
pevná šířka 800 px, tapeta s hvězdami, šedé 3D panely, menu vlevo, běžící text,
blikající NEW!, 3D tlačítka a odznaky 88 × 31 v patičce. Jen systémová písma
(Times New Roman, Verdana/Arial, Impact, Courier New), žádné přechody ani emoji.

| Soubor | Obsah |
| --- | --- |
| `retro/*.html` | Stejných 7 stránek jako moderní verze |
| `retro/css/style.css` | Retro styl (barvy a písma v proměnných nahoře) |
| `retro/js/script.js` | Tlačítko „Zastavit animace“ a skok na kotvy |
| `retro/img/` | Zatím prázdné |

Odkazy uvnitř `retro/` vedou jen na retro stránky. Moderní web má v patičce odkaz
„Retro verze“, retro web odkaz „Moderní verze“ (`../index.html`).
Běžící text i blikání jdou zastavit tlačítkem a při nastavení „omezit pohyb“ se nehýbou.
Zástupné hodnoty (tabulka níže) je potřeba nahradit i ve složce `retro/`.
Datum „Naposledy aktualizováno“ v patičce retro verze se mění ručně.

## Barvy a písma

V `css/style.css` nahoře: červená `#D62839`, tmavě modrá `#1B2A5C`, krémová `#FFF4DC`,
žlutá `#FFC93C`. Nadpisy jsou v písmu **Bangers** (Chewy a Lilita One nemají
česká písmena ř, č, ě, ů), text v **Nunito**. Písma se nestahují z Googlu,
jsou ve složce `fonts/`.

## Zástupné hodnoty k nahrazení

Hledej ve všech HTML souborech včetně složky `retro/` (např. „Najít a nahradit ve všech souborech“):

| Hledej | Nahraď za |
| --- | --- |
| `[NÁZEV]` | název obchodu |
| `[ČÍSLO ÚČTU]` | číslo bankovního účtu |
| `[odkaz na Google formulář]` | adresa formuláře (je v `href` tlačítka v `objednavka.html`); poznámku pod tlačítkem pak smaž |
| `[E-MAIL]` | e-mail (je i v odkazech `mailto:`) |
| `[@ÚČET]` | Instagram, jak se zobrazí (např. `@mujucet`) |
| `[ÚČET]` | Instagram v adrese odkazu, bez zavináče |
| `[JMÉNO A PŘÍJMENÍ]`, `[ULICE A ČÍSLO, PSČ MĚSTO]`, `[IČO]` | údaje prodávajícího (`kontakt.html`) |
| `DOPLNIT` | komentáře s úkoly (Google formulář, `og:url`, `og:image`) |
| `Doplníme` / `doplníme` | složení, trvanlivost, právní texty, doba doručení |

## Před spuštěním

- [ ] Nahradit všechny zástupné hodnoty
- [ ] Doplnit složení, alergeny a trvanlivost podle štítků (`krabice.html`)
- [ ] Doplnit obchodní podmínky a ochranu osobních údajů
- [ ] Nahradit zástupné obrázky vlastními fotkami do `img/` (s popisným `alt`)
- [ ] Doplnit `og:url` a `og:image` (absolutní adresy)
- [ ] Odstranit `<meta name="robots" content="noindex">` ze všech stránek
