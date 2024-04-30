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
import LoadinPage from '../../../../components/loadingPage/LoadingPage'

const CadMassa = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false)

  const color = localStorage.getItem("color")

  const enviar = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoad(true)
    try {
      await axios.post(`${api}/admin/uploadfile/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cadastro feito com sucesso",);
      setLoad(false)
      setShow(false)
      setPreviewData([])
    } catch (error) {
      console.error("Erro ao enviar o arquivo", error);
      setLoad(false)
    }
  };

  const preview = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${api}/admin/cadXml/previewfile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fomatData = response.data.map((item) => ({
        Nome: item.nome || "N/A",
        Edv: item.Edv || "N/A",
        Area: item.area || "N/A",
        Focal: item.Focal_Point || "N/A",
        Gestor: item.email_gestor || "N/A",
      }));

      setPreviewData(fomatData);
      setShow(true)
    } catch (error) {
      console.error("Erro ao visualizar o arquivo", error);
    }
  };

  const setArquivo = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    preview(selectedFile);
  };

  const getArquivo = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Cadastro em massa</h1>
      <div className={styles.tableBody}>
        <div className={styles.tableHeader} style={{ backgroundColor: color, border: `2px solid ${color}` }}>
          <div className={styles.title}>
            <h1> Dados do usuário</h1>
          </div>
          <div className={styles.btH}>
            <button className={styles.btDown} style={{ color: color }}>
              <PiMicrosoftExcelLogoFill size={25} />
            </button>
          </div>
        </div>
        <div className={styles.table} style={{ border: `2px solid ${color}` }}>
          <div className={styles.columns}>
            <ul>
              <h3>Nome</h3>
              {previewData.map((item, index) => (
                <p key={index}>{`${item.Nome}`}</p>
              ))}
            </ul>
          </div>
          <div className={styles.columns}>
            <ul>
              <h3>EDV</h3>
              {previewData.map((item, index) => (
                <p key={index}>{`${item.Edv}`}</p>
              ))}
            </ul>
          </div>
          <div className={styles.columns}>
            <ul>
              <h3>Área</h3>
              {previewData.map((item, index) => (
                <p key={index}>{`${item.Area}`}</p>
              ))}
            </ul>
          </div>
          <div className={styles.columns}>
            <ul>
              <h3>Focal Point</h3>
              {previewData.map((item, index) => (
                <p key={index}>{`${item.Focal}`}</p>
              ))}
            </ul>
          </div>
          <div className={styles.columns}>
            <ul>
              <h3>Email Gestor</h3>
              {previewData.map((item, index) => (
                <p key={index}>{`${item.Gestor}`}</p>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bts}>
        <button onClick={getArquivo} className={styles.btAdd} style={{ color: color }}>
          Adicionar arquivo
        </button>
        {show == true && (
          <button onClick={enviar} className={styles.btAdd} style={{ color: color }}>
            Cadastrar
          </button>
        )}
      </div>
      <input type="file" onChange={setArquivo} id="fileInput" style={{ display: "none" }} />
      {load == true && (
        <LoadinPage />
      )}
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
    </div>
  );
};

export default CadMassa;
