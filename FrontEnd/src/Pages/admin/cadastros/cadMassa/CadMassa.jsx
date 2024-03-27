import React from "react";
import styles from "./CadMassa.module.css";

import Navbar from "../../../../components/navbar/Navbar";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { PiMicrosoftExcelLogoFill as Excel } from "react-icons/pi";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import api from "../../../../api";

const CadMassa = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewData, setPreviewData] = useState([]);
  const [show, setShow] = useState(false);

  const showEnviar = () => {
    setShow(true);
  };

  const setArquivo = (e) => {
    setFile(e.target.files[0]);
  };

  const getArquivo = () => {
    document.getElementById("fileInput").click();
  };

  const enviar = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const api = "http://127.0.0.1:8000";

    try {
      await axios.post(`${api}/api/v1/admin/cadXml/uploadfile/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cadastro feito com sucesso", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setUploadStatus("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o arquivo", error);
      setUploadStatus("Erro ao enviar o arquivo. Tente novamente.");
    }
  };

  const preview = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${api}/api/v1/admin/cadXml/previewfile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fomatData = response.data.map((item) => ({
        Nome: item.name || "N/A",
        EDV: item.edv || "N/A",
        Email: item.email_user || "N/A",
        Area: item.user_area || "N/A",
        Focal: item.focal_point || "N/A",
        Admin: item.admin_email || "N/A",
      }));

      setPreviewData(fomatData);
      showEnviar();
    } catch (error) {
      console.error("Erro ao visualizar o arquivo", error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contJust}>
        <div className={styles.contCad}>
          <div className={styles.header}>
            <div className={styles.bts}>
              <input type="file" onChange={setArquivo} id="fileInput" />
              <button onClick={getArquivo} className={styles.btFile}>
                Enviar Arquivo
              </button>
            </div>
            <div className={styles.title}>
              <h1>Cadastro em massa</h1>
            </div>
            <div className={styles.bts}>
              <div className={styles.contI}>
                <div className={styles.i}>
                  <div className={styles.descI}>
                    <p>
                      Arquivo de exemplo para seguir padrão de inserção de dados
                      no sistema!
                    </p>
                  </div>
                  <AiOutlineExclamationCircle size={25} />
                </div>
              </div>
              <button className={styles.btBArquivo}>
                <PiMicrosoftExcelLogoFill size={75} />
                Baixar arquivo de exemplo
              </button>
            </div>
          </div>
          <div className={styles.contInfos}>
            <div className={styles.infos}>
              <ul className={styles.board}>
                <h3>Nome</h3>
                {previewData.map((item, index) => (
                  <p key={index}>{`${item.Nome}`}</p>
                ))}
              </ul>

              <ul className={styles.board}>
                <h3>EDV</h3>
                {previewData.map((item, index) => (
                  <p key={index}>{`${item.EDV}`}</p>
                ))}
              </ul>
              <ul className={styles.board}>
                <h3>Email</h3>
                {previewData.map((item, index) => (
                  <p key={index}>{`${item.Email}`}</p>
                ))}
              </ul>
              <ul className={styles.board}>
                <h3>Area</h3>
                {previewData.map((item, index) => (
                  <p key={index}>{`${item.Area}`}</p>
                ))}
              </ul>

              <ul className={styles.board}>
                <h3>Focal Point</h3>
                {previewData.map((item, index) => (
                  <p key={index}>{`${item.Focal}`}</p>
                ))}
              </ul>

              <ul className={styles.board}>
                <h3>Email Gestor</h3>
                {previewData.map((item, index) => (
                  <p key={index}>{`${item.Email}`}</p>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.footer}>
            <button onClick={enviar} className={styles.send}>
              Cadastrar
            </button>
            <button onClick={preview} className={styles.send}>
              Visualização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadMassa;
