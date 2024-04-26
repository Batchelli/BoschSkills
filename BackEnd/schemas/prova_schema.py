#Contém os schemas da tabela de trilhas
from typing import Optional, List
from pydantic import BaseModel as SchemaBaseModel
from sqlalchemy import LargeBinary

class ProvaSchema(SchemaBaseModel):
    id: Optional[int] = None
    nome_prova: str
    criador_prova: str
    valor_prova: int
    tempoRealizar: int
    conteudo_prova: str
    valor_prova: int
    tempoRealizar: int

   
  

   
 