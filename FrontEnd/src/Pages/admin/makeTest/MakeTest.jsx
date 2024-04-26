import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import styles from "./MakeTest.module.css";

import CriarTest from "../../../components/criarTest/CriarTest";

const MakeTest = () => {


  return (
    <div className={styles.container}>
      <Navbar />
      <CriarTest/>  
    </div>
  );
};

export default MakeTest;
