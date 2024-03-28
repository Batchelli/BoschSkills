import React, { useState, useEffect } from "react";
import styles from "./ShowTri.module.css";

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";

const ShowTri = ({ showTrilha }) => {
    const [nome, setNome] = useState('');
    const [desc, setDesc] = useState('');
    const [focalPoint, setFocalPoint] = useState('');
    const [criador_trilha, setCriador_trilha] = useState('');
    const [cargaHora, setCargaHora] = useState('');
    const [image, setImage] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [creator, setCreateor] = useState("");
    const [isTri, setIsTri] = useState(false);
    const [trilhaSalva, setTrilhaSalva] = useState([]);

    const [showTri, setShowTri] = useState(false)

    const show = () => {
        setShowTri(showTrilha)
        console.log(showTri)
        if (showTri == false) {
            setNome(localStorage.getItem("nome"))
            setDesc(localStorage.getItem("desc"))
            setFocalPoint(localStorage.getItem("focal"))
            setCargaHora(localStorage.getItem("ch"))
            setImage(localStorage.getItem("imagem"))

            const parsedConteudo = JSON.parse(localStorage.getItem("trilha"));
            setTrilhaSalva(parsedConteudo);
        }
    }

    useEffect(() => {
        show()
    })


    return (
        <div className={styles.container}>
            <div className={styles.cont}>
                <div className={styles.imgMask} style={{ backgroundImage: `url(${image})` }}></div>
                <div className={styles.texts}>
                    <div className={styles.title}>
                        <h1>{nome}</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>{desc}</p>
                    </div>

                    <div className={styles.infos}>
                        <div className={styles.txt}>
                            <h4>Focal Point:</h4>
                            <p>{focalPoint}</p>
                        </div>
                        <div className={styles.txt}>
                            <h4>Porcentagem Concluida:</h4>
                            <p>50 Horas</p>
                        </div>
                        <div className={styles.txt}>
                            <h4>Carga Horaria:</h4>
                            <p>{cargaHora} Horas</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.contTri}>
                <VerticalTimeline className={styles.trilhaImg}>
                    {trilhaSalva.map((elemento, index) => (
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
                            <div className={styles.textsTri}>
                                <h1>{elemento.titulo}</h1>
                            </div>
                            {elemento.topicos.map((topico, topicoIndex) => (
                                <li key={topicoIndex} className={styles.textsTri} id={styles.topicos}>
                                    {topico.link ? (
                                        <a href={topico.link} target="_blank" className={styles.links}>{topico.texto}</a>
                                    ) : (
                                        <span>{topico.texto}</span>
                                    )}
                                </li>
                            ))}
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </div>
    )
}

export default ShowTri