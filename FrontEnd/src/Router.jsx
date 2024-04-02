import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

import { TypeProvider } from "./Auth.jsx"
import Central from "./Pages/admin/central/Central.jsx";

const ProtectedRoute = ({ element, allowedUserTypes }) => {
	const token = localStorage.getItem('token');
	if (!token) {
		return <Navigate to="/skills/login" />;
	} else {
		const decodedToken = jwtDecode(token);
		
		if (allowedUserTypes.includes(decodedToken.typeUser)) {
			return element;
		} else {
			return <Navigate to="/skills/hubTrilhas" />;
		}
	}

};



const Router = () => {
	return (
		<BrowserRouter>
			<TypeProvider>
				<Routes>
					<Route element={<LandingPage />} path="/" exact />
					<Route element={<Login />} path="/skills/login"/>
					<Route element={<Central />} path="/skills/central"/>

					<Route path="/skills/hubTrilhas" element={<ProtectedRoute element={<Hub />} allowedUserTypes={['SAdmin', 'Admin', 'User']} />} />
					<Route path="/skills/trilha" element={<ProtectedRoute element={<Trilha />} allowedUserTypes={['SAdmin', 'Admin', 'User']} />} />

					<Route path="/skills/singleregister" element={<ProtectedRoute element={<Cadastro />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/multiregister" element={<ProtectedRoute element={<CadMassa />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/adminregister" element={<ProtectedRoute element={<CadastroAdm />} allowedUserTypes={['SAdmin']} />} />

					<Route path="/skills/hubadmin" element={<ProtectedRoute element={<HubADM />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/hubcadastros" element={<ProtectedRoute element={<HubCad />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/hubtrilhasadm" element={<ProtectedRoute element={<HubTri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/trilhascriadas" element={<ProtectedRoute element={<HubTCri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/hubteam" element={<ProtectedRoute element={<HubTeam />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/teams" element={<ProtectedRoute element={<HubTeams />} allowedUserTypes={['SAdmin', 'Admin']} />} />

					<Route path="/skills/criartime" element={<ProtectedRoute element={<TurmaCri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/skills/criartrilha" element={<ProtectedRoute element={<MakeTri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
				</Routes>
			</TypeProvider>
		</BrowserRouter>
	);
};

export default Router;
