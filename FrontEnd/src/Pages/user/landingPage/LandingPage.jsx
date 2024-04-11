import React, { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { FaGears } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { jwtDecode } from "jwt-decode";


const LandingPage = () => {
	const [color, setColor] = useState("");

	const navigate = useNavigate()

	const token = localStorage.getItem('token');
	const decodedToken = jwtDecode(token);
	const isAdm = decodedToken.typeUser

	const Logar = () => {
		if (token) {
			if (isAdm == "SAdmin" || isAdm == "Admin") {
				navigate("/skills/hubadmin");
			} else {
				navigate("/skills/hubtrilhas");
			}
		} else {
			navigate("/skills/login")
		}
	};

	useEffect(() => {
		const colors = ["#007BC0", "#18837E", "#9E2896"];
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		setColor(randomColor);
	}, []);
	localStorage.setItem('color', color)
	console.log(color)

	return (
		<div className={styles.container}>
			<div className={styles.init}>
				<div className={styles.bg} style={{ backgroundColor: color }}></div>
				<div className={styles.contSkills}>
					<div className={styles.bsLogo}>
						<img src="src\components\assets\logoSkill-W.svg" alt="" />
					</div>
					<div className={styles.bts}>
						<button style={{ color: color }} onClick={Logar}>Entrar</button>
					</div>
				</div>
				<div className={styles.textsCont}>
					<div className={styles.textChama}>
						<p>Trilhe o caminho do sucesso</p>
					</div>
					<div className={styles.subText}>
						<p>Uma solução simples para melhorar seu aprendizado!</p>
					</div>
				</div>
			</div>

			<div className={styles.tri}>
				<VerticalTimeline
					className={styles.trilhaImg}
					layout={"1-column-left"}
					lineColor={color}
				>
					<VerticalTimelineElement
						contentStyle={{
							background: "#fff",
							color: "#000",
							boxShadow: "0px 0px 0px 0px",
							padding: 0,
						}}
						iconStyle={{
							boxShadow: "0px 0px 0px 0px",
							background: "#fff",
							width: 50,
							height: 50,
							zIndex: 10,
						}}
						icon={<FaGears color={color} />}
					>
						<div className={styles.title} style={{ color: color }}>
							<h1>Funcionalidades</h1>
						</div>
						<div className={styles.funcCont}>
							<div className={styles.funcInfos}>
								<div className={styles.imgInfo}>
									<img src="src\components\assets\makeTri.svg" alt="" />
								</div>
								<h1>Trilhas</h1>
								<div className={styles.pInfo}>
									<p>Crie e edite suas trilhas </p>
								</div>
							</div>
							<div className={styles.funcInfos}>
								<img src="src\components\assets\team.svg" alt="" />
								<h1>Equipes</h1>
								<div className={styles.pInfo}>
									<p>Crie equipes com seus colaboradoes</p>
								</div>
							</div>
							<div className={styles.funcInfos}>
								<img src="src\components\assets\ampulheta.svg" alt="" />
								<h1>Organização</h1>
								<div className={styles.pInfo}>
									<p>Orgazine seu tempo da melhor forma</p>
								</div>
							</div>
						</div>
					</VerticalTimelineElement>

					<VerticalTimelineElement
						contentStyle={{
							background: "#fff",
							color: "#000",
							boxShadow: "0px 0px 0px 0px",
							padding: 0,
						}}
						iconStyle={{
							background: "#fff",
							boxShadow: "0px 0px 0px 0px",
							width: 50,
							height: 50,
							zIndex: 10,
						}}
						icon={<IoDocumentTextOutline color={color} />}
					>
						<div className={styles.title} style={{ color: color }}>
							<h1>Documentação</h1>
						</div>
						<div className={styles.funcCont} id={styles.docCont}>
							<div className={styles.funcInfos}>
								<div className={styles.imgInfo} id={styles.imgDoc}>
									<img src="src\components\assets\mango.svg" alt="" />
								</div>
								<div className={styles.pInfo} id={styles.pDoc}>
									<p>Acesse a documentação da plataforma</p>
								</div>
							</div>
						</div>
					</VerticalTimelineElement>

					<VerticalTimelineElement
						contentStyle={{
							background: "#fff",
							color: "#000",
							boxShadow: "0px 0px 0px 0px",
							padding: 0,
						}}
						iconStyle={{
							background: "#fff",
							boxShadow: "0px 0px 0px 0px",
							width: 50,
							height: 50,
							zIndex: 10,
						}}
						icon={<FaRegUser color={color} />}
					>
						<div className={styles.title} style={{ color: color }}>
							<h1>Desenvolvedores</h1>
						</div>
						<div className={styles.funcCont}>
							<div className={styles.funcInfos}>
								<div className={styles.imgInfo} id={styles.persoImg}>
									<img src="src\components\assets\lu.jfif" alt="" />
								</div>
								<h1>Lucas Baccelli</h1>
								<div className={styles.pInfo}>
									<p>BackEnd/FrontEnd UI/UX</p>
								</div>
							</div>
							<div className={styles.funcInfos} id={styles.persoImg}>
								<img src="src\components\assets\gi.jfif" alt="" />
								<h1>Giovana Radaeli</h1>
								<div className={styles.pInfo}>
									<p>Focou no Projeto da India</p>
								</div>
							</div>
							<div className={styles.funcInfos} id={styles.persoImg}>
								<img src="src\components\assets\ca.jfif" alt="" />
								<h1>Caio Tawfiq</h1>
								<div className={styles.pInfo}>
									<p>BackEnd/FrontEnd Data Analytics</p>
								</div>
							</div>
						</div>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</div>
		</div>
	);
};

export default LandingPage;
