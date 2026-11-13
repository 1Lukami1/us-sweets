# Logo Big Chug (návrh)

Návrh loga. **Zatím není napojené na web**: žádná stránka na tyhle soubory neodkazuje.
Když se ti bude líbit, stačí ho vložit do hlavičky a patičky (viz níže).

| Soubor | Kdy použít |
| --- | --- |
| `big-chug-logo.svg` / `.png` | Hlavní logo: kelímek vlevo, nápis a stuha se sloganem vpravo. Hlavička webu, tiskoviny. |
| `big-chug-logo-stacked.svg` / `.png` | Logo pod sebou: kelímek nahoře, nápis pod ním. Úzká místa, příspěvky na Instagram. |
| `big-chug-emblem.svg` / `.png` | Jen kelímek ve žlutém kruhu. Profilovka na Instagramu, favicon, nálepky. |

- SVG je vektor (ostrý v jakékoli velikosti), písmena jsou převedená na křivky, takže nepotřebuje písmo.
- PNG jsou v dvojnásobném rozlišení s průhledným pozadím.
- Barvy jsou stejné jako na webu: červená `#D62839`, tmavě modrá `#1B2A5C`, žlutá `#FFC93C`, krémová `#FFF4DC`.

## Jak ho dát na web (až budeš chtít)

1. V hlavičce všech 7 stránek nahraď obsah odkazu `<a class="logo" …>` za
   `<img src="logo/big-chug-logo.svg" alt="Big Chug – Amerika v krabici." height="64">`.
2. V `css/style.css` uprav `.logo` (výška obrázku, zrušit `text-shadow`).
3. Zvyš číslo verze `?v=…` u `style.css` ve všech stránkách.
