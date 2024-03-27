#Se trata do models da tabela create_team
from core.configs import settings
from sqlalchemy import Column, Integer, String

class CreateTeam(settings.DBBaseModel):
    __tablename__ = "CreateTeam"
    id = Column(Integer, primary_key=True, autoincrement=True)
    lider = Column(String(100))
    team_name = Column(String(100))
    image_team : str = Column (String(9000))


