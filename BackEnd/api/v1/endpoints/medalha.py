#se trata do models da tabela medalhas
from fastapi import APIRouter, status, Depends, HTTPException, Response, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from models.users_model import *
from models.trails_model import *
from schemas.trail_schema import TrailSchema
from core.deps import get_session
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.future import select
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import delete, cast, String, or_
from schemas.central_schema import CentralSchema
from models.central_model import Central
import base64
from schemas.prova_schema import *
from models.prova_model import *
from models.medalha_model import *
from schemas.medalha_schema import *
from sqlalchemy import or_, and_, func


router = APIRouter()



#Essa função adiciona uma nova medalha no banco de dados na tabela de medalhas
@router.post("/createMedalha", status_code = status.HTTP_201_CREATED, response_model= MedalhaSchema)
async def post_medalha(medalha: MedalhaSchema, db: AsyncSession = Depends(get_session)):

    new_medalha = Medalhas ( id = 0,
                        nome_medalha = medalha.nome_medalha,
                        desc_medalha = medalha.desc_medalha,
                        image_medalha = medalha.image_medalha,
                    
    )
    db.add(new_medalha)
    await db.commit()
    return new_medalha


#Rota para trocar a foto da medalha
#Esta função está destinada para atribuir uma foto a medalha no banco de dados, ou mudar a foto
@router.put('/updateMedalPhoto/{Medal_id}', response_model=MedalhaSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_medal_photo(Medal_id: int, updated_info: MedalhaSchema, db: AsyncSession = Depends(get_session)):
    """Update medal photo based on medal_id."""
    async with db as session:
        query = select(Medalhas).filter(Medalhas.id == Medal_id)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        
        if user_to_update:
            user_to_update.image_medalha = updated_info.image_medalha
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="trail not found")
        
        
#Permite o usuário ganhar sua medalha e registrar que já realizou a prova
@router.put('/updateUserMedal/{user}', response_model=CentralSchema, status_code=status.HTTP_202_ACCEPTED)
async def updateUserMedal(central_id: int, updated_info: CentralSchema, db: AsyncSession = Depends(get_session)):
    """This router is to the put the user e medal and test status """

    async with db as session:
        query = select(Central).filter(Central.id == central_id)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        if user_to_update:
            user_to_update.provaSituation = updated_info.provaSituation 
            user_to_update.id_medalha = updated_info.id_medalha
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="central not found")


#Retorna a medalha que contém o ID que foi declarado como parâmetro
@router.get('/medal/{id}')
async def get_idMedal(id: int, db: AsyncSession = Depends(get_session)):
    """This router get the medals"""
    async with db as session:
        query = select(Medalhas).filter(Medalhas.id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Medal not found"))
        

#Está função procura no banco de dados a medalha que foi passada como parâmetro, e deleta a mesma do banco 
@router.delete('/deleteMedal/{delMedal}', status_code=status.HTTP_200_OK)
async def delete_medal(delMedal: int, db: AsyncSession = Depends(get_session)):
    """This route is to delete a medal by ID"""

    # Check if the medal with the given ID exists
    existing_user = await db.execute(select(Medalhas).where(Medalhas.id == delMedal))
    user_to_delete = existing_user.scalar()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Medal not found")

    # Delete the medal
    await db.execute(delete(Medalhas).where(Medalhas.id == delMedal))
    await db.commit()

    return {"message": f"Medal with name: {delMedal} has been successfully deleted"}