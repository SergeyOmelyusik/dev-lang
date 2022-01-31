import React, {useRef, useMemo, useContext} from "react"
import styles from "./AppGames.module.css"
import Store from "../../../context"

const WriteIt = ({setWordIndex, wordIndex, speak}) => {

    const data = useContext(Store)
    const input = useRef()
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), [])

    const checkWord = (event) => {
        event.preventDefault()
        if((input.current.value).toLowerCase() === (randomWords[wordIndex].translate).toLowerCase()) {

            data.setCorrectWords(data.correctWords + 1)
            speak(randomWords[wordIndex].translate, 3)
                if(wordIndex !== data.playWords.length - 1) {
                    setWordIndex(wordIndex + 1)
                } else {
                    alert("Game is over")
                    setWordIndex(0)
                }
                input.current.value = ""
        } else {
            data.setErrorWords(data.errorWords + 1)
            speak(false, 3)
        }
        
    }

    return(
        <section >
            <span>write a translation for this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <form onSubmit={checkWord} className={styles.writeWordBlock}>
                <input ref={input} type="text" placeholder="Type your word here" />
                <button className={styles.btnOk}>OK</button>
            </form>
        </section>

    )
}

export default WriteIt