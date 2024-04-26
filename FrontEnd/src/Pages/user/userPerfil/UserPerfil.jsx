import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../../components/navbar/Navbar";
import styles from "./UserPerfil.module.css";
import axios from 'axios';


const UserPerfil = () => {
  const [dataCli, setDataCli] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar a edição

  useEffect(() => {
    const pesquisar = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/user/92902035/`);
        setDataCli(response.data);
      } catch (erro) {
        console.error(erro);
      }
    };

    pesquisar();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Ativa o modo de edição
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataCli(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveClick = async () => {
    try {
      // Aqui você pode enviar os dados atualizados para o servidor
      // por meio de uma requisição HTTP, usando axios ou outra biblioteca
      // Exemplo:
      await axios.put(`http://127.0.0.1:8000/api/v1/users/updateUserInfo/92902035`, dataCli);
      setIsEditing(false); // Desativa o modo de edição após salvar
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.firstText}>
        <h1 className={styles.textTrilha}>Trilhas conquistadas</h1>
      </div>
      <div className={styles.divCentral}>
        <div className={styles.divPerfil}>
          <img className={styles.foto} src="" alt="" />
          {!isEditing ? (
            <button className={styles.btnEdit} onClick={handleEditClick}>Editar Perfil</button>
          ) : (
            <button className={styles.btnSave} onClick={handleSaveClick}>Salvar</button>
          )}
          <div className={styles.textDiv}>
            <div className={styles.text}>
              <input
                className={styles.text}
                type="text"
                name="name"
                value={dataCli.name || ''}
                placeholder="Nome"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <input 
                className={styles.text}
                type="text"
                name="edv"
                value={dataCli.edv || ''}
                placeholder="EDV"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <input
                className={styles.text}
                type="text"
                name="email_user"
                value={dataCli.email_user || ''}
                placeholder="E-mail"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <input
                className={styles.text}
                type="text"
                name="user_area"
                value={dataCli.user_area || ''}
                placeholder="Área"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <input
                className={styles.text}
                type="text"
                name="focal_point"
                value={dataCli.focal_point || ''}
                placeholder="Focal-Point"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className={styles.containerInfo}>
          <p className={styles.pag}>DEV</p>
          <div className={styles.textImg}>
            <img className={styles.imgT} src='' alt="" />
            <p className={styles.info}>Conquista de conclusão do curso DEV</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPerfil;
