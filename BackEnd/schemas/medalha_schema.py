#Contém os schemas da tabela de trilhas
from typing import Optional, List
from pydantic import BaseModel as SchemaBaseModel
from sqlalchemy import Column, Integer, String, JSON, LargeBinary

class MedalhaSchema(SchemaBaseModel):
    id: Optional[int] = None
    nome_medalha: str
    desc_medalha: str
    image_medalha: str


   

   
  