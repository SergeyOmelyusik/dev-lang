import React from "react"
import styles from "./Dashboard.module.css"
import PlayButton from "./../../assets/img/play.svg"

const Dashboard = ({points}) => {

    return(
        <section className={styles.dashboardContainer}>

            <div className={styles.gameBlock}>
            <p>The most populat game is <br />
                <b>Speak IT</b>
            </p> 
            <img className={styles.btnPlay} src={PlayButton} alt="" />
            <button className={styles.btnRandom}>Play random game</button>
            </div>

            <div className={styles.pointsBlock }>
                <span>Common experiens</span>
                <h3>{points} points</h3>
            </div>
            <div className={styles.levelBlock}>
                <span>level</span>
                <h3>{(0.2 * Math.sqrt(points)).toFixed()} level</h3>
                <p>Learn 750 new words in one course</p>

                <div className={styles.levelBackground}></div>
            </div>
        </section>
    
    )
}

export default Dashboard