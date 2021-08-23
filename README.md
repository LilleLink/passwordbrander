# PW Pusher wrapper för bättre branding

Beroenden:
Se till att ha installerat node.js och NPM (kommer med node.js tror jag https://nodejs.org/en/)

1. Se till att .env filen innehåller rätt URL till var appen skall hostas (localhost om det är lokalt)
2. Se till att alla dependencies finns installerade (npm install)

Development:
3. Då en node server behövs för frontendens CORS proxy, behöver man köra npm run build - för att bygga appen till dist mappen.
4. Starta node server genom att köra node server.js. Den körs sedan på localhost:80.
5. Starta backendpw container: docker run -d -it -p 5100:5100 pglombardo/pwpush-ephemeral

Production:
3. Sätt upp miljön genom att köra docker-compose up

