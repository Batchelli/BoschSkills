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
import json


router = APIRouter()

async def get_prova_by_id(Prova_id: int, session: AsyncSession):
    query = select(Provas).filter(Provas.id == Prova_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()


#Essa função adiciona uma nova prova no banco de dados na tabela de provas
@router.post("/createProva", status_code = status.HTTP_201_CREATED, response_model= ProvaSchema)
async def post_prova(prova: ProvaSchema, db: AsyncSession = Depends(get_session)):

    new_prova = Provas ( id = 0,
                        nome_prova = prova.nome_prova,
                        criador_prova = prova.criador_prova,
                        conteudo_prova = prova.conteudo_prova,
                        valor_prova = prova.valor_prova,
                        tempoRealizar = prova.tempoRealizar,
                    
    )
    db.add(new_prova)
    await db.commit()
    return new_prova

#Retorna a prova que contém o ID que foi declarado como parâmetro
@router.get('/Prova/{id}')
async def get_idProva(id: int, percentage: int ,db: AsyncSession = Depends(get_session)):
    """This router get the edv's user"""
    async with db as session:
        query = select(Provas).filter(Provas.id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users and percentage == 100:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prova not found"))
        
        
#Esta função verifica se a resposta está certa        
# @router.get('/verificar_resposta/{id}')
# async def verificar_resposta(id: int, resposta: str, db: AsyncSession = Depends(get_session)):
#     # Buscar a resposta no campo conteudo_prova do banco de dados apenas para o ID especificado e com "respostaCerta":"sim"
#     prova = await db.execute(select(Provas).filter(Provas.id == id).filter(Provas.conteudo_prova.ilike(f"%{resposta}%")))
#     prova = prova.scalars().first()

#     if prova and '"respostaCerta":true' in prova.conteudo_prova:
#         return {"mensagem": "Resposta correta!"}
#     else:
#         raise HTTPException(status_code=404, detail="Resposta não encontrada ou não marcada como correta para o ID especificado no banco de dados.")
    



@router.get('/verificar_resposta')
async def verificar_resposta( resposta: str, db: AsyncSession = Depends(get_session)):
    # Buscar a resposta no campo conteudo_prova do banco de dados apenas para o ID especificado e com "respostaCerta":"sim"
    prova = await db.execute(select(Provas).filter(Provas.id == id).filter(Provas.conteudo_prova.ilike(f"%{resposta}%")))
    prova = prova.scalars().first()

    if resposta == "true":
        return {"mensagem": "Resposta correta!"}
    else:
        raise HTTPException(status_code=404, detail="Resposta não encontrada ou não marcada como correta.")

    # if prova and '"respostaCerta":true' in prova.conteudo_prova:
    #     return {"mensagem": "Resposta correta!"}
    # else:
    #     raise HTTPException(status_code=404, detail="Resposta não encontrada ou não marcada como correta para o ID especificado no banco de dados.")
    

        

#Rota que permite o usuário trocar as informações da prova sendo seu valor, tempo e seu conteudo 
@router.put('/updateProvaInfo/{prova_id}', response_model=ProvaSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_user_info(prova_id: int, updated_info: ProvaSchema, db: AsyncSession = Depends(get_session)):
    """Update test informations"""
    async with db as session:
        query = select(Provas).filter(Provas.id == prova_id)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        
        #Muda os campos valor, tempo e conteudo no banco de dados 
        if user_to_update:
            user_to_update.valor_prova = updated_info.valor_prova
            user_to_update.tempoRealizar = updated_info.tempoRealizar
            user_to_update.conteudo_prova = updated_info.conteudo_prova
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prova not found")
        
        

#Rota para trocar informações da prova
#Esta função está destinada para atribuir uma prova a trilha no banco de dados, ou mudar a prova
@router.put('/updateProva/{Trail_id}', response_model=TrailSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_trail_prova(Trail_id: int, updated_info: TrailSchema, db: AsyncSession = Depends(get_session)):
    """Update test in Trail based em ID."""
    async with db as session:
        query = select(Trail).filter(Trail.id == Trail_id)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        
        if user_to_update:
            user_to_update.id_prova = updated_info.id_prova
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="trail not found")
        
        
        
#Está função procura no banco de dados a trilha que foi passada como parâmetro, e deleta a mesma do banco 
@router.delete('/deleteProva/{delProva}', status_code=status.HTTP_200_OK)
async def delete_medal(delProva: int, db: AsyncSession = Depends(get_session)):
    """This route is to delete a test by id"""

    # Check if the user with the given edv exists
    existing_user = await db.execute(select(Provas).where(Provas.id == delProva))
    user_to_delete = existing_user.scalar()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Delete the user
    await db.execute(delete(Provas).where(Provas.id == delProva))
    await db.commit()

    return {"message": f"Prova with name: {delProva} has been successfully deleted"}