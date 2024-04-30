import React from 'react'
import { Grid } from 'react-loader-spinner'
import styles from './LoadingPage.module.css'

const LoadinPage = () => {

    const color = localStorage.getItem('color')

    return (
        <div className={styles.body}>
            <Grid
                visible={true}
                height="60"
                width="60"
                color={color}
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperClass="grid-wrapper"
            />
        </div>
    )
}

export default LoadinPage