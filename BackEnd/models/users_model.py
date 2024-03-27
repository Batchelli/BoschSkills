# import sys
# default_path = "C:\\Users\\ari5ca\\Desktop\\backEnd"
# sys.path.append(default_path)

#se trata do models da tabela Users bem como também suas sub tabelas
from pydantic import BaseModel
from core.configs import settings
from sqlalchemy import Column, Integer, String, Float, Boolean

class UserModel(settings.DBBaseModel):
    __tablename__ = "Users"
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    name: str = Column(String(100))
    edv: int = Column(Integer, unique=True)
    email_user : str = Column(String(200))
    user_area: str = Column(String(200))
    focal_point: str = Column(String(200))
    admin_email : str = Column(String(200))
    percentage: float  = Column(Float, default =  0.0)
    typeUser: str = Column(String(200))
    is_activate: bool = Column(Boolean, default=False)
    hashed_password : str = Column(String(200)) 
    image_user: str = Column (String(9000))

class UserLogin(BaseModel):
    username : str = Column(String(200))
    password : str = Column(String(200))

class Token(BaseModel):
    acess_token: str
    token_type: str

class User(BaseModel):
    username : str

class emailSender(BaseModel):
    email: str
    edv: int
    # sorteio: int

class AuthenticationCode(BaseModel):
    code: int




