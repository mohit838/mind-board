# Mind Board

A React-based project built with Vite, TypeScript, Tailwind CSS, and ESLint.

## Setup

### Local Development

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified in your Vite config).

### Docker Setup

To run the project using Docker Compose, follow these steps:

1. Ensure Docker and Docker Compose are installed on your machine.

2. Build and start the services:

   ```bash
   docker-compose up -d
   ```

   This will:

   - Build the `frontend` service using the provided `Dockerfile`.
   - Start the `frontend` service on port `9191`.
   - Start a `redis` service (Redis Stack) on port `6379` (Redis) and `8001` (RedisInsight).

3. Access the application:

   - Frontend: Open your browser and navigate to `http://localhost:9191`.
   - RedisInsight (Redis GUI): Open your browser and navigate to `http://localhost:8001`.

4. To stop the services, run:

   ```bash
   docker-compose down
   ```

5. Stop and remove volumes, run:

   ```bash
   docker-compose down -v
   ```

### Docker Compose File

The `docker-compose.yml` file is configured as follows:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: build
    ports:
      - '9191:9191'
    environment:
      - NODE_ENV=production
    volumes:
      - app_dist:/app/dist
    command: ['npm', 'run', 'preview']
    restart: always

  redis:
    image: redis/redis-stack:latest
    container_name: redis-stack
    ports:
      - '6379:6379'
      - '8001:8001'
    volumes:
      - redis_data:/data
    restart: always

volumes:
  app_dist:
  redis_data:
```

### Notes

- The `frontend` service is built using the `Dockerfile` and runs the production build of the app.
- The `redis` service provides a Redis Stack instance with RedisInsight for monitoring.
- Data for Redis is persisted in a Docker volume (`redis_data`) to ensure it is not lost when the container restarts.
