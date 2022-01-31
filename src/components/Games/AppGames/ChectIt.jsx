import React, {useState, useEffect, useMemo, useContext} from "react"
import styles from "./AppGames.module.css"
import Store from "../../../context"


const CheckIt = ({setWordIndex, wordIndex, speak}) => {

    const data = useContext(Store)
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), [])
    const [currentWords, setCurrentWords] = useState(["random1", "correct", "random2"])
    
    useEffect(() => {
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex+1)%randomWords.length].word,
            randomWords[(wordIndex+2)%randomWords.length].word,
        ].sort(() => Math.random() -0.5))
    }, [data.correctWords])

    const checkWord = (word) => {
        if (word.toLowerCase() === (randomWords[wordIndex].word).toLowerCase()) {
            data.setCorrectWords(data.correctWords + 1)
            speak(true, 3)
                if(wordIndex !== data.playWords.length - 1) {
                    setWordIndex(wordIndex + 1)
                } else {
                    alert("Game is over")
                    setWordIndex(0)
                }
        } else {
            data.setErrorWords(data.errorWords + 1)
            speak(false, 3)
        }
    }

    return(
        <section >
            <span>write a translation for this word</span>
            <h3>{randomWords[wordIndex].translate}</h3>

            <ul className={styles.btnContainer}>
                {currentWords.map((word, index) => (
                    <li key={index} className={styles.btnCheck} onClick={() => {checkWord(word)}}>{word}</li>
                ))}
            </ul>
        </section>

    )
}

export default CheckIt