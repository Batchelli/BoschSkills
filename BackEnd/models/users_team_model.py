#Se trata do models da tabela team
from core.configs import settings
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSON


class Team(settings.DBBaseModel):
    __tablename__ = "UsersTeam"
    id = Column(Integer, primary_key=True, autoincrement=True)
    team_id = Column(Integer, ForeignKey('CreateTeam.id'))
    user_edv = Column(JSON)

    
