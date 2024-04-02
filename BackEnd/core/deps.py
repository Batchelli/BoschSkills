#trecho para teste - comentar depois
# import sys
# default_path = "C:\\Users\\ari5ca\\Desktop\\backEnd"
# sys.path.append(default_path)

from typing import Generator
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import Session

async def get_session() -> Generator:
    """Abre a conexão com o banco de dados, faz o uso e fecha a conexão"""
    session: AsyncSession = Session()
    try:
        yield session #tenta usar
    finally:
        await session.close() #fecha a sessão