import React from "react";
import styles from "./LandingPage.module.css";

import { useNavigate } from "react-router-dom";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { FaGears } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const LandingPage = () => {
	const navigate = useNavigate()

	const Logar = () => {
		navigate("/login");
	};


	return (
		<div className={styles.container}>
			<div className={styles.init}>
				<div className={styles.bg}></div>
				<div className={styles.contSkills}>
					<div className={styles.bsLogo}>
						<img src="src\components\assets\logoSkill-W.svg" alt="" />
					</div>
					<div className={styles.bts}>
						<button onClick={Logar}>Entrar</button>
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
				<VerticalTimeline className={styles.trilhaImg} layout={"1-column-left"}>
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
						icon={<FaGears color="#003253" />}
					>
						<div className={styles.title} style={{ color: "#003253" }}>
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
						icon={<IoDocumentTextOutline color="#2C2A5E" />}
					>
						<div className={styles.title} style={{ color: "#2C2A5E" }}>
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
						icon={<FaRegUser color="#791d73" />}
					>
						<div className={styles.title} style={{ color: "#791d73" }}>
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
      <div className={styles.fBts}>
        <button className={styles.fButton} onClick={Logar}>Entrar</button>
      </div>
			{/* <iframe
				src="http://www.republiquedesmangues.fr/"
				style={{ width: "99.8%", height: "100%" }}
			></iframe> */}
		</div>
	);
};

export default LandingPage;
