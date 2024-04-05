import styles from "./Cadastro.module.css";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../../components/inputs/inputText/Input";
import React, { useState } from "react";
import axios from "axios";

import { FaUser, FaUserTie } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../../../components/navbar/Navbar";
import api from "../../../../api";

import lSkill from "../../../../components/assets/logoSkill-B.svg"

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [edv, setEdv] = useState("");
  const [area, setArea] = useState("");
  const [focal_point, setFocal] = useState("");
  const [emailFocal, setEmailFocal] = useState("");

  const cadastration = async (e) => {
    e.preventDefault();

    if (!nome || !edv || !area || !focal_point || !emailFocal) {
      toast.error("Preencha todos os campos para ser feito o cadastro", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const NewUserAdm = await axios.post(`${api}/admin/singleRegister`, {
        name: nome,
        edv: edv,
        email_user: "",
        user_area: area,
        focal_point: focal_point,
        admin_email: emailFocal,
        percentage: 0,
        typeUser: "User",
        is_activate: 0,
        hashed_password: edv,
        image_user: " "
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
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <form onSubmit={cadastration} className={styles.contJust}>
        <div className={styles.contLogin}>
          <div className={styles.logo}>
            <img src={lSkill} alt="logo" />
          </div>
          <div className={styles.inputs}>
            <div className={styles.dadosUser}>
              <div className={styles.input} id={styles.large}>
                <FaUser size={20} className={styles.icon} />
                <div className={styles.line}></div>
                <Input
                  label="Nome"
                  type="text"
                  id="nome"
                  placeholder=""
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className={styles.input} id={styles.small}>
                <HiIdentification size={20} className={styles.icon} />
                <div className={styles.line}></div>
                <Input
                  label="Edv"
                  type="number"
                  id="edv"
                  placeholder=""
                  value={edv}
                  onChange={(e) => setEdv(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.dadosUser} >
              <div className={styles.input} id={styles.large}>
                <FaUserTie size={20} className={styles.icon} />
                <div className={styles.line}></div>
                <Input
                  label="Focal Point"
                  type="text"
                  id="focal"
                  placeholder=""
                  value={focal_point}
                  onChange={(e) => setFocal(e.target.value)}
                />
              </div>
              <div className={styles.input} id={styles.small}>
                <FaGear size={20} className={styles.icon} />
                <div className={styles.line}></div>
                <Input
                  label="area"
                  type="text"
                  id="area"
                  placeholder=""
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.input}>
              <MdEmail size={20} className={styles.icon} />
              <div className={styles.line}></div>
              <Input
                label="Email do focal point"
                type="text"
                id="emailFocal"
                placeholder=""
                value={emailFocal}
                onChange={(e) => setEmailFocal(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.bts}>
            <button className={styles.bt} type="submit">
              {" "}
              {/*  onClick={Logado} */}
              <h1>Continuar</h1>
            </button>
          </div>
        </div>
      </form>
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

export default Cadastro;
