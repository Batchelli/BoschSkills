import React from "react";
import styles from "./CorpoTri.module.css";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";

const CorpoTri = ({conteudoTri}) => {
    const trilhaSalva = JSON.parse(localStorage.getItem("trilha")) || [];

    return (
        <div className={styles.container}>
           
        </div>
    );
};

export default CorpoTri;