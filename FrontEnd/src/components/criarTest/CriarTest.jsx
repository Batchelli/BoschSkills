import React, { useState, useEffect } from "react";
import styles from "./CriarTest.module.css";
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

import Input from "../inputs/inputText/Input";

import ShowTri from "../showTri/ShowTri";

import { jwtDecode } from "jwt-decode";

const CriarTest = () => {
	const [elements, setElements] = useState([]);
	const [novoTitulo, setNovoTitulo] = useState("");
	const [showLinkModal, setShowLinkModal] = useState(false);
	const [currentElementIndex, setCurrentElementIndex] = useState(null);
	const [currenttopicoIndex, setCurrenttopicoIndex] = useState(null);
	const [nome_prova, setNomeP] = useState("");
	const [criador_prova, setCriadorP] = useState("");
	const [conteudo_prova, setCont] = useState("");
	const [valor_prova, setValor] = useState("");
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
			

			const conteudoTrilha = elements.map(elemento => ({
				Enunciado: elemento.titulo,
				perguntas: elemento.topicos.map(topico => ({
					alternativas: topico.texto,
					respostaCerta: topico.link || false
				}))
			}));
			await axios.post(
				`${api}/provas/createProva`,
				{
					nome_prova: nome_prova,
					criador_prova: criador_prova,
					conteudo_prova: JSON.stringify(conteudoTrilha),
					valor_prova: 10,
					tempoRealizar: 19
			
				}
			);
			toast.success("Trilha criada com sucesso.", { position: "top-right" });

			setShowTri(false)
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			toast.error("Erro ao criar a trilha. Tente novamente mais tarde.", { position: "top-right" });
		}
	};


	return (
		<div className={styles.container}>
			{/* {showLinkModal && (
				<LinkModal onClose={closeLinkModal} onSave={saveLink} />
			)}
			 */}
	
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
										placeholder="Enunciado"
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
													placeholder="Adicionar pergunta"
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
					Salvar Prova
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

export default CriarTest;