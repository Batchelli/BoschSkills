from fastapi import APIRouter, status, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from models.users_model import *
from models.trails_model import *
from models.create_team_model import *
from models.team_model import *

from schemas.create_team_schema import *
from schemas.team_schema import *
from sqlalchemy import delete

from core.deps import get_session

from fastapi import  Depends, HTTPException
from sqlalchemy.future import select

router = APIRouter()
#Cria um novo time no banco de dados
@router.post("/createTeams", status_code = status.HTTP_201_CREATED, response_model= CreateTeamSchema)
async def post_turmas(create: CreateTeamSchema, db: AsyncSession = Depends(get_session)):
    """This fuction is to create new trail"""
    new_turma = CreateTeam ( 
                        id = 0,
                        lider = create.lider,
                        team_name = create.team_name,
    )
    db.add(new_turma)
    await db.commit()
    return new_turma

@router.post("/teams/")
async def create_team_entry(data: TeamSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:

        # Verificar se o usuário existe
        user = await get_userEdv(data.user_edv, session)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Verificar se o time existe
        team = await get_created_team_by_id(data.team_id, session)
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        # Criar a entrada na tabela Team
        team_entry = Team(
            user_edv=data.user_edv,
            team_id=data.team_id,
        )
        session.add(team_entry)
        await session.commit()

        return {"message": "Central entry created successfully"}

async def get_userEdv(user_edv: str, session: AsyncSession):
    query = select(UserModel).filter(UserModel.edv == user_edv)
    result = await session.execute(query)
    return result.scalar_one_or_none()

async def get_created_team_by_id(team_id: int, session: AsyncSession):
    query = select(CreateTeam).filter(CreateTeam.id == team_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()

#Rota para trocar a foto do time
@router.put('/updateTeamPhoto/{team_id}', response_model=CreateTeamSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_team_photo(team_id: int, updated_info: CreateTeamSchema, db: AsyncSession = Depends(get_session)):
    """Update team photo based on team_id."""
    async with db as session:
        #Seleciona na banco o usuario desejado com base em seu ID
        query = select(CreateTeam).filter(CreateTeam.id == team_id)
        result = await session.execute(query)
        user_to_update = result.scalar_one_or_none()
        #Muda o campo de imagem atualizando com o novo link
        if user_to_update:
            user_to_update.image_team = updated_info.image_team
            await session.commit()
            return user_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")
        


@router.put('/updateTeam/{id}', response_model=TeamSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_edv(id: int, team: TeamSchema, db: AsyncSession = Depends(get_session)):
    """This router is to update the team by ID"""
    async with db as session:
        query = select(Team).filter(Team.id == id)
        result = await session.execute(query)
        team_to_update = result.scalars().first()

        if team_to_update:
            team_to_update.team_id = team.team_id
            team_to_update.user_edv = team.user_edv
            await session.commit()
            return team_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found with the provided ID")
        
@router.put('/updateCTeam/{id}', response_model=CreateTeamSchema, status_code=status.HTTP_202_ACCEPTED)
async def update_edv(id: int, cTeam: CreateTeamSchema, db: AsyncSession = Depends(get_session)):
    """This router is to update the team by ID"""
    async with db as session:
        query = select(CreateTeam).filter(CreateTeam.id == id)
        result = await session.execute(query)
        cteam_to_update = result.scalars().first()

        if cteam_to_update:
            cteam_to_update.lider = cTeam.lider
            cteam_to_update.team_name = cTeam.team_name
            await session.commit()
            return cteam_to_update
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found with the provided ID")

@router.get('/allTeams', response_model=List[TeamSchema])
async def get_centrals(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Team)
        result = await session.execute(query)
        centrals: List[Team] = result.scalars().all()
        return centrals
    
@router.get('/allCTeams', response_model=List[CreateTeamSchema])
async def get_centrals(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(CreateTeam)
        result = await session.execute(query)
        centrals: List[CreateTeam] = result.scalars().all()
        return centrals

@router.get('/createdTeams/{id}')
async def get_idcTeams(id: int, db: AsyncSession = Depends(get_session)):
    """This router get the edv's user"""
    async with db as session:
        query = select(CreateTeam).filter(CreateTeam.id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found"))
        
@router.get('/teamsId/{id}')
async def get_idTeams(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Team).filter(Team.team_id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found"))
        
@router.get('/teamsEdv/{edv}')
async def get_edvTeams(edv: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Team).filter(Team.user_edv == edv)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Edv not found"))
        
@router.delete('/deleteCTeam/{id}', status_code=status.HTTP_200_OK)
async def delete_created_team(id: int, db: AsyncSession = Depends(get_session)):

    existing_user = await db.execute(select(CreateTeam).where(CreateTeam.id == id))
    user_to_delete = existing_user.scalar()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found")

    await db.execute(delete(CreateTeam).where(CreateTeam.id == id))
    await db.commit()

    return {"message": f"Central with id: {id} has been successfully deleted"}

@router.delete('/deleteTeam/{id}', status_code=status.HTTP_200_OK)
async def delete_team(id: int, db: AsyncSession = Depends(get_session)):

    existing_user = await db.execute(select(Team).where(Team.id == id))
    user_to_delete = existing_user.scalar()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found")

    await db.execute(delete(Team).where(Team.id == id))
    await db.commit()

    return {"message": f"Central with id: {id} has been successfully deleted"}


