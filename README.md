# Backlog Hero

Backlog Hero is a social game-library tracker for discovering games, organizing a
personal backlog, tracking progress, and connecting with other players. The
application is built with Node.js, Express, Handlebars, and MongoDB.

## Features

- Account registration and password-based login
- Steam OpenID and Google OAuth sign-in
- Personal game library with backlog, playing, completed, and other statuses
- Ratings, playtime tracking, comments, and library activity
- Game search and discovery through IGDB, including trending and popular games
- Steam library import and playtime synchronization
- Optional Xbox and PlayStation Network library synchronization
- Profiles with avatars, bios, display names, and favorite games
- Friends, friend requests, and friend activity
- Community posts with flair, game tags, photos, voting, search, and comments
- General chat and group chats
- Achievements, statistics, recommendations, and gaming news
- Responsive dark-themed interface with Handlebars views and a Plexus background
- `/health` endpoint for deployment monitoring

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js |
| Web server | Express 4 |
| Views | Handlebars (`express-handlebars`) |
| Database | MongoDB with Mongoose |
| Sessions | `express-session` and `connect-mongo` |
| Authentication | bcryptjs, Passport, Steam OpenID, Google OAuth |
| Game data | IGDB through Twitch OAuth, Steam Web API |
| Frontend | HTML, CSS, JavaScript, Bootstrap 5 |

## Project Structure

```text
Backlog Hero/
├── model/                 # Mongoose models, database connection, and seed scripts
│   ├── db.js
│   ├── User.js
│   ├── Game.js
│   ├── LibraryEntry.js
│   ├── Post.js
│   ├── Message.js
│   ├── GroupChat.js
│   ├── Feedback.js
│   ├── seed.js
│   └── seed-posts.js
├── public/                # CSS, browser scripts, and image assets
├── views/                 # Handlebars pages and layouts
├── tests/                 # Automated tests
├── server.js              # Express application and route definitions
├── package.json
└── README.md
```

## Requirements

- Node.js 14 or newer
- npm
- MongoDB, either local or MongoDB Atlas

External API credentials are optional for the basic application, but are required
for the integrations that use them.

## Local Setup

1. Open a terminal in the project directory:

   ```bash
   cd "Backlog Hero"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project directory. Start with the following
   minimum configuration:

   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/backlog-hero
   SESSION_SECRET=replace-with-a-long-random-value
   BASE_URL=http://localhost:3000
   ```

4. Start MongoDB if you are using a local installation.

5. Start the application:

   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000).

For development, `npm run dev` starts the same server. The current project does
not include a separate file-watching development server.

## Environment Variables

Keep credentials in `.env` or in the hosting provider's secret configuration.
Do not commit real secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Recommended | MongoDB connection string. Defaults to a local `backlog-hero` database. |
| `SESSION_SECRET` | Recommended | Secret used to sign sessions. Use a long random value outside local development. |
| `PORT` | No | HTTP port. Defaults to `3000`; Render supplies its own port. |
| `BASE_URL` | No | Public application URL used by OAuth callbacks. |
| `NODE_ENV` | No | Set to `production` for deployed environments. |
| `TWITCH_CLIENT_ID` | Optional | Twitch client ID used to request IGDB data. |
| `TWITCH_CLIENT_SECRET` | Optional | Twitch client secret used to request IGDB data. |
| `STEAM_API_KEY` | Optional | Steam Web API key for Steam library and playtime synchronization. |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret. |
| `XBL_API_KEY` | Optional | Xbox integration API key. |
| `PSN_NPSSO` | Optional | PlayStation Network authentication token. |
| `NEWS_API_KEY` | Optional | API key for gaming-news requests. |

When enabling Steam or Google login, configure the provider callback URLs to
match the routes below and the value of `BASE_URL`:

```text
/auth/steam/callback
/auth/google/callback
```

## Database Seeding

After MongoDB is available, populate the database with the included sample data:

```bash
npm run seed
```

The seed scripts create example users, games, library entries, and community
posts. Use the credentials defined by the seed files only in a local development
database, and never reuse them in production.

## Common Routes

### Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/login` | Login |
| `/register` | Registration |
| `/Dashboard` | Authenticated dashboard |
| `/library` | Personal library |
| `/search` | Game discovery |
| `/profile` | Current profile |
| `/friends` | Friends and friend requests |
| `/stats` | Gaming statistics |
| `/about` | About page |

### API groups

The server exposes JSON endpoints under `/api`, including:

- `/api/users` and `/api/auth` for accounts and sessions
- `/api/games` and `/api/igdb` for game discovery and game records
- `/api/library` for library entries and status filters
- `/api/friends` for friend relationships and activity
- `/api/posts` and `/api/reviews` for community content
- `/api/chat` for general and group chat
- `/api/steam`, `/api/integrations/xbox`, and `/api/integrations/psn`
  for platform synchronization
- `/api/feedback` for feedback management

Use the route definitions in `server.js` as the authoritative reference for
request bodies, authentication requirements, and response formats.

## Health Check

The server provides a lightweight health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{"status":"ok"}
```

## Deployment

The application can run as a Node web service on Render or a similar host.

Recommended settings:

- Build command: `npm install`
- Start command: `npm start`
- Set `NODE_ENV=production`
- Use a hosted MongoDB connection string
- Set a strong `SESSION_SECRET`
- Set `BASE_URL` to the deployed HTTPS URL
- Add only the external API credentials required by the enabled integrations

The `/health` endpoint can be used by a monitoring service. Free web-service
plans may suspend inactive services; an uptime monitor can reduce cold starts,
but it does not guarantee continuous availability.

## Testing

Run the included Steam friends test with:

```bash
node tests/test-steam-friends.js
```

The test may require a running application, a configured database, and valid
integration credentials depending on the scenario being exercised.

## Security Notes

- Never commit `.env` files, API keys, OAuth secrets, or production session
  secrets.
- Use HTTPS for deployed OAuth and session-based environments.
- Use a separate database for local seed data and production data.
- Rotate credentials if they are accidentally exposed.

