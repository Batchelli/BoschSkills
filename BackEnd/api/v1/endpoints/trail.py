#Este arquivo contém todas as funções relacionadas com as trilhas de aprendizagem sendo desde de a sua criação a sua edição
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


router = APIRouter()



#Essa função adiciona uma nova trilha no banco de dados na tabela de trilhas
@router.post("/createTrail", status_code = status.HTTP_201_CREATED, response_model= TrailSchema)
async def post_trail(trail: TrailSchema, db: AsyncSession = Depends(get_session)):

    new_trail = Trail ( id = 0,
                        nome = trail.nome,
                        desc = trail.desc,
                        focal_point= trail.focal_point,
                        criador_trilha = trail.criador_trilha,
                        carga_horaria = trail.carga_horaria,
                        conteudo = trail.conteudo,
                        image_trail= trail.image_trail,
                        id_prova= trail.id_prova
    )
    db.add(new_trail)
    await db.commit()
    return new_trail

#Ínicio das rotas de PUT
#Está função é destinada para o administrador poder mudar todas as seguintes informações da trilha: nome, descrição, focal point, carga horária e conteúdo
@router.put('/updateTrailInfo/{trail_id}', response_model=TrailSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_trail_info(trail_id: int, updated_info: TrailSchema, db: AsyncSession = Depends(get_session)):
    """Update user information (name and email) based on user_edv."""
    async with db as session:
        #Procura na tabela trilhas a trilha que tem o ID pesquisado
        query = select(Trail).filter(Trail.id == trail_id)
        result = await session.execute(query)
        trail_to_update = result.scalar_one_or_none()
        
        if trail_to_update:
            trail_to_update.nome = updated_info.nome
            trail_to_update.desc = updated_info.desc
            trail_to_update.focal_point = updated_info.focal_point
            trail_to_update.carga_horaria = updated_info.carga_horaria
            trail_to_update.conteudo = updated_info.conteudo
            await session.commit()
            return trail_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="EDV not found")
        

#Rota para trocar a foto do usuário
#Esta função está destinada para atribuir uma foto a trilha no banco de dados, ou mudar a foto
@router.put('/updateTrailPhoto/{Trail_id}', response_model=TrailSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_trail_photo(Trail_id: int, updated_info: TrailSchema, db: AsyncSession = Depends(get_session)):
    """Update user information (name and email) based on user_edv."""
    async with db as session:
        query = select(Trail).filter(Trail.id == Trail_id)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        
        if user_to_update:
            user_to_update.image_trail = updated_info.image_trail
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="trail not found")
        

        

#Retorna a trilha que contém o ID que foi declarado como parâmetro
@router.get('/trails/{id}')
async def get_idTrails(id: int, db: AsyncSession = Depends(get_session)):
    """This router get the edv's user"""
    async with db as session:
        query = select(Trail).filter(Trail.id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trail not found"))
        
#Retorna todas trilhas que tem o EDV do criador pesquisado pelo parâmetro
@router.get('/trails_creator/{creator}')
async def get_creatorTrails(creator: int, db: AsyncSession = Depends(get_session)):
    """This router get the edv's user"""
    async with db as session:
        query = select(Trail).filter(Trail.criador_trilha == creator)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Creator not found"))
        
#Retorna todas trilhas que tem o Focal Point pesquisado pelo parâmetro
@router.get('/trailsfocal/{focalPoint}')
async def get_focalPointTrails(focalPoint: str, db: AsyncSession = Depends(get_session)):
    """This router get the edv's user"""
    async with db as session:
        #Seleciona da tabela trilhas o campo focal_point e retona a coluna que tem o focal point que foi passado como parâmertro
        query = select(Trail).filter(Trail.focal_point == focalPoint) 
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Focal Point not found"))
        
#Retorna todas as trilhas em que o usuário que foi passado como parâmetro está cadastrado
@router.get('/userTrails/{userlogado}')
async def get_userTrails(userlogado: str, db: AsyncSession = Depends(get_session)):
    async with db as session:
        conditions = [Trail.usuarios.contains(user) for user in userlogado.split([userlogado])]
        query = select(Trail).filter(or_(*conditions))
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trails not found")

#Está função procura no banco de dados a trilha que foi passada como parâmetro, e deleta a mesma do banco 
@router.delete('/deleteTrail/{trail}', status_code=status.HTTP_200_OK)
async def delete_trail(delTrail: str, db: AsyncSession = Depends(get_session)):
    """This route is to delete a user by edv"""

    # Check if the user with the given edv exists
    existing_user = await db.execute(select(Trail).where(Trail.nome == delTrail))
    user_to_delete = existing_user.scalar()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Delete the user
    await db.execute(delete(Trail).where(Trail.nome == delTrail))
    await db.commit()

    return {"message": f"Trail with name: {delTrail} has been successfully deleted"}












