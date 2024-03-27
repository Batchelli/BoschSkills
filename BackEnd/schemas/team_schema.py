from typing import Optional, List
from pydantic import BaseModel as SchemaBaseModel

class TeamSchema(SchemaBaseModel):
    id: Optional[int] = None
    team_id: int 
    user_edv: int 
    
