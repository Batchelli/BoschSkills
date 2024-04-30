import React, { useState, useEffect } from "react";
import styles from "./Central.module.css"
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import api from "../../../api";
import Navbar from "../../../components/navbar/Navbar"
import { ToastContainer, toast } from "react-toastify";
import LoadinPage from "../../../components/loadingPage/LoadingPage";

const Central = () => {
  const [teamName, setTeamName] = useState([])
  const [trailName, setTrailName] = useState([])
  const [centralTeam, setCentralTeam] = useState('')
  const [centralTrail, setCentralTrail] = useState('')
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState([]);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredTrail, setHoveredTrail] = useState(null);
  const [load, setLoad] = useState(false)

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const pos = () => {
    setCentralTeam([])
    setCentralTrail([])
    setSelectedTeams([])
    setSelectedTrail([])
    setHoveredTeam([])
    setHoveredTrail([])
  }

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
    setLoad(true)
    try {
      const create = await axios.post(`${api}/central/centralizedTeams/`,
        {
          trail_id: centralTrail,
          team_id: centralTeam
        })
      toast.success("Time e trilha associados com sucesso!");
      pos()
      setLoad(false)
    } catch {
      toast.error("Falha ao associar time e trilhas!");
      setLoad(false)
    }
  }

  useEffect(() => {
    team();
    trail();
  }, [])

  const toggleTeamSelection = (teamId) => {
    console.log("ID do usuário selecionado:", teamId);
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams([]);
      setCentralTeam('')
    } else {
      setSelectedTeams([teamId]);
      setCentralTeam(teamId)
    }
  };

  const toggleTrailSelection = (trailId) => {
    console.log("ID do usuário selecionado:", trailId);
    if (selectedTrail.includes(trailId)) {
      setSelectedTrail([]);
      setCentralTrail('')
    } else {
      setSelectedTrail([trailId]);
      setCentralTrail(trailId)
    }
  };

  const color = localStorage.getItem("color")

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
                  onMouseEnter={() => setHoveredTeam(item.Id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  style={{
                    border: `1px solid ${color}`,
                    backgroundColor: selectedTeams.includes(item.Id) ? color : hoveredTeam === item.Id ? color : 'transparent'
                  }}
                  className={styles.btUser}
                >
                  {`${item.Nome}`}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.btSend}>
            <button onClick={centralizer} style={{ border: `1.5px solid ${color}` }}>Associar</button>
          </div>
          <div className={styles.ttCont}>
            <h1>Suas Trilhas</h1>
            <div className={styles.btsOps}>
              {trailName.map((item, index) => (
                <button
                  key={index}
                  value={item.Id}
                  onClick={() => toggleTrailSelection(item.Id)}
                  onMouseEnter={() => setHoveredTrail(item.Id)}
                  onMouseLeave={() => setHoveredTrail(null)}
                  style={{
                    border: `1px solid ${color}`,
                    backgroundColor: selectedTrail.includes(item.Id) ? color : hoveredTrail === item.Id ? color : 'transparent',
                  }}
                  className={styles.btUser}
                >
                  {`${item.Nome}`}
                </button>
              ))}
            </div>
          </div>
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
      {load == true && (
        <LoadinPage />
      )}
    </div>
  )
}

export default Central
