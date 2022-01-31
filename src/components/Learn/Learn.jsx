import React, { useEffect } from "react"
import styles from "./Learn.module.css"

const Learn = ({library, wordIndex, speak}) => {

    useEffect(() => {
        speak(library[wordIndex].translate, 3)
    },[wordIndex])
    return(
        <section style={{textAlign: 'center'}}>
        <span>{library[wordIndex].word}</span>
        <h3>{library[wordIndex].translate}</h3>
        </section>
    )
}

export default Learn