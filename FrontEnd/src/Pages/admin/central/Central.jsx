import React, { useState, useEffect } from "react";
import styles from "./Central.module.css"
import axios from "axios";
import api from "../../../api";

import Navbar from "../../../components/navbar/Navbar"

const Central = () => {
  const [teamName, setTeamName] = useState([])
  const [trailName, setTrailName] = useState([])
  const [centralTeam, setCentralTeam] = useState('')
  const [centralTrail, setCentralTrail] = useState('')
  const [color, setColor] = useState('#fff')

  const team = async () => {
    try {
      const response = await axios.get(`${api}/turmas/cTeamByEDV/92902660`)
      const teamData = response.data.map((item) => ({
        Nome: item.team_name || "N/A",
        Id: item.id || "N/A",
      }));
      setTeamName(teamData)
    } catch {
    }
  }

  const trail = async () => {
    try {
      const response = await axios.get(`${api}/trail/trailsByCreator/92902660`)
      const trailData = response.data.map((item) => ({
        Nome: item.nome || "N/A",
        Id: item.id || "N/A",
      }));
      setTrailName(trailData)
    } catch {
    }
  }

  const test = (e) => {
    setCentralTrail(e.target.value)
    setColor("#E8F1FF")
  }

  const centralizer = async () => {
    try {
      const create = await axios.post(`${api}/central/centralizedTeams/${centralTeam}/${centralTrail}`, {})
    } catch {
    }
  }

  console.log("Team: ", centralTeam)
  console.log("Trail: ", centralTrail)

  useEffect(() => {
    team();
    trail();
  }, [])

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.just}>
        <div className={styles.opsCont}>
          <div className={styles.ttCont}>
            <h1>Suas Trilhas</h1>
            <div className={styles.btsOps}>
              {trailName.map((item, index) => (
                <button key={index} value={item.Id} onClick={test}>
                  {`${item.Nome}`}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.ttCont}>
            <h1>Seus Times</h1>
            <div className={styles.btsOps}>
              {teamName.map((item, index) => (
                <button key={index} value={item.Id} onClick={(e) => setCentralTeam(e.target.value)}>
                  {`${item.Nome}`}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.btSend}>
            <button onClick={centralizer}>Definir Trilhas</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Central