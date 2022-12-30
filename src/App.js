import React, {useEffect, useState} from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
import ScoreBoard from "./ScoreBoard";

function App() {
    const [dice, setDice] = useState(() => allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [score, setScore] = useState({rolls: 0, seconds: 0});
    const [highScore, setHighScore] = useState(() =>
        JSON.parse(localStorage.getItem("highScore"))
    );

    useEffect(() => {
        const endGame = dice.every(
            (die) => die.isHeld && die.value === dice[0].value
        );
        setTenzies(endGame);
    }, [dice]);

    useEffect(() => {
        let interval = null;
        if (!tenzies) {
            interval = setInterval(tick, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [tenzies]);

    useEffect(() => {
        if (tenzies && (!highScore || highScore.seconds > score.seconds)) {
            setHighScore(score);
            localStorage.setItem("highScore", JSON.stringify(score));
        }
    }, [tenzies]);

    function allNewDice() {
        const dice = [];
        for (let i = 0; i < 10; i++) {
            dice.push(generateNewDie());
        }
        return dice;
    }

    function rollDice() {
        if (!tenzies) {
            setDice((prevDice) =>
                prevDice.map((die) => {
                    return !die.isHeld ? generateNewDie() : die;
                })
            );
            setScore(prevScore => ({
                ...prevScore,
                rolls: prevScore.rolls + 1
            }));
        } else {
            setDice(allNewDice());
            setScore({rolls: 0, seconds: 0});
        }
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die;
            })
        );
    }

    function tick() {
        setScore(prevScore => ({
            ...prevScore,
            seconds: prevScore.seconds + 1,
        }));
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
            <h1>Tenzies</h1>
            <p>
                Roll until all dice are the same. Click each die to freeze it at its
                current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-btn" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies && <Confetti/>}

            <div className="score">
                <h3>Score</h3>
                <ScoreBoard score={score}/>
            </div>
            <div className="high-score">
                <h3>High score</h3>
                <ScoreBoard score={highScore || {}}/>
            </div>
        </main>
    );
}

export default App;
