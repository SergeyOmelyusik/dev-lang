import React from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Header from './components/Header/Header'
import Library from './components/Library/Library'
import Learn from './components/Learn/Learn'
import Games from './components/Games/Games'
import WriteIt from './components/Games/AppGames/WriteIt'
import CheckIt from './components/Games/AppGames/ChectIt'
import SelectRt from './components/Games/AppGames/SelectRt'
import styles from './App.module.css'
import { useCookies } from 'react-cookie'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import { useState, useEffect } from 'react'
import Store from './context'

function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('localLibrary')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const [playWords, setPlayWords] = useState(library.slice(-10))
  const [cookie, setCookie] = useCookies(["points"])
  const [correctWords, setCorrectWords] = useState(0)
  const [points, setPoints] = useState(+cookie.points || 0)
  const [errorWords, setErrorWords] = useState(0) 
 
  useEffect(() => {
    if(correctWords) {
      setPoints(points + 1)
      setCookie("points", points + 1)
    }
  },[correctWords])


  const progressBarWidth = { 
    width: `${(100/ library.slice(-10).length) * (wordIndex + 1)}vw` }
  
  const speak = (word, voiceNumder) => {
    const speakInstanse = new SpeechSynthesisUtterance(word)
    const speakInstanseVoice = speechSynthesis.getVoices()
    speakInstanse.voice = speakInstanseVoice[voiceNumder]
    speechSynthesis.speak(speakInstanse);
  }

  return (
    <BrowserRouter>
      <Store.Provider value={{correctWords, setCorrectWords, errorWords, setErrorWords, playWords}}>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard points={points}/>} />
          <Route path="/library" element={<Library library={library} setLibrary={setLibrary}/>} />

          <Route path="/learn" element={<React.Fragment>  
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <section className={styles.gameContainer}>
              <Learn  speak = {speak} library={library} wordIndex={wordIndex} setWordIndex={setWordIndex}/> 
              <div onClick={() => {
              if(wordIndex === library.length-1) {
                setWordIndex(0)
              }
              else {
                setWordIndex(wordIndex+1)
              }
              
            }} className={styles.btnNext}></div>
            </section>
            </React.Fragment> } />

            <Route path="/games" element={<Games/>} />

            <Route path="/games/write-it" element={
            <React.Fragment>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={progressBarWidth}></div>
                </div>
                <nav className={styles.gameNav}>
                <NavLink className={styles.btnBack} to="/games"></NavLink>
                  <ul className={styles.results}>
                    <li>Errors: {errorWords} </li>
                    <li>Correct: {correctWords}</li>
                    <li>Points: {points}</li>
                  </ul>
                </nav>
                <section className={styles.gameContainer}>
                <WriteIt playWords = {playWords} wordIndex = {wordIndex} setWordIndex = {setWordIndex}speak = {speak}/>
                </section>
            </React.Fragment>} />

            <Route path="/games/check-it" element={
            <React.Fragment>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={progressBarWidth}></div>
                </div>
                <nav className={styles.gameNav}>
                <NavLink className={styles.btnBack} to="/games"></NavLink>
                  <ul className={styles.results}>
                    <li>Errors: {errorWords} </li>
                    <li>Correct: {correctWords}</li>
                    <li>Points: {points}</li>
                  </ul>
                </nav>
                <section className={styles.gameContainer}>
                <CheckIt playWords = {playWords} wordIndex = {wordIndex} setWordIndex = {setWordIndex} speak = {speak}/>
                </section>
            </React.Fragment>} />

            <Route path="/games/select-rt" element={
            <React.Fragment>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={progressBarWidth}></div>
                </div>
                <nav className={styles.gameNav}>
                <NavLink className={styles.btnBack} to="/games"></NavLink>
                  <ul className={styles.results}>
                    <li>Errors: {errorWords} </li>
                    <li>Correct: {correctWords}</li>
                    <li>Points: {points}</li>
                  </ul>
                </nav>
                <section className={styles.gameContainer}>
                <SelectRt playWords = {playWords} 
                wordIndex = {wordIndex} 
                setWordIndex = {setWordIndex}
                errorWords = {errorWords}
                setErrorWords = {setErrorWords}
                correctWords = {correctWords}
                setCorrectWords = {setCorrectWords}
                speak = {speak}/>
                </section>
            </React.Fragment>} /> 
        </Routes>
      </Store.Provider>
    </BrowserRouter>
  );
}

export default App
