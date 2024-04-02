#Se trata do models da tabela team
from core.configs import settings
from sqlalchemy import Column, Integer, ForeignKey, String

class Team(settings.DBBaseModel):
    __tablename__ = "Team"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_edv = Column(Integer, ForeignKey('Users.edv'))
    team_id = Column(Integer, ForeignKey('Team.id'))
    
