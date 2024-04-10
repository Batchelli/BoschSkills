#Este arquivo é responsável por criar as tabelas no banco de dados
import sys
default_path = "C:\\Users\\ct67ca\\Desktop\\Skills\\git-skills\\back"
sys.path.append(default_path)


from core.configs import settings
from core.database import engine
from models.trails_model import Trail
from models.create_team_model import CreateTeam
from models.users_team_model import Team
from models.users_model import User
from models.central_model import Central


async def create_tables() -> None:
    print('Criando as tabelas do DB...')
    async with engine.begin() as conn:
        # await conn.run_sync(settings.DBBaseModel.metadata.drop_all) #Excluir, caso elas ja existam

        await conn.run_sync(settings.DBBaseModel.metadata.create_all)#Cria as tabelas
    
    print("Tabelas criadas com sucesso...")
    await engine.dispose()

if __name__ == '__main__':
    import asyncio
    asyncio.run(create_tables())