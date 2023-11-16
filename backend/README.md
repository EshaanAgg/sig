# Backend

This is a simple `Flask` server which provides the simple endpoints which are required by the frontend to do the conversion of the rules.

## 🌟 Key Features

- Supports multiple backends through `pySigma`
- Continuously updated to stay in sync with `pySigma`

## 🚀 Getting Started

### Without Docker:

We will be using `poetry` for the version and dependancy management.

```bash
poetry install
poetry run ./run.py
```

### With Docker:

```bash
docker build -t sig-backend
docker run -d -p 8000:8000 sig-backend
```
