
import React from "react";
import styles from "./CardAdm.module.css";
import { Link } from "react-router-dom";


const CardAdm = ({ title, desc, icon, iconH, color, link }) => {
  let cor;
  if (color === "blue") {
    cor = styles.blue;
  } else if (color === "green") {
    cor = styles.green;
  } else if (color === "pink") {
    cor = styles.pink;
  } else {
    cor = "";
  }

  return (
    <Link to={link} className={`${styles.card}`} id={`${cor}`}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div className={styles.desc}>
        <p>
          {desc}
        </p>
      </div>
      <div className={styles.cardImg}>
        <img src={icon} alt="Card Img" className={styles.imgNH}/>
        <img src={iconH} alt="Card Img" className={styles.imgH}/>
      </div>
      
    </Link>
  );
};

export default CardAdm;
