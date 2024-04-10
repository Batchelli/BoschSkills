import React from 'react'
import { Grid } from 'react-loader-spinner'
import styles from './LoadingPage.module.css'

const LoadinPage = () => {
    return (
        <div className={styles.body}>
            <Grid
                visible={true}
                height="60"
                width="60"
                color="#791d73"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperClass="grid-wrapper"
            />
        </div>
    )
}

export default LoadinPage