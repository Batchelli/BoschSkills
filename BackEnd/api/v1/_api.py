from fastapi import APIRouter 
from api.v1.endpoints import admin, teams, users, emails, trail, central

api_router = APIRouter()
api_router.include_router(users.router, prefix='/users', tags=["users"])
api_router.include_router(emails.router, prefix='/email', tags=["emails"])
api_router.include_router(admin.router, prefix='/admin', tags=["Administrador"])
api_router.include_router(trail.router, prefix='/trail', tags=["createTrails"])
api_router.include_router(teams.router, prefix='/turmas', tags=["turmas"])

api_router.include_router(central.router, prefix='/central', tags=["Centralizado"])

#Este arquivo contém todas as rotas da API