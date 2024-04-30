import styles from "./TurmaCri.module.css";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import api from "../../../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../firebase";
import InputImg from "../../../components/inputs/inputImg/InputImg";
import InputTxt from "../../../components/inputs/inputText/Input";
import LoadinPage from "../../../components/loadingPage/LoadingPage";

const TurmaCri = () => {
	const [image, setImage] = useState(null);
	const [gtUsers, setGtUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [teamName, setTeamName] = useState('')
	const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoadgin] = useState(false)

	const token = localStorage.getItem('token');
	const decodedToken = jwtDecode(token);
	const lider = JSON.stringify(decodedToken.edv)

	const color = localStorage.getItem('color')

	const pos = () => {
		setImage(null)
		setSelectedUsers([])
		setTeamName(null)
		setImageUrl(null)
	}

	const getUsers = async () => {
		try {
			const response = await axios.get(`${api}/users/allUsers`)

			const result = response.data.map((item) => ({
				Nome: item.name || "N/A",
				Edv: item.edv || "N/A",
			}));
			if (response) {
				setGtUsers(result)
			}
			console.log("teste", gtUsers)
		} catch {

		}
	}

	useEffect(() => {
		getUsers()
	}, [])


	const enviarDados = async () => {
		setLoadgin(true)
		try {
			if (!image) {
				toast.error("Nenhuma imagem selecionada para enviar.", { position: "top-right" });
				return;
			}

			const blob = dataURLtoBlob(image);
			const tituloPadronizado = generateImageTitle("jpg");
			const file = new File([blob], tituloPadronizado, { type: "image/jpeg" });
			const imageRef = ref(storage, `Imagens/Time/${tituloPadronizado}`);

			await uploadBytes(imageRef, file);
			const url = await getDownloadURL(imageRef);

			setImageUrl(url);
			console.log("URL da imagem:", url);

			const selectedUsersEDVs = selectedUsers.map(userId => String(userId));

			await axios.post(
				`${api}/turmas/createTeamAndAddUsers/`,
				{
					create: {
						lider: lider,
						team_name: teamName,
						image_team: url
					},
					data: {
						team_id: 0,
						user_edv: selectedUsersEDVs
					}
				}
			);
			toast.success("Time criado com sucesso.",
				setLoadgin(false)
			);
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			toast.error("Erro ao criar o time. Tente novamente mais tarde.");
		}
	};


	const getArquivo = () => {
		document.getElementById("fileInput").click();
	};

	const setArquivo = (e) => {
		const selectedImage = e.target.files[0];
		if (!selectedImage) {
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(selectedImage);
	};

	const dataURLtoBlob = (dataURL) => {
		const parts = dataURL.split(";base64,");
		const contentType = parts[0].split(":")[1];
		const raw = window.atob(parts[1]);
		const array = new Uint8Array(raw.length);

		for (let i = 0; i < raw.length; i++) {
			array[i] = raw.charCodeAt(i);
		}

		return new Blob([array], { type: contentType });
	};

	const generateImageTitle = (extension) => {
		const uuid = v4();
		const tituloPadronizado = `${uuid}.${extension}`;
		return tituloPadronizado;
	};

	const toggleUserSelection = (userId) => {
		console.log("ID do usuário selecionado:", userId);
		if (selectedUsers.includes(userId)) {
			console.log("Removendo usuário:", userId);
			setSelectedUsers(selectedUsers.filter(user => user !== userId));
		} else {
			console.log("Adicionando usuário:", userId);
			setSelectedUsers([...selectedUsers, userId]);
		}
	};

	console.log("Selected Users: ", selectedUsers);

	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.body}>
				<div className={styles.inputs}>
					<div className={styles.contImg}>
						<InputImg
							onChange={setArquivo}
							onClick={getArquivo}
							id="fileInput"
							image={image}
						/>
					</div>
					<div className={styles.inpTxt}>
						<InputTxt
							type="text"
							id="name"
							placeholder="Nome do Time"
							onChange={(e) => setTeamName(e.target.value)}
						/>
					</div>
				</div>
				<div className={styles.ttCont}>
					<h1>Usuários: </h1>
					<div className={styles.search}>
						<p>Pesquisar usuário:</p>
						<div className={styles.inpPes}>
							<InputTxt
								type="text"
								id="name"
								placeholder="Nome / EDV: "
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className={styles.btsOps}>
						{gtUsers.map((item, index) => (
							<button
								key={index}
								value={item.Edv}
								onClick={() => toggleUserSelection(item.Edv)}
								className={selectedUsers.includes(item.Edv) ? styles.btSelectUser : styles.btUser}
							>
								{`${item.Nome}`}
							</button>
						))}
					</div>

				</div>
				<div className={styles.bt}>
					<button style={{ border: `1px solid${color}`}} onClick={enviarDados}>Criar time</button>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme="light"
			/>
			{loading == true && (
				<LoadinPage />
			)}
		</div>
	);
};

export default TurmaCri;
