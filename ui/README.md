# UI

This folder contains all the UI source code that is required to run the project. It is built with React.

## 🌟 Key Features

- Uses `MaterialUI` and `Tailwind` for styling
- Uses `React Monaco Editor` to integrate live editing.

## 🚀 Getting Started

Make sure that the backend is running on the port `8000` before you start to run this client. Also make a copy of the sample `.env` from the `.sample.env` by running the command `cp .sample.env .env`.

### Without Docker

1. Install the dependencies with `npm install`.
2. To start the development server, run `npm start`.

### With Docker

```bash
docker build -t sig-ui
docker run -d -p 3000:3000 sig-ui
```
