import React, { useState, useEffect } from "react";
import styles from "./CriarTri.module.css";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import LinkModal from "../modalLink/LinkModal";

import { HiOutlinePencilAlt } from "react-icons/hi";
import axios from "axios";
import api from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import InputImg from "../inputs/inputImg/InputImg";
import Input from "../inputs/inputText/Input";

import ShowTri from "../showTri/ShowTri";

import { jwtDecode } from "jwt-decode";

const CriarTri = () => {
	const [elements, setElements] = useState([]);
	const [novoTitulo, setNovoTitulo] = useState("");
	const [showLinkModal, setShowLinkModal] = useState(false);
	const [currentElementIndex, setCurrentElementIndex] = useState(null);
	const [currenttopicoIndex, setCurrenttopicoIndex] = useState(null);
	const [nome, setNome] = useState("");
	const [desc, setDesc] = useState("");
	const [focal_point, setFocal] = useState("");
	const [cargaHora, setCargaHora] = useState("");
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [showTri, setShowTri] = useState(false)

	const token = localStorage.getItem('token');
	const decodedToken = jwtDecode(token);

	const showAsTri = () => {
		setShowTri(true)
		localStorage.setItem("trilha", JSON.stringify(elements));
		localStorage.setItem("nome", nome)
		localStorage.setItem("desc", desc)
		localStorage.setItem("focal", focal_point)
		localStorage.setItem("ch", cargaHora)
		localStorage.setItem("imagem", image)
	}

	const showAsNormal = () => {
		setShowTri(false)
		localStorage.removeItem("trilha");
		localStorage.removeItem("nome");
		localStorage.removeItem("desc");
		localStorage.removeItem("focal");
		localStorage.removeItem("ch");
		localStorage.removeItem("imagem");
	}

	const addElemento = () => {
		const novoElemento = {
			titulo: novoTitulo,
			topicos: [],
		};
		setElements([...elements, novoElemento]);
		setNovoTitulo("");
	};

	const setTitulos = (e, index) => {
		const novosElementos = [...elements];
		novosElementos[index].titulo = e.target.value;
		setElements(novosElementos);
	};

	const setTextos = (e, index, topicoIndex) => {
		const novosElementos = [...elements];
		novosElementos[index].topicos[topicoIndex].texto = e.target.value;
		setElements(novosElementos);
	};

	const addParagrafo = (index) => {
		const novosElementos = [...elements];
		novosElementos[index].topicos.push({ texto: "", link: false });
		setElements(novosElementos);
	};

	const setLink = (index, topicoIndex, checked) => {
		const novosElementos = [...elements];
		novosElementos[index].topicos[topicoIndex].link = checked;
		setElements(novosElementos);
	};

	const openLinkModal = (index, topicoIndex) => {
		setCurrentElementIndex(index);
		setCurrenttopicoIndex(topicoIndex);
		setShowLinkModal(true);
	};

	const closeLinkModal = () => {
		setShowLinkModal(false);
		setCurrentElementIndex(null);
		setCurrenttopicoIndex(null);
	};

	const saveLink = (link) => {
		const novosElementos = [...elements];
		novosElementos[currentElementIndex].topicos[currenttopicoIndex].link = link;
		setElements(novosElementos);
		closeLinkModal();
	};

	const enviarDados = async () => {
		try {
			if (!image) {
				toast.error("Nenhuma imagem selecionada para enviar.", { position: "top-right" });
				return;
			}

			if (elements.length === 0) {
				toast.error("A trilha deve conter pelo menos um elemento.", { position: "top-right" });
				return;
			}

			for (const elemento of elements) {
				if (elemento.titulo.trim() === "") {
					toast.error("O título de um ou mais elementos está vazio.", { position: "top-right" });
					return;
				}
				for (const topico of elemento.topicos) {
					if (topico.texto.trim() === "") {
						toast.error("O texto de um ou mais tópicos está vazio.", { position: "top-right" });
						return;
					}
				}
			}

			const blob = dataURLtoBlob(image);
			const tituloPadronizado = generateImageTitle("jpg");
			const file = new File([blob], tituloPadronizado, { type: "image/jpeg" });
			const imageRef = ref(storage, `images/${tituloPadronizado}`);

			await uploadBytes(imageRef, file);
			const url = await getDownloadURL(imageRef);

			setImageUrl(url);
			console.log("URL da imagem:", url);

			const conteudoTrilha = elements.map(elemento => ({
				titulo: elemento.titulo,
				topicos: elemento.topicos.map(topico => ({
					texto: topico.texto,
					link: topico.link || false
				}))
			}));
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
			{showLinkModal && (
				<LinkModal onClose={closeLinkModal} onSave={saveLink} />
			)}
			{showTri == false && (
				<div className={styles.contHeader}>
					<div className={styles.contImg}>
						<InputImg
							onChange={setArquivo}
							onClick={getArquivo}
							id="fileInput"
							image={image}
						/>
					</div>
					<div className={styles.contInps}>
						<div className={styles.inputs}>
							<div className={styles.inps}>
								<Input
									placeholder="Titulo:"
									type="text"
									value={nome}
									onChange={(e) => setNome(e.target.value)}
									id="nome"
								/>
							</div>
						</div>
						<div className={styles.descH}>
							<textarea
								className={styles.desc}
								placeholder="Adicionar breve descrição da trilha"
								type="text"
								onChange={(e) => setDesc(e.target.value)}
								value={desc}
								id="desc"
							/>
						</div>
						<div className={styles.inputs}>
							<div className={styles.inps} id={styles.fp}>
								<Input
									placeholder="Focal Point:"
									onChange={(e) => setFocal(e.target.value)}
									type="text"
									value={focal_point}
									id="focalpoint"
								/>
							</div>
							<div className={styles.inps} id={styles.ch}>
								<Input
									placeholder="Carga Horária:"
									type="number"
									onChange={(e) => setCargaHora(e.target.value)}
									value={cargaHora}
									id="cargaHora"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			{showTri == false && (
				<VerticalTimeline className={styles.tColor}>
					{elements.map((elemento, index) => (
						<VerticalTimelineElement
							key={index}
							contentStyle={{
								background: "#007BC0",
								color: "#fff",
								boxShadow: "0px 0px 0px 0px",
							}}
							contentArrowStyle={{ borderRight: "7px solid #007BC0" }}
							iconStyle={{ background: "#007BC0", color: "#fff" }}
						>
							<div className={styles.contTitulos}>
								<div className={styles.inpsTri}>
									<Input
										className={styles.inpTitulo}
										type="text"
										placeholder="Título"
										value={elemento.titulo}
										onChange={(e) => setTitulos(e, index)}
										id="titulo"
									/>
								</div>
							</div>

							{elemento.topicos.map((paragrafo, topicoIndex) => (
								<div key={topicoIndex}>
									<div className={styles.contItens}>
										<div className={styles.ifLink}>
											<div className={styles.inpsTri} id={styles.inpTop}>
												<Input
													className={styles.itens}
													placeholder="Adicionar Texto"
													value={paragrafo.texto}
													onChange={(e) => setTextos(e, index, topicoIndex)}
												/>
											</div>
											{paragrafo.link && (
												<div>
													<button
														className={styles.btLink}
														onClick={() => openLinkModal(index, topicoIndex)}
													>
														<HiOutlinePencilAlt
															className={styles.iLink}
															size={30}
														/>
													</button>
												</div>
											)}
										</div>
										<div className={styles.check}>
											<div className={styles.cLink}>
												<input
													className={styles.checkB}
													type="checkbox"
													checked={paragrafo.link || false}
													onChange={(e) =>
														setLink(index, topicoIndex, e.target.checked)
													}
												/>
												<p>Link</p>
												<div className={styles.cLink}>
													<input
														type="checkbox"
														checked={paragrafo.link || false}
														onChange={(e) =>
															setLink(index, topicoIndex, e.target.checked)
														}
													/>
													<p>Modal</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
							<div className={styles.contBtAdd}>
								<button
									className={styles.btAddItem}
									onClick={() => addParagrafo(index)}
								>
									+
								</button>
							</div>
							<div className={styles.textsTri}>
								<h1>{elemento.titulo}</h1>
							</div>
							{elemento.topicos.map((paragrafo, topicoIndex) => (
								<li key={topicoIndex} className={styles.textsTri} id={styles.topicos}>
									{paragrafo.link ? (
										<a className={styles.links} href={paragrafo.link.toString()}>
											{paragrafo.texto}
										</a>
									) : (
										<span>{paragrafo.texto}</span>
									)}
								</li>
							))}
						</VerticalTimelineElement>
					))}
					<div className={styles.bt}>
						<button onClick={addElemento} className={styles.btAd}>
							+
						</button>
					</div>
				</VerticalTimeline>
			)}
			{showTri == true && (
				<div className={styles.asTrail}>
					<ShowTri showTrilha={showAsTri} />
				</div>
			)}
			<div className={styles.saveTri}>
				{showTri == true && (
					<button className={styles.btSave} onClick={showAsNormal} id={styles.asTri}>Voltar a edição</button>
				)}
				{showTri == false && (
					<button className={styles.btSave} onClick={showAsTri} id={styles.asTri}>Visualizar como trilha</button>
				)}
				<button className={styles.btSave} onClick={enviarDados}>
					Salvar Trilha
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

export default CriarTri;