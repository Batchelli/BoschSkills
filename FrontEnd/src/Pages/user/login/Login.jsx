import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/inputText/Input";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { FaUser, FaLock } from "react-icons/fa";
import api from "../../../api";

import lSkills from "../../../components/assets/logoSkill-B.svg"

import { useType } from "../../../Auth"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setTypeValue } = useType();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/users/auth`, {
        username: username,
        password: password,
      });
      if (response.data.access_token) {
        const dataUser = await axios.get(`${api}/users/user/${username}`, {})
        setTypeValue(dataUser.data.typeUser);

        if (dataUser.data.typeUser === "Admin" || dataUser.data.typeUser === "SAdmin") {
          toast.success("Logado como admin!", {
            onClose: () => {
              navigate("/skills/hubadmin");
            },
          });
        } else {
          toast.success("Logado como user!", {
            onClose: () => {
              navigate("/skills/hubtrilhas");
            },
          });
        }
      }
      window.localStorage.setItem("token", response.data.access_token);
    } catch (error) {
      console.error("Erro na requisição de usuário:", error);
      toast.error("Usuário ou senha inválidos",);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contLogin}>
        <div className={styles.logo}>
          <img src={lSkills} alt="logo" />
        </div>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <FaUser size={20} className={styles.icon} />
            <div className={styles.line}></div>
            <Input
              label="Usuário"
              type="text"
              id="user"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <FaLock size={20} className={styles.icon} />
            <div className={styles.line}></div>
            <Input
              label="Senha"
              type="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.cad}>
          <p>
            <Link to="/skills/singleregister">Esqueci a senha</Link>
          </p>
        </div>
        <div className={styles.bts}>
          <button className={styles.bt} onClick={loginUser}>
            <h1>Entrar</h1>
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={900}
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

export default Login;
