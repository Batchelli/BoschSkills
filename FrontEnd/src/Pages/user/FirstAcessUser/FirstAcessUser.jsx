import React, { useState } from 'react'
import styles from "./FirstAcessUser.module.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import api from '../../../api';


const FirstAcessUser = () => {
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [confirmCode, setConfirmCode] = useState("")
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [senhaVerificada, setSenhaVerificada] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const edvUser = location.state && location.state.edvUser;

  const confirmEmail = async (e) => {
    console.log("função email")
    e.preventDefault();
    console.log("OI oi");
    console.log(edvUser)

    try {
      const emailConfirm = await axios.post(
        `${api}/email/email`,
        {
          email: email,
          edv: "0", //MUDAR P EDV RECEBEDENDO O PARÂMETRO DO EDV ASSIM QUE O USUÁRIO LOGAR
        }
      );

      toast.success('Usuário cadastrado com sucesso', {
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
      toast.error('Usuário não cadastrado', {
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

  }

  const newPassword = async (e) => {
    console.log("edv", edvUser)
    e.preventDefault();
    if (password === confirmPass) {
      setSenhaVerificada(true);
      if (confirmPass == "" || senhaVerificada == "") {

        toast.error('Preencha todos os campos', { //Caso a pessoa não preencha nenhum dos campos
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
      else {
        try {
          toast.success('Senha alterada com sucesso', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              setConfirmPass('');
              setPassword('');
              setTimeout(() => {
                //navigate('/Trilhas',  { state: { edvUser: edv } });
              }, 3500);
            },
          });

          console.log("")
          const NewDataUser = await axios.put(`${api}/users/updatePassword/${edvUser}`, {
            name: "",
            edv: edvUser,
            email_user: email,
            user_area: "string",
            focal_point: "string",
            admin_email: "string",
            percentage: 0,
            typeUser: "string",
            is_activate: false,
            hashed_password: password

          });
          setConfirmPass('');
          setPassword('');
          setEmail('');


          
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    } else {
      toast.error('Senhas não coincidem', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      console.log("senhas não coincidem")
      setSenhaVerificada(false);
    }
  };

  const confirmeCode = async (e) => {

    try {
      //Após o acesso ser permitido deve-se aparecer os campos para colocar a senha
      const getCode = await axios.get(`${api}/email/getcode/`, {
      })
   
      if (codigo == getCode.data) {
        console.log("acesso permitido", getCode.data)

        toast.success('Acesso permitido', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setConfirmPass('');
            setPassword('');
            setTimeout(() => {
              //navigate('/Trilhas',  { state: { edvUser: edv } });
            }, 3500);
          },
        });


      } else {
        console.log("acesso negado", confirmCode, codigo)
        console.log("codigo mandado do front", codigo)
        console.log("codigo mandado do back", getCode.data)

        toast.error('Acesso negado, tente novamente', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setConfirmPass('');
            setPassword('');
            setTimeout(() => {
              //navigate('/Trilhas',  { state: { edvUser: edv } });
            }, 3500);
          },
        });
      }
    }
    catch (error) {
      console.log(error)

    }

  }

  return (
    <div className={styles.container}>

      <div className={styles.divs}>
        <div className={styles.backImg}>




          <div className={styles.contInfo}>
            <p className={styles.pBranco}>Enviaremos um código de verificação para o seu e-mail e a partir disso será possível alterar sua senha.</p>
            <label htmlFor="" className={styles.label} >E-mail</label>
            <input className={styles.inputs} type="text" placeholder='Digite seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)}  />
            <button className={styles.btns} onClick={confirmEmail}>Verificar</button>
            <br />


            <label htmlFor="" className={styles.label}> Senha</label>
            <input className={styles.inputs}  type="password" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />

            <label htmlFor="" className={styles.label} >Confirmação</label>
            <input className={styles.inputs} type="password" placeholder='Confirme a senha' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            <button className={styles.btns}  onClick={newPassword}>Redefinir</button>
          </div>



        </div>
        <div className={styles.token}>
          <div className={styles.infos}>
            <div className={styles.rightCenter}>
              <img src='' className={styles.cadeado} alt="" />
              <br />
              {/* <img src={cadeadoFechado} alt="" /> */}
              <label htmlFor="" className={styles.labelR} >Digite o código de verificação</label>
              <br />

              <input className={styles.inputG} type="text"  value={codigo} onChange={(e) => setCodigo(e.target.value)}/>
              <br />
              <button onClick={confirmeCode}>Confirmar código</button>

              <br />
              <div className={styles.text}>

                <p className={styles.p}>Para seu primeiro acesso na plataforma é necessário a verificação do e-mail para sua segurança.</p>
              </div>
            </div>

          </div>
        </div>
        
        <ToastContainer />
        

      </div>







    </div>
  )
}

export default FirstAcessUser