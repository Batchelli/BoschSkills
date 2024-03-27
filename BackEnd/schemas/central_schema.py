from typing import Optional, List
from pydantic import BaseModel as SchemaBaseModel

class CentralSchema(SchemaBaseModel):
    id: Optional[int] = None
    user_edv: int
    trail_id: int
    team_id: int
    percentage: int
  
