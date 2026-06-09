# Docker Deployment — Solven Syntrix

## Structure

```
.
├── html/               Next.js source code
├── .env                Environment variables (never commit this)
├── Dockerfile          Multi-stage build
├── docker-compose.yml  Service definition
└── .github/workflows/  CI/CD pipeline
```

## First-time setup on server

```bash
# 1. Clone the repo
git clone git@github.com:ORG/REPO.git /home/solvensyntrix/www/solvensyntrix.com
cd /home/solvensyntrix/www/solvensyntrix.com

# 2. Create and fill in .env
cp html/.env.example .env
nano .env

# 3. Build and start
docker compose build
docker compose up -d
```

## Day-to-day commands

```bash
# Rebuild after code changes
docker compose down && docker compose build --no-cache && docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

## GitHub Actions

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml`.

Required secrets in GitHub repo settings:
- `SERVER_HOST` — server IP
- `SERVER_USER` — `solvensyntrix`
- `SERVER_SSH_KEY` — private SSH key
