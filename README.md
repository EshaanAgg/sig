# Sig

This is a simple user-friendly converter for Sigma rules. This project is designed to keep in sync with the `pySigma` project's backends. It aims to provide an easy-to-use interface for converting `SIGMA` rules.

## 🌟 Key Features

- Uses `MaterialUI` and `Tailwind` for styling
- Uses `React Toast` to show notification badges
- Uses `React Monaco Editor` to integrate live editing
- Built in error handling with the help of `SIGMA`
- Supports multiple backends through `pySigma`
- Continuously updated to stay in sync with `pySigma`

## 🚀 Getting Started

This project both has a [backend](./backend/) and [frontend](./ui/) component built on `Flask` and `React`. You can work on setting up both of them individually, or you can use [Docker Compose](https://docs.docker.com/compose/install/) directly.

### With Docker Compose

**Note**: Please make sure that the ports `3000` and `8000` are free on your system before proceeding as otherwise the docker images wouldn't be able to run.

You can run `docker compose up` in the terminal. The backend server would become live at `http:localhost:8000` and the frontend UI at `http:localhost:3000`.

## 📺 Video Demonstration

https://github.com/EshaanAgg/Deno-GPT/assets/96648934/7d986b85-a3f4-4a3d-9713-bc55565c30a4
