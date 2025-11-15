## To start the docker
docker compose up --build

## To start the backend (If not using docker)
uvicorn main:app --reload --port 8000

## To start the frontend (If not using docker)
npm run dev

