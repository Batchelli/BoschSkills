from typing import Optional, List
from pydantic import BaseModel as SchemaBaseModel

class CreateTeamSchema(SchemaBaseModel):
    id: Optional[int] = None
    lider: str
    team_name: str
    image_team: Optional [str]
 
