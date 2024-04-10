import React from 'react'
import styles from './HubAdd.module.css'

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";
import addTeam from "../../../../components/assets/AddTicon-W.svg";
import addUser from "../../../../components/assets/AddUicon-W.svg";


const HubAdd = () => {
    return (
        <div>
            <NavBar />
            <section className={styles.cards}>
                <CardsCad
                    title="Adicionar Time"
                    desc="Area destinada a adição de times as suas trilhas."
                    icon={addTeam}
                    color="blue"
                    path="skills/adicionarTime"
                />

                <CardsCad
                    title="Adicionar Usuário"
                    desc="Area destinada a adição de usuário as suas trilhas."
                    icon={addUser}
                    color="pink"
                    path="skills/hubTrilhas"
                />
            </section>
        </div>
    )
}

export default HubAdd