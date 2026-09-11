# Telajob

Landing Telajob, sur **Cloudflare Workers**.

Le bouton **Candidater** ouvre le formulaire Tally (prénom, email, téléphone). Le poste est envoyé en champ caché. Les réponses arrivent dans Tally et par email.

## Lancer en local

```sh
npm install
npm run dev
```

Preview Workers (après `npm run build`) :

```sh
npx wrangler dev --config .output/server/wrangler.json --port 43123 --ip 0.0.0.0
```

## Déployer

```sh
npm install
npx wrangler login
npm run deploy
```
