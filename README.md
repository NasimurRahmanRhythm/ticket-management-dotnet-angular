# Ticket Management System

A small full-stack ticket tracker built with **ASP.NET Core Web API**, **Entity Framework Core**, **SQL Server** and **Angular**. Users register, sign in with a JWT, and manage their own support tickets: create, view, edit, filter by status and delete them.

The goal of the project is to show a clean, layered, production-style codebase at a small scale.

## Tech stack

| Layer    | Technology |
|----------|------------|
| API      | ASP.NET Core 10 Web API (controllers), C# |
| Data     | Entity Framework Core 10 (code-first, migrations), SQL Server / LocalDB |
| Auth     | JWT bearer tokens, ASP.NET Core Identity `PasswordHasher` |
| Docs     | Swagger / OpenAPI (Swashbuckle) with a JWT "Authorize" button |
| Frontend | Angular 22 (standalone components, signals, zoneless), Reactive Forms, SCSS |

## Features

- User registration and login with hashed passwords and JWT authentication
- Per-user tickets: each user only sees and manages their own tickets
- Full ticket CRUD with title, description, status (`Open`, `InProgress`, `Closed`) and priority (`Low`, `Medium`, `High`)
- Status filter on the ticket list (`GET /api/tickets?status=Open`)
- Request validation with `400 ValidationProblemDetails` responses
- Global exception handling middleware returning consistent `ProblemDetails` JSON
- Enums stored as strings in the database, Fluent API entity configuration
- Angular HTTP interceptor that attaches the token and redirects to login on `401`
- Route guards for authenticated and guest-only pages
- Responsive, lightweight UI with no component library

## Folder structure

```
ticket-management-system/
├── backend/
│   ├── TicketManagement.slnx
│   └── src/TicketManagement.Api/
│       ├── Controllers/          AuthController, TicketsController
│       ├── Data/
│       │   ├── Configurations/   Fluent API entity configurations
│       │   ├── Converters/       UTC DateTime value converter
│       │   ├── Migrations/       InitialCreate migration
│       │   └── ApplicationDbContext.cs
│       ├── DTOs/                 Auth and Ticket request/response models
│       ├── Entities/             User, Ticket, TicketStatus, TicketPriority
│       ├── Exceptions/           Domain exceptions mapped to HTTP status codes
│       ├── Extensions/           DI, authentication, Swagger and pipeline setup
│       ├── Mappings/             Entity-to-DTO mapping
│       ├── Middleware/           Global exception handling
│       ├── Options/              Strongly typed configuration (JWT, CORS)
│       ├── Services/             Interfaces/ + implementations
│       └── Program.cs
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── core/             auth service, interceptor, guards, models, layout
│       │   ├── features/
│       │   │   ├── auth/         login and register pages
│       │   │   └── tickets/      list, details and form pages, badges, filter bar, card, ticket service
│       │   └── shared/           alert, loading indicator, form field error
│       └── environments/         API base URL per environment
├── .gitignore
└── README.md
```

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20.19+ (22 LTS or 24 recommended) and npm
- Angular CLI: `npm install -g @angular/cli`
- EF Core CLI: `dotnet tool install --global dotnet-ef`
- SQL Server: **LocalDB** (installed with SQL Server Express or Visual Studio) or any SQL Server instance

## Setup

### 1. Database

The connection string in `backend/src/TicketManagement.Api/appsettings.json` targets LocalDB:

```
Server=(localdb)\MSSQLLocalDB;Database=TicketManagementDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True
```

If you use a SQL Server Express instance instead, change `Server=` to `localhost\SQLEXPRESS` (or your instance name). You do **not** need to create the database manually: applying the migration creates `TicketManagementDb` and its tables.

```bash
cd backend/src/TicketManagement.Api
dotnet ef database update
```

### 2. JWT secret (user-secrets)

The JWT signing key is never committed. `appsettings.json` only contains a placeholder, and the API refuses to start until a key of at least 32 characters is configured. For local development, store it with user-secrets:

```bash
cd backend/src/TicketManagement.Api
dotnet user-secrets set "Jwt:SecretKey" "<a-random-string-of-at-least-32-characters>"
```

For other environments, provide the key with the `Jwt__SecretKey` environment variable or a secret store.

### 3. Run the backend

```bash
cd backend/src/TicketManagement.Api
dotnet run --launch-profile http
```

- API: http://localhost:5037
- Swagger UI: http://localhost:5037/swagger

### 4. Run the frontend

```bash
cd frontend
npm install
npm start
```

- App: http://localhost:4200

The API base URL is configured in `frontend/src/environments/environment*.ts`.

## API endpoints

| Method | Route                     | Auth | Description                          | Success | Errors             |
|--------|---------------------------|------|--------------------------------------|---------|--------------------|
| POST   | `/api/auth/register`      | No   | Create an account, returns a JWT     | 201     | 400, 409           |
| POST   | `/api/auth/login`         | No   | Log in, returns a JWT                | 200     | 400, 401           |
| GET    | `/api/tickets?status=Open`| Yes  | List own tickets, optional filter    | 200     | 400, 401           |
| GET    | `/api/tickets/{id}`       | Yes  | Get one own ticket                   | 200     | 401, 404           |
| POST   | `/api/tickets`            | Yes  | Create a ticket                      | 201     | 400, 401           |
| PUT    | `/api/tickets/{id}`       | Yes  | Update a ticket                      | 200     | 400, 401, 404      |
| DELETE | `/api/tickets/{id}`       | Yes  | Delete a ticket                      | 204     | 401, 404           |

Example request bodies:

```json
POST /api/tickets
{ "title": "Printer offline", "description": "Second floor printer does not respond.", "priority": "High" }

PUT /api/tickets/1
{ "title": "Printer offline", "description": "Fixed after restart.", "status": "Closed", "priority": "High" }
```

Errors use the RFC 9110 `ProblemDetails` format:

```json
{ "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5", "title": "Resource not found", "status": 404, "detail": "Ticket with id '42' was not found.", "traceId": "..." }
```

## Screenshots

> Screenshots coming soon.

| Login | Ticket list | Ticket details | Ticket form |
|-------|-------------|----------------|-------------|
| _todo_ | _todo_ | _todo_ | _todo_ |
