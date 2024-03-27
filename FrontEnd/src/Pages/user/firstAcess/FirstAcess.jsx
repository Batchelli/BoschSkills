import React, { useState } from 'react'
import Input from '../../../components/input/Input'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const FirstAcess = () => {
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [confirmCode, setConfirmCode] = useState("")
    const [email, setEmail] = useState("")
    const [codigo, setCodigo] = useState("")
    const [senhaVerificada, setSenhaVerificada] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const edvUser = location.state && location.state.edvUser;


    const confirmCodigo = async (e) => {


    }

    const confirmEmail = async (e) => {
        console.log("função email")
        e.preventDefault();
        console.log("OI oi");
        console.log(edvUser)

        try {
            const emailConfirm = await axios.post(
                `http://127.0.0.1:8000/api/v1/email/email`,
                {
                    email: email,
                    edv: edvUser,
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
            if (confirmPass == "" || senhaVerificada == "" || email == "") {
                alert("preencha todos os campos")
                toast.error('Preencha todos os campos', {
                    position: "top-center",
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
                    alert("Informações adicionadas com sucesso")
                    console.log("")
                    const NewDataUser = await axios.put(`http://127.0.0.1:8000/api/v1/users/updatePassword/${edvUser}`, {
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

                } catch (error) {
                    console.error('Erro na requisição:', error);
                }
            }
        } else {
            console.log("senhas não coincidem")
            setSenhaVerificada(false);
        }
    };

    const confirmeCode = async (e) => {

        try {
            const getCode = await axios.get(`http://127.0.0.1:8000/api/v1/email/getcode/`, {
            })
            console.log("teste", getCode.data)
            if (codigo == getCode.data) {
                console.log("acesso permitido")

            } else {
                console.log("acesso negado", confirmCode, codigo)
                console.log("codigo mandado do front", codigo)
                console.log("codigo mandado do back", getCode.data)
            }




        }
        catch (error) {
            console.log(error)

        }






    }

    return (
        <div>
            <h1>PÁGINA DE PRIMEIRO ACESSO</h1>
            <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <button onClick={confirmEmail}>Mandar email</button>

            <input type="text" placeholder='código' value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <button onClick={confirmeCode}>Confirmar código</button>
            <br></br>
            <br></br>
            <input type="password" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder='confirme a senha' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            <button onClick={newPassword}>Mudar senha</button>
        </div>
    )
}

export default FirstAcess