import styles from "./Fpassword.module.css";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/inputText/Input";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { FaUser, FaUserTie } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import api from "../../../api";

// COLOCAR UM AVISO QUANDO O EDV NÃO ESTÁ CADASTRADO NO BANCO

export const Fpassword = () => {
	const navigate = useNavigate();
	const [edv, setEdv] = useState("");
	const [emailUser, setEmail] = useState("");
	const [confirm, setConfirm] = useState("");

	const email = async (e) => {
		e.preventDefault();
		console.log("OI oi");

		try {
			const NewUser = await axios.post(
				`${api}/email/email`,
				{
					email: emailUser,
					edv: edv,
				}
			);
			toast.success("Usuário cadastrado com sucesso", {
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
			toast.error("Usuário não cadastrado", {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	const confirmeCode = async (e) => {
		try {
			const getCode = await axios.get(
				`${api}/email/getcode/`,
				{}
			);
			console.log("teste", getCode.data);
			if (confirm == getCode.data) {
				console.log("acesso permitido");
			} else {
				console.log("acesso negado", confirm);
				console.log("codigo mandado do front", confirm);
				console.log("codigo mandado do back", getCode.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.contLogin}>
				<div className={styles.logo}>
					<img src="src\components\assets\logoSkill-B.svg" alt="logo" />
				</div>
				<div className={styles.inputs}>
					<div className={styles.dadosUser}>
						<div className={styles.input} id={styles.edv}>
							<HiIdentification size={20} className={styles.icon} />
							<div className={styles.line}></div>
							<Input
								label="Edv"
								type="number"
								id="edv"
								placeholder=""
								value={edv}
								onChange={(e) => setEdv(e.target.value)}
								max={8}
							/>
						</div>
					</div>

					<div className={styles.dadosUser}></div>
					<div className={styles.input}>
						<MdEmail size={20} className={styles.icon} />
						<div className={styles.line}></div>
						<Input
							label="Digite seu email"
							type="text"
							id="emailFocal"
							placeholder=""
							value={emailUser}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				<div className={styles.bts}>
					<button className={styles.bt} onClick={email}>
						<h1>MANDAR EMAIL</h1>
					</button>
				</div>
				<div className={styles.input}>
					<MdEmail size={20} className={styles.icon} />
					<div className={styles.line}></div>
					<input type="text" class={styles.teste}/>
				</div>
				<br></br>
				<button onClick={confirmeCode}> CONFIRMAR CÓDIGO</button>
			</div>

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
