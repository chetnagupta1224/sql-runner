from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router  # import router

app = FastAPI(title="SQL Runner API")

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API router
app.include_router(router)
