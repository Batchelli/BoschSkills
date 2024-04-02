import sys
default_path = "C:\\Users\\ari5ca\\Desktop\\BoschSkills\\BackEnd"
sys.path.append(default_path)

#Todas as models das tabelas do banco de dados ficam dentro desse arquivo
from models.users_model import *
from models.trails_model import *
from models.create_team_model import *
from models.central_model import *