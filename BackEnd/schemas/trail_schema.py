#Contém os schemas da tabela de trilhas
from typing import Optional, List
from pydantic import BaseModel as SchemaBaseModel
from sqlalchemy import LargeBinary



class TrailSchema(SchemaBaseModel):
    id: Optional[int] = None
    nome: str
    desc: str
    focal_point: str
    criador_trilha: int
    carga_horaria: int
    conteudo: str
    image_trail: Optional [str]

