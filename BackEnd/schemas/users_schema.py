#Contém os schemas da tabela de usuários e também das suas sub tabelas
from typing import Optional
from pydantic import BaseModel as SchemaBaseModel

class UserSchema(SchemaBaseModel):
    id: Optional[int] = None
    name: str 
    edv : int
    email_user: str
    user_area : str
    focal_point:str 
    admin_email : str 
    percentage : float
    typeUser: str 
    is_activate : bool
    hashed_password : str
    image_user: Optional[str]
    class Config:
        from_attributes = True

class AdminSchema(SchemaBaseModel):
    id: Optional[int] = None
    name: str 
    edv : int
    email_user: str
    user_area : str
    typeUser: str 
    is_activate : bool
    hashed_password : str
    class Config:
        from_attributes = True

class LoginSchema(SchemaBaseModel):
    username : str
    password : str

class EmailSchema(SchemaBaseModel):
     email: str
     edv: int

class AutheticationCode(SchemaBaseModel):
    code: int


