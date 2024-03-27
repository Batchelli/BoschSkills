#Se trata do models da tabela Trails
from core.configs import settings
from sqlalchemy import Column, Integer, String, JSON, LargeBinary

class Trail(settings.DBBaseModel):
    __tablename__ = "Trails"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100))
    desc = Column(String(400))
    focal_point = Column(String(100))
    criador_trilha = Column(Integer)
    carga_horaria = Column(Integer)
    conteudo = Column (String(1000000000))
    image_trail = Column (String(9000))