import React from 'react'
import styles from './HubTris.module.css'

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";
import TriIcon from "../../../../components/assets/triIconW.svg";

const HubTris = () => {
    return (
        <div>
            <NavBar />
            <section className={styles.cards}>
                <CardsCad
                    title="Trilhas Criadas"
                    desc="Hub de trilhas criadas por você."
                    icon={TriIcon}
                    color="blue"
                    path="skills/trilhascriadas"
                />
        
                <CardsCad
                    title="Trilhas Atreladas"
                    desc="Hub de trilhas atreladas a você."
                    icon={TriIcon}
                    color="pink"
                    path="skills/hubTrilhas"
                />
            </section>
        </div>
    )
}

export default HubTris