import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/user/landingPage/LandingPage.jsx";
import Login from "./Pages/user/login/Login";
import Trilha from "./Pages/user/trilha/Trilha.jsx"

import Cadastro from "./Pages/admin/cadastros/cadastro/Cadastro"
import CadastroAdm from "./Pages/admin/cadastros/cadastro-Adm/CadastroAdm.jsx";
import CadMassa from "./Pages/admin/cadastros/cadMassa/CadMassa.jsx";

import Hub from "./Pages/user/hub/Hub";
import HubADM from "./Pages/admin/hubs/hub-ADM/HubADM.jsx";
import HubCad from "./Pages/admin/hubs/hub-CAD/HubCad.jsx";
import HubTri from "./Pages/admin/hubs/hub-TRI/HubTri.jsx";
import HubTCri from "./Pages/admin/hubs/hub-TCRI/HubTCri.jsx";
import HubTeam from "./Pages/admin/hubs/hub-TEAM/HubTeam.jsx";
import HubTeams from "./Pages/admin/hubs/hub-TEAMS/HubTeams.jsx";

import MakeTri from "./Pages/admin/makeTri/MakeTri.jsx";
import TurmaCri from "./Pages/admin/TurmaCri/TurmaCri.jsx";


const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<LandingPage />} path="/" exact />
				<Route element={<Login />} path="/login" exact />
				<Route element={<Hub />} path="/hubTrilhas" />
				<Route element={<Trilha />} path="/trilha" />

				<Route element={<Cadastro />} path="/cadastro" />
				<Route element={<CadastroAdm />} path="/cadastroadmin" />
				<Route element={<CadMassa />} path="/cadastroemmassa" />
	
				<Route element={<HubADM />} path="/admin" />
				<Route element={<HubCad />} path="/cadastros" />
				<Route element={<HubTri />} path="/trilhas" />
				<Route element={<HubTCri />} path="/trilhascriadas" />
				<Route element={<HubTeam/>} path="/team" />
				<Route element={<HubTeams/>} path="/teams" />

				<Route element={<TurmaCri/>} path="/criartime"/>
				<Route element={<MakeTri />} path="/criartrilha" />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
