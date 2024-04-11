import React, { useState, useEffect } from "react";
import styles from "./Central.module.css"
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import api from "../../../api";
import Navbar from "../../../components/navbar/Navbar"

const Central = () => {
  const [teamName, setTeamName] = useState([])
  const [trailName, setTrailName] = useState([])
  const [centralTeam, setCentralTeam] = useState('')
  const [centralTrail, setCentralTrail] = useState('')
  const [selectedTeams, setSetSelectedTeams] = useState([]);
  const [selectedTrail, setSetSelectedTrail] = useState([]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const team = async () => {
    try {
      const response = await axios.get(`${api}/turmas/cTeamByEDV/${decodedToken.edv}`)
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
      const response = await axios.get(`${api}/trail/trailsByCreator/${decodedToken.edv}`)
      const trailData = response.data.map((item) => ({
        Nome: item.nome || "N/A",
        Id: item.id || "N/A",
      }));
      setTrailName(trailData)
    } catch {
    }
  }

  const centralizer = async () => {
    try {
      const create = await axios.post(`${api}/central/centralizedTeams/`,
        {
          trail_id: centralTrail,
          team_id: centralTeam
        })
    } catch {
    }
  }

  useEffect(() => {
    team();
    trail();
  }, [])

  const toggleTeamSelection = (userId) => {
    console.log("ID do usuário selecionado:", userId);
    if (selectedTeams.includes(userId)) {
      setSetSelectedTeams([]);
      setCentralTeam('')
    } else {
      setSetSelectedTeams([userId]);
      setCentralTeam(userId)
    }
  };

  const toggleTrailSelection = (userId) => {
    console.log("ID do usuário selecionado:", userId);
    if (selectedTrail.includes(userId)) {
      setSetSelectedTrail([]);
      setCentralTrail('')
    } else {
      setSetSelectedTrail([userId]);
      setCentralTrail(userId)
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.just}>
        <div className={styles.opsCont}>
          <div className={styles.ttCont}>
            <h1>Seus Times</h1>
            <div className={styles.btsOps}>
              {teamName.map((item, index) => (
                <button
                  key={index}
                  value={item.Id}
                  onClick={() => toggleTeamSelection(item.Id)}
                  className={selectedTeams.includes(item.Id) ? styles.btSelectUser : styles.btUser}
                >
                  {`${item.Nome}`}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.ttCont}>
            <h1>Suas Trilhas</h1>
            <div className={styles.btsOps}>
              {trailName.map((item, index) => (
                <button
                  key={index}
                  value={item.Id}
                  onClick={() => toggleTrailSelection(item.Id)}
                  className={selectedTrail.includes(item.Id) ? styles.btSelectUser : styles.btUser}
                >
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