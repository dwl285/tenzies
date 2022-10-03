import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [totalRolls, setTotalRolls] = React.useState(0)
    const [startTime, setStartTime] = React.useState(new Date())
    const [lastGameLength, setLastGameLength] = React.useState(() => localStorage.getItem("lastTenziesTime") || "")
    const [bestGameLength, setBestGameLength] = React.useState(() => localStorage.getItem("bestTenziesTime") || "")

    React.useEffect(() => (
      localStorage.setItem("lastTenziesTime", lastGameLength)
    ), [lastGameLength])

    React.useEffect(() => (
      localStorage.setItem("bestTenziesTime", bestGameLength)
    ), [bestGameLength])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setTotalRolls(oldRolls => oldRolls + 1)
        } else {
            const lastGameLength = (new Date() - startTime)/1000
            setLastGameLength(lastGameLength)
            if (lastGameLength < bestGameLength) {
                setBestGameLength(lastGameLength)
            }
            setTenzies(false)
            setDice(allNewDice())
            setTotalRolls(0)
            setStartTime(new Date())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            {totalRolls && <h2>Rolls this game: {totalRolls}</h2>}
            {lastGameLength && <h2>Last game length: {Math.floor(lastGameLength)} seconds</h2>}
            {bestGameLength && <h2>Best game length: {Math.floor(bestGameLength)} seconds</h2>}
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}