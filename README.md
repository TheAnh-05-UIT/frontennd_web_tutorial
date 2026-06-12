# DevOps Tutorial Platform

A full-stack web application for learning DevOps through tutorials, projects, and roadmaps.

## Tech Stack

### Frontend
- **React 18** + **TypeScript** — UI framework
- **Vite** — Build tool & dev server
- **Tailwind CSS** — Styling
- **React Router** — Client-side routing
- **JWT** — Authentication

### Backend
- **Spring Boot 3** (Java 21) — REST API
- **Spring Security** + **JWT** — Authentication & authorization
- **Spring Data JPA** + **Hibernate** — ORM
- **MySQL 8** — Database
- **Bean Validation** — Request validation

### DevOps
- **Docker** — Containerization (multi-stage builds)
- **Docker Compose** — Multi-service orchestration
- **Nginx** — Reverse proxy & SPA serving

## Project Structure

```
├── docker-compose.yml         # Multi-service orchestration
├── javabackend/               # Spring Boot REST API
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/devops/javabackend/
│       ├── controller/        # REST controllers
│       ├── dto/               # Request/Response DTOs
│       ├── model/             # JPA entities
│       ├── repository/        # Data access layer
│       ├── security/          # JWT auth, filters, config
│       └── service/           # Business logic
└── project/                   # React frontend
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── components/        # Reusable UI components
        ├── context/           # React contexts (Auth, App)
        ├── hooks/             # Custom hooks
        ├── pages/             # Page components
        ├── services/          # API client
        └── types/             # TypeScript types
```

## Getting Started

### Prerequisites
- **Java 21** (or Docker)
- **Node.js 20+** (or Docker)
- **MySQL 8** (or Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/TheAnh-05-UIT/devops-tutorial.git
cd devops-tutorial

# Copy and configure environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# Access the app at http://localhost
```

### Option 2: Local Development

**Backend:**
```bash
cd javabackend

# Ensure MySQL is running on localhost:3306
# Database: devopsbuilder

./mvnw spring-boot:run
# Backend runs at http://localhost:8080
```

**Frontend:**
```bash
cd project
cp .env.example .env

npm install
npm run dev
# Frontend runs at http://localhost:5173
```

## Environment Variables

### Backend (`application.properties` / env vars)

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_URL` | `jdbc:mysql://localhost:3306/devopsbuilder` | Database JDBC URL |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | `123456` | Database password |
| `JWT_SECRET` | (auto-generated) | JWT signing secret (Base64) |
| `JWT_EXPIRATION` | `86400000` | Token expiration (ms) |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Allowed CORS origins |

### Frontend (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8080/api/v1` | Backend API base URL |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/login` | Public | User login |
| POST | `/api/v1/auth/register` | Public | User registration |
| GET | `/api/v1/auth/me` | Bearer | Get current user profile |
| GET | `/api/v1/tutorials` | Public | List all tutorials |
| GET | `/api/v1/tutorials/:id` | Public | Get tutorial by ID |
| POST | `/api/v1/tutorials` | Admin | Create tutorial |
| PUT | `/api/v1/tutorials/:id` | Admin | Update tutorial |
| DELETE | `/api/v1/tutorials/:id` | Admin | Delete tutorial |
| GET | `/api/v1/projects` | Public | List all projects |
| GET | `/api/v1/roadmaps` | Public | List all roadmaps |
| GET | `/api/v1/users` | Public | List all users |

## License

MIT
