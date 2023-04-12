# Kitty Project
Aplikacja do zarządzania zakupami w grupie.

<i>Na potrzeby dema aplikacji i problemy z wysyłaniem maili po wrzuceniu aplikacji na Vercel, zostały wyłączone maile aktywacyjne</i>

## Uruchomienie

```bash
npm i

npm prisma db push

npm run build

npm run start
```

(<b>Aplikacja do poprawnego funkcjonowania potrzebuje pliku .env.</b>)

Demo aplikacji: https://kitty-eight.vercel.app/

Wykorzystane technologie:
- NextJS
- NextAuth
- TypeScript
- Prisma
- MongoDB
- TailWind - DaisyUI
- PWA

<i>Aplikacja jest na wczesnym etapie rozwoju, zostało przedstawione pierwsze demo, które realizuje tylko część założeń projektu. Aplikacja będzie dalej rozwijana. Na ten moment aplikacja wymaga dodania testów oraz zrobienia refaktoryzacji kodu. W planach jest rozwinięcie funkcjonalności aplikacji oraz interfejsu, np. dokonywanie zmian w zrzutkach, wysyłania maili przypominających o zrzutce.</i>

