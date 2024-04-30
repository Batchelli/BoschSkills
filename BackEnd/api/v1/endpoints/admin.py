#Neste arquivo temos todas as funções da aplicação que estão relacionadas com os administradores
import pandas as pd
from io import BytesIO
from fastapi import File, UploadFile, HTTPException, APIRouter, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean, Float, update
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session as BaseSession
from passlib.hash import pbkdf2_sha256
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from core.deps import get_session
import re
from models.users_model import *
from schemas.users_schema import *

router = APIRouter()

metadata = MetaData()


users = Table(
    'users', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
    Column('edv', String),
    Column('email_user', String),
    Column('user_area', String),
    Column('focal_point', String),
    Column('admin_email', String),
    Column('percentage', Float),
    Column('typeUser', String),
    Column('is_activate', Boolean),
    Column('hashed_password', String),
    Column('image_user', String)
)

import databases

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

db = databases.Database("mysql+aiomysql://root@127.0.0.1:3306/BoschSkills")

async_engine = create_async_engine(str(db.url), echo=True)

# Define sessionmaker with AsyncSession
async_session = sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)


#Função para criptografar a senha dos usuários
def password_encrypt(password):
    """Function to password """
    password = str(password)
    return pbkdf2_sha256.hash(password)

#Função para ler todas as seguintes colunas de um arquivo excel:
def lerXml(df):
    df['hashed_password'] = df['Edv'].apply(password_encrypt)
    print(df)
    return df

#Faz o registro de apenas um usuário por vez na plataforma
@router.post ('/singleRegister', status_code = status.HTTP_201_CREATED, response_model= UserSchema)
async def post_user(user: UserSchema, db: AsyncSession = Depends(get_session)):
    """This route is to create a new user"""
    #Criptografa a senha do usuário, que no primeiro acesso é o edv
    criptografia = password_encrypt(user.edv)
    #Verifica se o EDV de usuário já existe
    existing_user = await db.execute(select(UserModel).filter(UserModel.edv == user.edv))
    if existing_user.scalar():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="O EDV já esta em uso")

    new_user = UserModel ( id = 0,
                         name = user.name,
                         edv = user.edv,
                         email_user = user.email_user,
                         user_area = user.user_area,
                         focal_point= user.focal_point,
                         admin_email = user.admin_email,
                         percentage = user.percentage,
                         typeUser = user.typeUser,
                         is_activate = False,
                         hashed_password = criptografia,
    )
    #Faz a inserção do usuário no banco
    db.add(new_user)
    await db.commit()
    return new_user

#Essa função faz a leitura do arquivo excel e insere no banco os novos usuários que existem nele
@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        content_io = BytesIO(content)
        df = pd.read_excel(content_io)

        df_processed = lerXml(df)

        async with async_session() as session:
            async with session.begin():
                for _, row in df_processed.iterrows(): 
                    if not re.match(r'^\d{8}$', str(row['Edv'])):
                        return JSONResponse(content={"error": "O EDV deve conter exatamente 8 dígitos"}, status_code=400)

                    user = await session.execute(select(users).where(users.c.edv == row['Edv']))
                    existing_user = user.fetchone()

                    if existing_user:
                        existing_user_data = dict(existing_user)
                        update_data = {column: row[column] for column in df_processed.columns if column in existing_user_data and existing_user_data[column] != row[column]}

                        if update_data:
                            await session.execute(update(users).where(users.c.edv == row['Edv']).values(**update_data))

                    else:
                        await session.execute(users.insert().values(
                            name=row['Nome'],
                            edv=row['Edv'],
                            user_area=row['Area'],
                            focal_point=row['Focal_Point'],
                            admin_email=row['Email_Gestor'],
                            hashed_password=row['hashed_password'],
                            typeUser='User',
                            is_activate=0,
                            percentage=0,
                            email_user='',
                            image_user='',
                        ))
            await session.commit()

        return JSONResponse(content={"message": "Arquivo processado com sucesso"}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    

#Exibe todas as informações contidas na planilha do excel para que possa ser feita a visualização antes de enviar
@router.post("/cadXml/previewfile/")
async def redArchive(file: UploadFile = File(...)):
    try:
        content = await file.read()
        content_io = BytesIO(content)
        df = pd.read_excel(content_io)
        df.columns = df.columns.str.lower()
        df['is_activate'] = True
        df['is_activate'] = df['is_activate'].astype(bool)
        df.rename(columns={'name': 'Nome', 'edv': 'Edv', 'user_area': 'Area', 'focal_point': 'Focal_Point', 'admin_email': 'Email_Gestor'}, inplace=True)
        print(df.to_dict(orient='records'))
        
        return df.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=500)
    
