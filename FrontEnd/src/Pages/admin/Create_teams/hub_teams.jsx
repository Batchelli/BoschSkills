import Navbar from "../../../components/navbar/Navbar";
import styles from "./hub_teams.module.css";
import Card from "../../../components/cards/cardTri/Card";

const Hubteams = () => {
	return (
  
		<div className={styles.containerTeams}>
			<Navbar />
            <button className={styles.teams}>Criar Times</button>
			<section className={styles.trilhasTeams}>
				<Card url={"/trilha"} />
				<Card url={"/criacao"} />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</section>
		</div>
	);
};

export default Hubteams;