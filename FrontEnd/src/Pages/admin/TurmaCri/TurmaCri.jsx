
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
import InputImg from "../../../components/inputs/inputImg/InputImg";

const TurmaCri = () => {
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	const enviarDados = async () => {
		try {
			if (!image) {
				toast.error("Nenhuma imagem selecionada para enviar.", { position: "top-right" });
				return;
			}

			const blob = dataURLtoBlob(image);
			const tituloPadronizado = generateImageTitle("jpg");
			const file = new File([blob], tituloPadronizado, { type: "image/jpeg" });
			const imageRef = ref(storage, `images/${tituloPadronizado}`);

			await uploadBytes(imageRef, file);
			const url = await getDownloadURL(imageRef);

			setImageUrl(url);
			console.log("URL da imagem:", url);


			await axios.post(
				`${api}/trail/createTrail`,
				{
					nome: nome,
					desc: desc,
					focal_point: focal_point,
					criador_trilha: decodedToken.edv,
					carga_horaria: cargaHora,
					conteudo: JSON.stringify(conteudoTrilha),
					image_trail: url,
				}
			);
			toast.success("Trilha criada com sucesso.", { position: "top-right" });

			setShowTri(false)
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			toast.error("Erro ao criar a trilha. Tente novamente mais tarde.", { position: "top-right" });
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

	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.contImg}>
				<InputImg
					onChange={setArquivo}
					onClick={getArquivo}
					id="fileInput"
					image={image}
				/>
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
