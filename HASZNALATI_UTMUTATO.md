# Admin használati útmutató

Ez az útmutató csak az admin felület használatáról szól. Úgy készült, hogy technikai tudás nélkül is követhető legyen.

## 1. Mire való az admin felület?

Az admin felületen a galéria képeit lehet kezelni.

Itt lehet:

- új képeket feltölteni,
- több képet egyszerre feltölteni,
- képeket drag-and-drop módon behúzni,
- képleírásokat módosítani,
- képeket törölni,
- feltöltött képeket megnyitni.

## 2. Admin felület megnyitása

Az admin felületet böngészőből lehet megnyitni.

Az admin oldal címe:

`/admin`

Éles weboldalon például így néz ki:

`https://szentesivadvedelem.hu/admin`

## 3. Belépés az adminba

Az admin felület jelszóval védett.

Belépés menete:

1. Nyisd meg az admin oldalt.
2. Írd be az admin jelszót.
3. Kattints a belépés gombra.

Ha a jelszó helyes, megnyílik az admin felület.

Ha a jelszó hibás, hibaüzenet jelenik meg.

## 4. Képek oldal megnyitása

Az admin felületen a képek kezeléséhez a képek oldalra kell menni.

Ez általában itt érhető el:

`/admin/images`

Itt látható:

- a feltöltő rész,
- a már feltöltött képek listája,
- a képekhez tartozó műveletek.

## 5. Egy vagy több kép feltöltése

A feltöltés menete:

1. Kattints a **Képek kiválasztása** gombra.
2. Válassz ki egy vagy több képet a gépedről.
3. Ha szeretnél, adj meg egy rövid leírást.
4. Kattints a **Feltöltés** gombra.

Több kép kiválasztása is lehetséges egyszerre.

Windows alatt általában a `Ctrl` gombbal lehet több képet kijelölni.

Macen általában a `Cmd` gombbal lehet több képet kijelölni.

## 6. Drag-and-drop feltöltés

A képeket nem muszáj gombbal kiválasztani.

Használható a húzd és ejtsd módszer is:

1. Nyisd meg a mappát, ahol a képek vannak.
2. Jelölj ki egy vagy több képet.
3. Húzd rá őket az admin feltöltő mezőjére.
4. Engedd el az egérgombot.
5. Kattints a **Feltöltés** gombra.

Ha a képek sikeresen kiválasztásra kerültek, az admin felület jelzi, hány kép van kijelölve.

## 7. Kiválasztott képek törlése feltöltés előtt

Ha rossz képeket választottál ki, még feltöltés előtt törölheted a kijelölést.

Ehhez kattints a **Kijelölés törlése** gombra.

Ez nem törli a képeket a számítógépedről, csak az admin feltöltő mezőből veszi ki őket.

## 8. Mi történik feltöltéskor?

Feltöltéskor a képek automatikusan WebP formátumba kerülnek.

Ez a böngészőben történik, nem a szerveren.

Ez azért jó, mert:

- kisebb méretű képek kerülnek fel,
- gyorsabb lesz a galéria betöltése,
- kevésbé terhelődik a szerver,
- nem kell külön képszerkesztő programmal átalakítani a képeket.

## 9. Képleírás megadása feltöltéskor

A feltöltésnél van egy **Leírás** mező.

Ide rövid szöveget lehet írni a képekhez.

Fontos: ha egyszerre több képet töltesz fel, akkor ugyanaz a leírás kerülhet az összes egyszerre feltöltött képre.

Ha külön leírást szeretnél minden képhez, akkor feltöltés után egyesével módosítsd őket.

## 10. Feltöltött képek listája

A feltöltött képek az admin oldalon listában jelennek meg.

Minden képnél látható:

- a kép előnézete,
- a létrehozás dátuma,
- a frissítés dátuma,
- a leírás mező,
- a **Megnyitás** gomb,
- a **Mentés** gomb,
- a **Törlés** gomb.

## 11. Képleírás módosítása

Már feltöltött kép leírásának módosítása:

1. Keresd meg a képet a listában.
2. Írd át a szöveget a kép melletti leírás mezőben.
3. Kattints a **Mentés** gombra.
4. Sikeres mentés után visszajelző üzenet jelenik meg.

## 12. Kép megnyitása

A **Megnyitás** gombbal a kép új böngészőfülön nyílik meg.

Ez akkor hasznos, ha nagyobban szeretnéd ellenőrizni a feltöltött képet.

## 13. Kép törlése

Kép törlésének menete:

1. Keresd meg a törölni kívánt képet.
2. Kattints a **Törlés** gombra.
3. A böngésző megkérdezi, hogy biztosan törölni szeretnéd-e.
4. Ha jóváhagyod, a kép törlődik.

Figyelem: a törlés végleges lehet. Törölt képet csak biztonsági mentésből lehet visszaállítani.

## 14. Gyakori hibák

### Nem sikerül feltölteni a képet

Lehetséges okok:

- megszakadt az internetkapcsolat,
- a kép sérült,
- a böngésző nem tudta WebP formátumba alakítani,
- a szerveren nincs írási jogosultság a képek mappájához,
- az adatbázis nem elérhető.

Mit érdemes megpróbálni:

1. Frissítsd az oldalt.
2. Próbáld újra a feltöltést.
3. Próbálj kevesebb képet feltölteni egyszerre.
4. Próbáld másik böngészőből.
5. Ha továbbra sem működik, szólj a fejlesztőnek.

### Nem látszik a kép előnézete

Lehetséges okok:

- a kép fájl hiányzik a szerverről,
- a kép törölve lett,
- átmeneti betöltési hiba történt.

Ilyenkor frissítsd az oldalt. Ha továbbra sem jó, szólj a fejlesztőnek.

## 15. Ajánlott használat

Feltöltés előtt érdemes:

- a homályos képeket kiválogatni,
- a duplikált képeket kihagyni,
- egyszerre nem túl sok képet feltölteni,
- rövid, érthető leírásokat használni.

Javasolt egyszerre legfeljebb 10–20 képet feltölteni.

## 16. Biztonsági tudnivalók

- Az admin jelszót ne oszd meg nyilvánosan.
- Ne küldd el a jelszót üzenetben több embernek.
- Ne tölts fel oda nem illő képeket.
- Ne törölj képet, ha nem vagy biztos benne.
- A fontos képekről érdemes biztonsági mentést tartani.
