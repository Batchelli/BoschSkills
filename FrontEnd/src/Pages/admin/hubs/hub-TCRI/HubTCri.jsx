import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./HubTCri.module.css";
import CardCTri from "../../../../components/cards/cardCTri/CardCTri";
import axios from "axios";
import api from "../../../../api";
import { jwtDecode } from "jwt-decode";

const HubTCri = () => {
    const [trilhas, setTrilhas] = useState([]); // Estado para armazenar as trilhas
    const [lider, setLider] = useState('');

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    const fetchTrails = async () => {
        try {
            const response = await axios.get(`${api}/trail/trailsByCreator/${decodedToken.edv}`);
            setTrilhas(response.data); // Define as trilhas no estado
        } catch (error) {
            console.error("Erro ao buscar trilhas:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${api}/users/user/${decodedToken.edv}`);
            setLider(response.data.name);
        } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
        }
    };

    useEffect(() => {
        fetchTrails();
        fetchUser();
    }, []); // Executar somente uma vez ao montar o componente

    return (
        <div className={styles.container}>
            <Navbar />
            <section className={styles.trilhas}>
                {trilhas.map((trilha, index) => (
                    <CardCTri
                        key={index}
                        nome={trilha.nome}
                        lider={lider}
                        img={trilha.image_trail}
                    />
                ))}
            </section>
        </div>
    );
};

export default HubTCri;
