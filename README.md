# Quiz Adaptatif Apprentissage

Plateforme web d'apprentissage basee sur des quiz intelligents, adaptes a chaque utilisateur selon:
- ce qu'il veut apprendre
- son niveau actuel
- sa progression reelle

Le but: aider chaque personne a etudier plus vite, mieux retenir, et savoir exactement quoi revoir ensuite.

## Vision Produit

Cette application combine:
- un moteur de personnalisation local (sans cle API obligatoire)
- `HTML + CSS + JS` (ou `React`) pour une interface moderne
- un systeme de compte utilisateur pour sauvegarder et suivre l'apprentissage
- un design premium avec beaucoup d'animations fluides

## Fonctionnalites Principales

### 1) Onboarding intelligent
- Choix des domaines a apprendre (math, langues, code, science, etc.)
- Definition des objectifs (examens, niveau, date cible)
- Evaluation initiale rapide pour estimer le niveau de depart

### 2) Quiz adaptatifs (sans API IA)
- Selection de questions selon le sujet choisi
- Difficulte dynamique (plus dur si l'utilisateur reussit, plus guide s'il bloque)
- Questions variees: QCM, vrai/faux, reponse courte, scenarios
- Feedback instantane avec correction et explication claire

### 3) Comptes utilisateurs
- Inscription / connexion (email + mot de passe, OAuth possible)
- Profil personnel (niveau, objectifs, preferences)
- Donnees persistees pour reprendre l'apprentissage a tout moment

### 4) Dashboard de progression
- Suivi des quiz termines
- Score global et score par sujet
- Temps d'etude, streak journalier, taux de reussite
- Historique des erreurs frequentes
- Bloc "A etudier maintenant" base sur les lacunes detectees

### 5) Recommandations intelligentes
- Suggestions de prochains sujets
- Plan de revision automatique
- Priorisation des notions les plus faibles

## Experience UI/UX (Design Focus)

L'interface doit etre visuellement forte et memorisable:
- Hero section animee
- Transitions de pages fluides
- Cartes de quiz avec apparitions progressives (stagger)
- Micro-interactions (hover, click, validation, progression)
- Barres de progression animees et graphiques modernes
- Design responsive mobile + desktop
- Theme clair, coherent, elegant (typographie forte, couleurs bien choisies)

## Stack Technique Recommandee

### Frontend
- `React + Vite` (recommande) ou `HTML/CSS/JS` pur
- `CSS` moderne (variables, grid, flex, animations)
- Bibliotheque animation: `Framer Motion` ou `GSAP`
- Graphiques: `Chart.js` ou `Recharts`

### Backend
- `Node.js + Express` (ou `Next.js API`)
- API REST (ou GraphQL)

### Base de donnees
- `PostgreSQL` (recommande) ou `MongoDB`

### Authentification
- JWT + refresh tokens
- Option OAuth (Google/GitHub)

### Personnalisation (sans IA externe)
- Banque de questions avec metadonnees (`topic`, `subtopic`, `difficulty`)
- Score de maitrise par utilisateur et par sujet (`0-100`)
- Regles adaptatives simples:
  - bonne reponse -> maitrise augmente
  - mauvaise reponse -> maitrise diminue
  - questions suivantes choisies selon les points faibles
- Repetition espacee des erreurs frequentes

### IA (optionnel plus tard)
- API OpenAI possible en extension, mais non necessaire pour le MVP

## Architecture Fonctionnelle

Pages principales:
1. Landing page (presentation + CTA)
2. Login / Register
3. Onboarding (objectifs + niveau)
4. Quiz session (question par question)
5. Resultats et corrections
6. Dashboard progression
7. Profil utilisateur + preferences

## Logique Adaptative (Resume, sans OpenAI)

1. L'utilisateur choisit un sujet
2. Le systeme estime son niveau actuel
3. Un quiz personnalise est compose depuis la banque de questions
4. Chaque reponse met a jour un score de maitrise (`+/- points`)
5. Le systeme propose automatiquement:
   - ce qui est acquis
   - ce qui doit etre revu maintenant
   - le prochain quiz optimal

## Modele de Donnees (Minimum)

- `User`: id, nom, email, hash_password, created_at
- `Topic`: id, nom, categorie
- `Quiz`: id, user_id, topic_id, difficulte, score, started_at, ended_at
- `Question`: id, quiz_id, type, enonce, options, bonne_reponse, explication
- `Attempt`: id, question_id, user_answer, is_correct, response_time
- `Mastery`: id, user_id, topic_id, mastery_score, updated_at

## Lancement Local (Exemple React)

```bash
npm install
npm run dev
```

Build production:
```bash
npm run build
npm run preview
```

## Variables d'Environnement (Exemple)

```env
VITE_API_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

Optionnel (si IA externe activee plus tard):
```env
# VITE_OPENAI_API_KEY=your_key_here
```

## Roadmap

### MVP
- Auth + onboarding + quiz adaptatif de base
- Dashboard simple de progression
- Recommandation "quoi etudier maintenant"

### V1
- Plus de types de quiz
- Gamification (badges, niveau, classement)
- Analyse avancee des performances

### V2
- Mode collaboratif (groupes, classes)
- Support multi-langue
- Parcours certifiants

## Objectif Final

Construire une application d'apprentissage belle, rapide, animee et vraiment utile, qui transforme les quiz en coach personnel intelligent.
