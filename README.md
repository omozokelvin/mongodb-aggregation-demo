<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Sponsors%20on%20Open%20Collective-41B883.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

This is a [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

---

## Project Setup

The most straightforward way to get this project up and running is by using **Docker Compose**.

### 🐳 With Docker Compose (Recommended)

Before you start, you'll need to set up your environment variables.

1.  **Copy the example environment file:**

    ```bash
    cp .env.sample .env
    ```

    You might then need to edit the `.env` file with your specific configurations (e.g., database credentials, API keys).

2.  Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

3.  **Start the application and any linked services:**
    ```bash
    $ docker-compose up --build
    ```
    This command will:
    - **Build** a Docker image for your application (if it doesn't exist or if changes are detected in your `Dockerfile`).
    - **Start** the NestJS application container.
    - Bring up any other services defined in your `docker-compose.yml` (like a database or message queue).

Your application will typically be accessible in your browser at `http://localhost:3000` (or the port you've configured in `docker-compose.yml`). For development, thanks to the `volumes` and `command` settings in `docker-compose.yml`, your code changes will hot-reload without needing to restart the containers.

To stop the services and remove containers:

```bash
$ docker-compose down
```
