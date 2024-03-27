
#Este arquivo contém todas as funções da aplicação que estão atribuidas ao usuário

from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, status
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.users_model import *
from schemas.users_schema import UserSchema
from core.deps import get_session
from passlib.hash import pbkdf2_sha256
from datetime import datetime, timedelta
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
import jwt 
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.hash import pbkdf2_sha256
from jose import JWTError, jwt
from datetime import datetime, timedelta

from sqlalchemy.orm import sessionmaker, Session as BaseSession
from sqlalchemy import delete


router = APIRouter()

SECRET_KEY = "q1w2e3r4"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#Função que é chamada ao longo do código para encriptar senhas
"""The project functions """
def password_encrypt(password):
    """Function to password """
    password = str(password)
    return pbkdf2_sha256.hash(password)

#Inicio das rotas POST
# Login endpoint, este endpoint verifica se o usuário realmente existe no banco, se sim ele gera um token de acesso que te permite entrar na plataforma
@router.post("/token")
async def login_for_access_token(login_request: UserLogin, db: AsyncSession = Depends(get_session)):
    """Create a acess token for the users"""
    user = await db.execute(select(UserModel).filter(UserModel.edv == login_request.username))
    db_user = user.scalar_one_or_none()
  
    if db_user and pbkdf2_sha256.verify(login_request.password, db_user.hashed_password):
        token_data = {"sub": login_request.username}
        access_token = create_access_token(token_data)
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
#Fim das rotas POST
    
#Inicio das rotas PUT
#Permite o usuário fazer trocar sua senha de primeiro acesso
@router.put('/updatePassword/{user_edv}', response_model=UserSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_edv(user: UserSchema, db: AsyncSession = Depends(get_session)):
    """This router is to the put the password"""
    #Criptografa a senha que foi 
    criptografia = password_encrypt(user.hashed_password)
    async with db as session:
        query = select(UserModel).filter(UserModel.edv == user.edv)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        if user_to_update:
            user_to_update.hashed_password = criptografia
            user_to_update.is_activate = user.is_activate 
            user_to_update.email_user = user.email_user
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="edv not found")
    
#Rota que permite o usuário trocar as suas informações que podem ser mudadas que são seu nome e seu EDV
@router.put('/updateUserInfo/{user_edv}', response_model=UserSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_user_info(user_edv: str, updated_info: UserSchema, db: AsyncSession = Depends(get_session)):
    """Update user information (name and email) based on user_edv."""
    async with db as session:
        query = select(UserModel).filter(UserModel.edv == user_edv)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        
        #Muda os campos nome e email no banco de dados 
        if user_to_update:
            user_to_update.name = updated_info.name
            user_to_update.email_user = updated_info.email_user
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="EDV not found")
        
        
#Rota destinada para o usuário escolher e trocar a foto do usuário
@router.put('/updateUserPhoto/{user_edv}', response_model=UserSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_user_photo(user_edv: str, updated_info: UserSchema, db: AsyncSession = Depends(get_session)):
    """Update user photo based on user_edv"""
    async with db as session:
        #Seleciona da tabela Users o usuário que tem o EDV que foi pesquisado pelo parâmetro e permite mudar seu campo imagem
        query = select(UserModel).filter(UserModel.edv == user_edv)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        
        if user_to_update:
            user_to_update.image_user = updated_info.image_user
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="EDV not found")
        
# Fim das rotas de put
                       
#Esta rota pega todos os usuários registrados no banco de dados
@router.get('/allUsers', response_model=List[UserSchema])
async def get_users(db: AsyncSession = Depends(get_session)):
    """This route to get all users"""
    async with db as session:
        query = select(UserModel)
        result = await session.execute(query)
        users: List[UserModel] = result.scalars().all()
        return users

    
#Inicio das rotas GET
@router.get('/user/{user_edv}')
#Get de usuários pelo EDV como parâmetro
async def get_userEdv(user_edv: str, db: AsyncSession = Depends(get_session)):
    """This router get the edv's user"""
    async with db as session:
        query = select(UserModel).filter(UserModel.edv == user_edv)
        result = await session.execute(query)
        user_edv = result.scalar_one_or_none()
        if user_edv:
            return user_edv
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="edv not found"))
#Cria um token de acesso que permite o usuário logar na plataforma
def create_access_token(data: dict):
    to_encode = data.copy()
    #Registra o tempo de expiração do token
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    #Criptografa o token de acesso
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
#Verifica se o token de acesso é válido
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency to get the current user with a valid token
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)):
    credentials_exception = HTTPException(status_code=401, detail="Invalid credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = {"sub": username}
    except JWTError:
        raise credentials_exception

    user = await db.execute(select(UserModel).filter(UserModel.edv == username))
    return user.scalar_one_or_none()

# Protected endpoint for testing
@router.get("/users/me")
async def read_users_me(current_user: UserModel = Depends(get_current_user)):
    return {"username": current_user}
    
#Pega todos os usuários que tem o focal point com o EDV declarado como parâmetro    
@router.get('/users/focal/{adminFocal}')
async def get_users_by_focalPoint(adminFocal: str, db: AsyncSession = Depends(get_session)): #Para acionar o jwt só precisa mudar esse Depends(get_session) para Depends(get_current_user)
    """This router get users by focal point"""
    async with db as session:
        #Seleciona a tabela e filtra que usuários tem o focal point que foi pesquisado
        query = select(UserModel).filter(UserModel.focal_point == adminFocal)
        result = await session.execute(query)
        #Para pegar todos os resultados
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="edv not found"))

#Pega todos os usuários que tem a área declarada como parâmetro    
@router.get('/users/{area}')
async def get_users_by_area(area: str, db: AsyncSession = Depends(get_session)):
    """This router get users in the area"""
    async with db as session:
        #Seleciona a tabela e filtra que usuários tem a área que foi pesquisada
        query = select(UserModel).filter(UserModel.user_area == area)
        result = await session.execute(query)
        #Para pegar todos os resultados
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Area not found"))
#Fim das rotas GET        

#Inicio das rotas DELETE
#Deleta usuários do banco de dados que tem o EDV passado como parâmetro
@router.delete('/deleteUser/{edv}', status_code=status.HTTP_200_OK)
async def delete_user_by_edv(edv: str, db: AsyncSession = Depends(get_session)):
    """This route is to delete a user by edv"""

    # Check if the user with the given edv exists
    existing_user = await db.execute(select(UserModel).where(UserModel.edv == edv))
    user_to_delete = existing_user.scalar()

    #Se não for possível encontrar o usuário ele retorna esta mensagem de erro
    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Deleta da tabela UserModel o usuário que tiver o EDV igual ao pesquisado e salva a alteração no banco
    await db.execute(delete(UserModel).where(UserModel.edv == edv))
    await db.commit()

    return {"message": f"User with edv: {edv} has been successfully deleted"}
#Fim das rotas DELETE