import React from 'react'
import styles from "./InputImg.module.css"
import { FiUpload } from "react-icons/fi";

const InputImg = ({onChange, onClick, id, image}) => {
    return (
        <div className={styles.contImg}>
            <input type="file" onChange={onChange} id={id} className={styles.fileinput} />
            <button onClick={onClick} className={styles.btImg} style={{ backgroundImage: `url(${image})` }}>
                {image == null && (
                    <div className={styles.props}>
                        <FiUpload size={75} />
                        Enviar Arquivo
                    </div>
                )}
            </button>
        </div>
    )
}

export default InputImg

// id="fileInput"