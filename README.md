# TogetherPad

A distraction-free, real-time collaborative notepad. Open a note by name, start typing — no accounts, no setup.

## Features

- **Instant notes** — open any note by slug, it's created automatically if it doesn't exist
- **Auto-save** — content is saved 1 second after you stop typing
- **Protected notes** — password-protect a note with bcrypt hashing
- **Stateless auth** — short-lived signed access tokens (jose / HS256) for protected notes
- **No accounts** — zero sign-up friction

## Tech Stack

**Client**
- React 19, Vite, Tailwind CSS
- React Router, Axios

**Server**
- Node.js, Express 5
- MongoDB, Mongoose
- bcrypt, jose, Zod, Helmet, Morgan

## Project Structure

```
togetherPad/
├── client/          # React frontend
└── server/          # Express backend
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
NOTE_ACCESS_SECRET=your_secret_key_min_32_chars
```

```bash
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## API

Base URL: `/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/notes` | Create a note |
| `GET` | `/notes/:slug` | Get note state |
| `POST` | `/notes/:slug/open` | Unlock a protected note |
| `PATCH` | `/notes/:slug/content` | Update note content |

`GET /notes/:slug` always returns `200` with a `state` field:

| State | Meaning |
|-------|---------|
| `public` | Note exists, content returned |
| `password_required` | Note is protected |
| `not_found` | Note doesn't exist yet |

## How It Works

```
                User Opens Website
                       │
                       ▼
                Landing Page (/)
                       │
                       ▼
            Enter Note Slug + Click Go
                       │
                       ▼
          GET /api/v1/notes/:slug
                       │
          ┌────────────┴────────────┐
          │                        │
          ▼                        ▼
     Note Exists?            Doesn't Exist
          │                        │
          ▼                        ▼
   Is Protected?           Show Create Dialog
          │                        │
     ┌────┴────┐                   ▼
     │         │           POST /api/v1/notes
     ▼         ▼                   │
  Public    Protected              ▼
     │         │           Redirect to Editor
     ▼         ▼
  Editor   Password Screen
               │
               ▼
  POST /api/v1/notes/:slug/open
               │
        Password Correct?
          ┌────┴────┐
          │         │
          ▼         ▼
         Yes        No
          │         │
          ▼         ▼
   Return Access  Show Error
       Token
          │
          ▼
       Editor
          │
          ▼
   Auto Save (Debounced)
          │
          ▼
  PATCH /api/v1/notes/:slug/content
```

## Usage

1. Go to `http://localhost:5173`
2. Enter a note name and press **Go to Note**
3. If the note doesn't exist, choose public or protected and create it
4. Start typing — changes save automatically

## License

MIT
