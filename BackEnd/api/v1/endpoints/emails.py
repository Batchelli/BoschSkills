#Este arquivo contém todas as rotas que estão destinadas a interagir com o email corporativo dos usuários
from models.users_model import UserModel,emailSender
from schemas.users_schema import EmailSchema
from fastapi import APIRouter
import random
import smtplib

from typing import List, Union, Any
from fastapi import APIRouter, status, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from models.users_model import *
from schemas.users_schema import UserSchema, LoginSchema, EmailSchema
from core.deps import get_session
from passlib.hash import pbkdf2_sha256
from datetime import datetime, timedelta
from passlib.context import CryptContext
from decouple import config
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer

import smtplib
import jwt 


from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from passlib.hash import pbkdf2_sha256
from jose import JWTError, jwt
from datetime import datetime, timedelta

from fastapi.middleware.cors import CORSMiddleware

router = APIRouter()

#Esta funçao manda um email informativo sobre o acesso a plataforma
@router.post('/email')
async def send_message(emails: emailSender, db: AsyncSession = Depends(get_session)):

    async with db as session:
        query = select(UserModel).filter(UserModel.edv == emails.edv)
        result = await session.execute(query)
        user_edv = result.scalar_one_or_none()
        if user_edv:
            sorteio = random.randint(1000, 2000)
            AuthenticationCode.code = sorteio
            try:
                FROM = 'campinas.ets@br.bosch.com'
                email = emails.email
                SUBJECT = 'Verificação de usuário'
                TEXT = 'Prezado Usuário com o EDV: {} \n Este é o seu código de verificação para a alteração da sua senha na plataforma  Bosch Skills:\n\n{}'.format(emails.edv, sorteio) 
                TO = [email]
                message = 'Subject: {}\n\n{}\n\nFrom: {}\n\nTo: {}'.format(SUBJECT, TEXT, FROM, ", ".join(TO))
                messageUtf = message.encode('utf-8')
                print(message)
                with smtplib.SMTP('rb-smtp-auth.rbesz01.com', 25) as smtp:
                    smtp.ehlo()
                    smtp.starttls()
                    smtp.ehlo()
                    smtp.login('ct67ca@bosch.com','26INDUSTRIAconectada')
                    smtp.sendmail(FROM, TO, messageUtf)
                smtp.quit()      
                return {"sorteio" : sorteio}
            except Exception as e:
                print(e)
                print("Email: ", emails.email)
                print("Edv: ", emails.edv)
                print("sorteio:", sorteio)      
        else:
            raise(HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="edv not found"))

  
        
@router.get("/getcode")
async def get_code(db: AsyncSession = Depends(get_session)):
    return AuthenticationCode.code

        # if (emails.sorteio == sorteio):
        #     print("acesso liberado")
        # else:
        #     print("acesso negado")
 