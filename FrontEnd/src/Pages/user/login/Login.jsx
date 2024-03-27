import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/inputText/Input";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Touchable } from "react";

import { FaUser, FaLock } from "react-icons/fa";
import api from "../../../api";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/api/v1/users/token`, {
        username: username,
        password: password,
      });
      console.log("OI oi");
      if (response.data.access_token) {
        window.localStorage.setItem("token", response.data.access_token);

        console.log("token", response.data.access_token);
        const clientEdv = username;
        window.localStorage.setItem("edv", clientEdv);
        console.log("edv", clientEdv);
        navigate("/hubTrilhas", { state: { edvUser: clientEdv } });
      }
    } catch (error) {
      console.error("Erro na requisição de usuário:", error);
      toast.error("Usuário ou senha inválidos", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const btCad = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.container}>
      <div className={styles.contLogin}>
        <div className={styles.logo}>
          <img src="src\components\assets\logoSkill-B.svg" alt="logo" />
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
            <Link to="/cadastro">Esqueci a senha</Link>
          </p>
        </div>
        <div className={styles.bts}>
          <button className={styles.bt} onClick={loginUser}>
            <h1>Entrar</h1>
          </button>
          <button className={styles.bt} onClick={btCad}>
            <h1>Entrar</h1>
          </button>
        </div>
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

export default Login;
