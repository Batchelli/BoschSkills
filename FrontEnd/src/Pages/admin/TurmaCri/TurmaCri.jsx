
import styles from "./TurmaCri.module.css";
import Navbar from "../../../components/navbar/Navbar";
import Input from "../../../components/inputs/inputText/Input";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TbPhotoPlus } from "react-icons/tb";

import api from "../../../api";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../firebase";

const TurmaCri = () => {
  const navigate = useNavigate();
  const [lider, setLider] = useState("");
  const [team_name, setTeam_name] = useState("");
  const [image_team, setImage_team] = useState("");


	const setArquivo = (e) => {
		setFile(e.target.files[0]);
	};

	const getArquivo = () => {
		document.getElementById("fileInput").click();
	};

	const createTeam = async (e) => {
		e.preventDefault();
		console.log("Team");
	
		if (!team_name) {
		  toast.error("Preencha todos os campos para ciar o time", {
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
		  const NewTeam = await axios.post(`${api}/turmas/createTeams`, {
			lider: "lider",
			team_name: team_name,
			image_team: "",
	
		  });
		  toast.success("Time criado com sucesso", {
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

	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	const uploadFile = () => {
		if (imageUpload == null) return;
	
		const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
	
		uploadBytes(imageRef, imageUpload)
		  .then((snapshot) => getDownloadURL(snapshot.ref))
		  .then((url) => {
			// Set the latest image URL and clear the previous URLs
			setImageUrl(url);
			console.log(url)
		  })
		  .catch((error) => {
			console.log("Error uploading file: ", error);
		  });
	
	};

	const [team_id, setTeam_id] = useState(null);

	const changePhoto = async (e) => {
		e.preventDefault();
		console.log("changing");

		try {
			const Newphoto = await axios.put(
				`${api}/turmas/updateTeamPhoto/${team_id}`,
				{
					lider: "lide",
					team_name: "",
					image_team: imageUrl,
				}
			);
			toast.success('Foto adicionada com sucesso', {
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

			<div className={styles.addFoto}>
				<input
					type="file"
					onChange= {(event) => {
						setImageUpload(event.target.files[0]);
					}}
					id="fileInput"
					style={{ display: "none" }}
				/>

					<div className={styles.infosH}>
						<h4>ID da turma:</h4>
						<input className={styles.ch} type="text" onChange={(e) => setTeam_id(e.target.value)} />
					</div>

				<input
					type="file"
					onChange= {(event) => {
						setImageUpload(event.target.files[0]);
					}}
					id="fileInput"
					style={{ display: "none" }}
				/>
				<button className={styles.bt} onClick={getArquivo}>
					<TbPhotoPlus size={75} />
					<h1>Adicionar Foto</h1>
				</button>

				<button className={styles.bt} onClick={uploadFile}>
					<h1>Adicionar Foto no firebase</h1>
				</button>

				<button  onClick={changePhoto}>
					<h1>Mudar foto</h1>
				</button>

				<div className={styles.inp}>
					<Input placeholder="" id="nameTeam" label="Nome da Trilha"  onChange={(e) => setTeam_name(e.target.value)} />
				</div>
			</div>
			<div className={styles.footer}>
				<button  className={styles.send} onClick={createTeam}>
					Cadastrar
				</button>
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

export default TurmaCri;
