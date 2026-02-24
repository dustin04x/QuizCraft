# QuizCraft - IT & Cybersecurity Quiz Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Enabled-ff4da6)](https://www.framer.com/motion/)
[![Router](https://img.shields.io/badge/React%20Router-v7-CA4245)](https://reactrouter.com/)
[![Lint](https://img.shields.io/badge/ESLint-Configured-4B32C3?logo=eslint)](https://eslint.org/)
[![Mobile](https://img.shields.io/badge/Mobile-Optimized-0ea5e9)](#mobile-optimization)
[![Local Progress](https://img.shields.io/badge/Progress-localStorage-16a34a)](#progress-tracking-local)

A modern quiz web app focused on **Computer Science** and **Cybersecurity** topics.

It includes randomized questions, smooth transitions, multiple quiz modes, local progress tracking, and a responsive mobile-friendly UI.

## Live Product Scope

- IT/Cyber only question bank (no generic trivia).
- 4 quiz modes:
1. Classic
2. Timed Sprint
3. Exam Mode
4. Review Mistakes
- Randomized questions and answer options each run.
- Explanations after answers (or at final submission in Exam mode).
- Final score + detailed wrong answer review.
- Progress stored locally in the browser.
- Contact footer links (LinkedIn + GitHub).

## Tech Stack

- **Frontend:** React 19 + Vite
- **Routing:** React Router v7
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **State/Data:** React hooks + localStorage
- **Linting:** ESLint

## Project Structure

```text
Quiz Adaptatif Apprentissage/
  README.md
  frontend/
    package.json
    index.html
    public/
      favicon.svg
      bg-main.jpg
    src/
      App.jsx
      index.css
      components/
        AppLayout.jsx
        PageTransition.jsx
      data/
        questions.js
        questionsExtra.js
        questionBank.js
        progressStore.js
      pages/
        LandingPage.jsx
        QuizPage.jsx
        NotFoundPage.jsx
```

## Question Bank

- Total questions: **200**
- Total categories: **10**
- Main source files:
  - `frontend/src/data/questions.js`
  - `frontend/src/data/questionsExtra.js`
- Aggregation/mapping logic:
  - `frontend/src/data/questionBank.js`

Categories include:
- Programming Fundamentals
- Data Structures & Algorithms
- Computer Networks
- Operating Systems
- Databases & SQL
- Web Development
- Cybersecurity Basics
- Web Security
- Cryptography
- Cloud & DevOps

## Quiz Modes

### 1) Classic
- Instant feedback per question
- Explanation shown immediately

### 2) Timed Sprint
- 20 seconds per question
- Timeout auto-submits as no answer

### 3) Exam Mode
- No instant feedback
- Full review shown at the end

### 4) Review Mistakes
- Pulls from previously missed questions
- Uses local stats to create a focused drill set

## Progress Tracking (Local)

Implemented in:
- `frontend/src/data/progressStore.js`

Stored in browser localStorage (`quizcraft-progress-v1`):
- Session history
- Per-question stats (attempts/correct/wrong)
- Per-topic stats
- Drill pool for mistake review

No backend is required for progress tracking.

## Mobile Optimization

The app includes mobile-focused improvements:
- Larger touch targets (44px+)
- Better stacked nav/actions on small screens
- Cleaner card layouts for quiz setup and results
- Sticky primary action button in question flow on very small screens
- Reduced visual noise effects on compact devices

## Getting Started

> Important: run npm commands **inside `frontend/`**.

### Prerequisites

- Node.js 18+ recommended
- npm 9+ recommended

### Install

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Available Scripts

From `frontend/package.json`:

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Common Issue

If you see:

`npm ERR! enoent Could not read package.json`

You are likely running npm in the repo root.

Fix:

```bash
cd frontend
npm run dev
```

## Customization Guide

### Update questions

Edit:
- `frontend/src/data/questions.js`
- `frontend/src/data/questionsExtra.js`

Then the app automatically rebuilds topic metadata from `questionBank.js`.

### Update quiz behavior

Edit:
- `frontend/src/pages/QuizPage.jsx`

Examples:
- Timer duration (`TIMED_QUESTION_SECONDS`)
- Question count presets (`QUESTION_COUNTS`)
- Mode labels/descriptions (`MODE_OPTIONS`)

### Update visual theme

Edit:
- `frontend/src/index.css`
- `frontend/index.html` (fonts)
- `frontend/public/favicon.svg` (favicon)

## Routes

Defined in `frontend/src/App.jsx`:

- `/` -> Landing page
- `/play` -> Quiz experience
- `/quiz` -> Redirects to `/play`
- `*` -> Not Found page

## Current Product Status

This is a **frontend-first product** with:
- no authentication
- no server API
- local-only persistence

It is ideal for:
- portfolio/demo use
- student self-practice
- rapid iteration before backend integration

## Author / Contacts

- LinkedIn: <https://www.linkedin.com/in/skander-wali-901040391/>
- GitHub: <https://github.com/dustin04x>

