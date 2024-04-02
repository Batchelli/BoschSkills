#trecho para teste - comentar depois
# import sys
# default_path = "C:\\Users\\ari5ca\\Documents\\backEnd"
# sys.path.append(default_path)

from pydantic.v1 import BaseSettings
from sqlalchemy.orm import declarative_base
import aiomysql

class Settings(BaseSettings):
		"""
				Configurações gerais utilizadas em nossa aplicação!
		"""
		API_V1_STR: str = '/api/v1' #não precisar inserir via hard coding
		#coloca-se o banco que vai usar e o localhost, etscursos é o banco de dados
		DB_URL: str = 'mysql+aiomysql://root@127.0.0.1:3306/BoschSkills' #ideal serial user:password
		DBBaseModel = declarative_base() #serve para que os models herdem todos os recursos do sqlalchemy!
		class Config:
				case_sensitive = True #tudo maiúsculo manté tudo maiúsculo e vice-versa
settings = Settings() #declarando a variável aqui, em qualquer lugar que
#eu importar o arquivo terei acesso a essas configurações!


class SettingsForeign(BaseSettings):
		"""
				Configurações gerais utilizadas em nossa aplicação!
		"""
		API_V1_STR: str = '/api/v1' #não precisar inserir via hard coding
		#coloca-se o banco que vai usar e o localhost, etscursos é o banco de dados
		DB_URL: str = 'mysql+aiomysql://root@127.0.0.1:3306/BoschSkills' #ideal serial user:password
		DBBaseModel = declarative_base() #serve para que os models herdem todos os recursos do sqlalchemy!
		class Config:
				case_sensitive = True #tudo maiúsculo manté tudo maiúsculo e vice-versa
settingsForeign = SettingsForeign() #declarando a variável aqui, em qualquer lugar que
#eu importar o arquivo terei acesso a essas configurações!