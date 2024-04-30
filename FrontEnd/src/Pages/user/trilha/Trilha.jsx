import Navbar from "../../../components/navbar/Navbar";
import styles from "./Trilha.module.css";

import axios from "axios";
import api from "../../../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

const Trilha = () => {
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

  const { id } = useParams()

  const get_data = async () => {
    try {
      const response = await axios.get(`${api}/trail/trails/${id}`);
      console.log("OI oi");
      if (response.data) {
        console.log(response.data);
        setNome(response.data[0].nome);
        setDesc(response.data[0].desc);
        setFocalPoint(response.data[0].focal_point);
        setCargaHora(response.data[0].carga_horaria);
        setImage(response.data[0].image_trail);

        console.log(conteudo);

        if (response.data[0].conteudo) {
          setIsTri(true);
          setConteudo(response.data[0].conteudo);
          console.log("teste", isTri);
        }
      }
    } catch (error) {
      console.error("Erro na requisição da trilha:", error);
      // toast.error("Usuário ou senha inválidos", {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  useEffect(() => {
    get_data();
  })


  useEffect(() => {
    if (conteudo) {
      try {
        const parsedConteudo = JSON.parse(conteudo);
        setTrilhaSalva(parsedConteudo);
      } catch (error) {
        console.error("Erro ao analisar conteúdo da trilha:", error);
        setTrilhaSalva([]);
      }
    }
  }, [conteudo]);

  return (
    <div className={styles.container}>
      <Navbar />
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
      {isTri && (
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
      )}
    </div>
  );
};

export default Trilha;
