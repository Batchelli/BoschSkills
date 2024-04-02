
import styles from "./CadastroAdm.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../../../components/navbar/Navbar";
import Input from "../../../../components/inputs/inputText/Input";

import { FaUser, FaUserTie } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";

import api from "../../../../api";

import lSkills from "../../../../components/assets/logoSkill-B.svg"

const CadastroAdm = () => {
	const navigate = useNavigate();
	const [nome, setNome] = useState("");
	const [edv, setEdv] = useState("");
	const [area, setArea] = useState("");
	const [email, setEmail] = useState("");

	const cadastrationAdm = async (e) => {
		e.preventDefault();
	
		if (!nome || !edv || !area || !email) {
		  toast.error("Preencha todos os campos para ser feito o cadastro", {
			position: "top-right",
			autoClose: 1800,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		  });
		  return;
		}
	
		try {
		  const NewUserAdm = await axios.post(`${api}/admin/singleRegisterAdmin`, {
			name: nome,
			edv: edv,
			email_user: email,
			user_area: area,
			percentage: 0,
			typeUser: "",
			is_activate: 0,
			hashed_password: edv,
		  });
		  toast.success("Cadastro de administrador feito com sucesso", {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		  });
		} catch (error) {
		  console.error("Erro na requisição:", error);
		}
	  };

	return (
		<div className={styles.container}>
			<Navbar />
			<form onSubmit={cadastrationAdm} className={styles.contJust}>
				<div className={styles.contLogin}>
					<div className={styles.logo}>
						<img src={lSkills} alt="logo" />
					</div>
					<div className={styles.inputs}>
						<div className={styles.input}>
							<FaUser size={20} className={styles.icon} />
							<div className={styles.line}></div>
							<Input label="Nome" type="text" id="nome" placeholder="" value={nome} onChange={(e) => setNome(e.target.value)} />
						</div>

						<div className={styles.dadosUser}>
							<div className={styles.input} id={styles.large}>
								<HiIdentification size={20} className={styles.icon} />
								<div className={styles.line}></div>
								<Input label="Edv" type="number" id="edv" placeholder="" value={edv} onChange={(e) => setEdv(e.target.value)} />
							</div>
							<div className={styles.input} id={styles.small}>
								<FaGear size={20} className={styles.icon} />
								<div className={styles.line}></div>
								<Input label="area" type="text" id="area" placeholder="" value={area} onChange={(e) => setArea(e.target.value)} />
							</div>
						</div>

						<div className={styles.input}>
							<MdEmail size={20} className={styles.icon} />
							<div className={styles.line}></div>
							<Input label="Email" type="text" id="emailFocal" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}/>
						</div>
					</div>

					<div className={styles.bts}>
						<button className={styles.bt} type="submit" >
							<h1>Continuar</h1>
						</button>
					</div>
				</div>
			</form>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
      		/>
		</div>
	);
};

export default CadastroAdm;
