#Neste arquivo temos todas as funções da aplicação que estão relacionadas com os administradores
import pandas as pd
from io import BytesIO
from fastapi import File, UploadFile, HTTPException, APIRouter, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session as BaseSession
from passlib.hash import pbkdf2_sha256
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from core.deps import get_session

from models.users_model import *
from schemas.users_schema import *

router = APIRouter()

metadata = MetaData()


colaboradores = Table(
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
    Column('hashed_password', String)
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

# Use run_sync() to create tables synchronously


# Now you can use async_session to create async sessions

#Função para criptografar a senha dos usuários
def password_encrypt(password):
    """Function to password """
    password = str(password)
    return pbkdf2_sha256.hash(password)

#Função para ler todas as seguintes colunas de um arquivo excel:
def lerXml(df):
    df['hashed_password'] = df['edv'].apply(password_encrypt)
    df['is_activate'] = True
    df['percentage'] = 0
    df['typeUser'] = "user"
    print(df)
    return df

#Essa função faz a leitura do arquivo excel e insere no banco os novos usuários que existem nele
@router.post("/cadXml/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    """The fuction is to save a informations excel in data base"""
    try:
        content = await file.read()
        content_io = BytesIO(content)
        df = pd.read_excel(content_io)
        print(df)

        df_processed = lerXml(df)
        print("arquivo recebido", df_processed)

        async with async_session() as session:
            print("gioabaaaaa")
            # Iniciar uma transação
            async with session.begin():
                # Inserir dados no banco de dados
                for _, row in df_processed.iterrows():
                    #Faz a verificação se algum edv da planilha já existe no banco de dados
                    user_exists = await session.execute(select(colaboradores).where(colaboradores.c.edv == row['edv']))
                    # user_exists ['image_user'] = ""
                    #se não existir ele insere os usuários no banco de dados
                    if not user_exists.scalar_one_or_none():
                        user = colaboradores.insert().values(
                            name=row['name'],
                            edv=row['edv'],
                            email_user=row['email_user'],
                            user_area=row['user_area'],
                            focal_point=row['focal_point'],
                            admin_email=row['admin_email'],
                            percentage=row['percentage'],
                            typeUser=row['typeUser'],
                            is_activate=row['is_activate'],
                            hashed_password=row['hashed_password'],
                            # image_user=row['']
                            
                           
                        )
                        await session.execute(user)
                        print("tabela", colaboradores)
                        
                    else:
                        return JSONResponse(content={"message": f"The user with the edv: {row['edv']} already exists in database, please remove it from the table to be added to the new users"}, status_code=200)
                            
        return JSONResponse(content={"message": "Archive process sucess"}, status_code=200)
    except Exception as e:
        return HTTPException(detail=str(e), status_code=500)

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
        df.rename(columns={'name': 'name', 'edv': 'edv', 'user_area': 'user_area', 'focal_point': 'focal_point', 'admin_email': 'admin_email'}, inplace=True)
        print(df.to_dict(orient='records'))
        
        return df.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=500)
    
#Faz o registro de apenas um usuário por vez na plataforma
@router.post ('/singleRegisterUser', status_code = status.HTTP_201_CREATED, response_model= UserSchema)
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
                         typeUser = "User",
                         is_activate = False,
                         hashed_password = criptografia,
    )
    #Faz a inserção do usuário no banco
    db.add(new_user)
    await db.commit()
    return new_user

#Faz o registro de um usuário administrador na plataforma
@router.post ('/singleRegisterAdmin', status_code = status.HTTP_201_CREATED, response_model= AdminSchema)
async def post_user(user: AdminSchema, db: AsyncSession = Depends(get_session)):
    criptografia = password_encrypt(user.edv)
    existing_user = await db.execute(select(UserModel).filter(UserModel.edv == user.edv))
    if existing_user.scalar():
        print("tem")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="O EDV já esta em uso")

    new_user = UserModel ( id = 0,
                         name = user.name,
                         edv = user.edv,
                         email_user = user.email_user,
                         user_area = user.user_area,
                         typeUser = "Admin",
                         is_activate = user.is_activate,
                         hashed_password = criptografia,
    )

    db.add(new_user)
    await db.commit()
    return new_user


