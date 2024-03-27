from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from models.users_model import *
from models.trails_model import *
from models.create_team_model import *
from models.central_model import *

from schemas.central_schema import *
from schemas.team_schema import *

from core.deps import get_session

router = APIRouter()

@router.post("/centralizer/")
async def create_central_entry(data: CentralSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:

        user = await get_userEdv(data.user_edv, session)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Verificar se a trilha existe
        trail = await get_trail_by_id(data.trail_id, session)
        if not trail:
            raise HTTPException(status_code=404, detail="Trail not found")

        # Verificar se o time existe
        team = await get_created_team_by_id(data.team_id, session)
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        # Criar a entrada na tabela Central
        central_entry = Central(
            user_edv=data.user_edv,
            trail_id=data.trail_id,
            team_id=data.team_id,
            percentage=data.percentage
        )
        session.add(central_entry)
        await session.commit()

        return {"message": "Central entry created successfully"}

async def get_userEdv(user_edv: str, session: AsyncSession):
    query = select(UserModel).filter(UserModel.edv == user_edv)
    result = await session.execute(query)
    return result.scalar_one_or_none()

async def get_trail_by_id(trail_id: int, session: AsyncSession):
    query = select(Trail).filter(Trail.id == trail_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()

async def get_created_team_by_id(team_id: int, session: AsyncSession):
    query = select(CreateTeam).filter(CreateTeam.id == team_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()

@router.post("/centralizedTeams/")
async def add_users_to_central(create_team_id: int, trail_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:

        create_team = await get_cteam_id(create_team_id, session)
        if not create_team:
            raise HTTPException(status_code=404, detail="Create team not found")

        team = await get_team_id(create_team.id, session)
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        team_users = await get_user_edv(create_team.id, session)

        if not team_users:
            raise HTTPException(status_code=404, detail="No users found in the team")

        for user in team_users:
            central_entry = Central(
                user_edv=user.edv,
                trail_id=trail_id,
                team_id=team.id,
                percentage=0 
            )
            session.add(central_entry)

        await session.commit()

        return {"message": "Users added to central successfully"}

async def get_cteam_id(create_team_id: int, session: AsyncSession):
    query = select(CreateTeam).filter(CreateTeam.id == create_team_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()

async def get_team_id(team_id: int, session: AsyncSession):
    query = select(Team).filter(Team.id == team_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()

async def get_user_edv(create_team_id: int, session: AsyncSession):
    query = select(UserModel).join(Team).filter(Team.user_edv == UserModel.edv, Team.team_id == create_team_id)
    result = await session.execute(query)
    return result.scalars().all()

@router.get('/allCentral', response_model=List[CentralSchema])
async def get_centrals(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Central)
        result = await session.execute(query)
        centrals: List[Central] = result.scalars().all()
        return centrals
        
@router.get('/centraTrail/{id}')
async def get_centralTrail(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Central).filter(Central.trail_id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trail not found"))
        
@router.get('/centraTeam/{id}')
async def get_centralTeam(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Central).filter(Central.team_id == id)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found"))
        
@router.get('/centraEdv/{edv}')
async def get_centralEdv(edv: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Central).filter(Central.user_edv == edv)
        result = await session.execute(query)
        users = result.scalars().all()
        if users:
            return users
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Edv not found"))

@router.delete('/deleteCentral/{id}', status_code=status.HTTP_200_OK)
async def delete_central(id: int, db: AsyncSession = Depends(get_session)):

    existing_user = await db.execute(select(Central).where(Central.id == id))
    user_to_delete = existing_user.scalar()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Central not found")

    await db.execute(delete(Central).where(Central.id == id))
    await db.commit()

    return {"message": f"Central with id: {id} has been successfully deleted"}