import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    function createFace(dots) {
        let dotsArray;
        switch(dots) {
            case 1:
                dotsArray = [0,0,0, 0,1,0, 0,0,0]
                break
            case 2:
                dotsArray = [0,0,1, 0,0,0, 1,0,0]
                break
            case 3:
                dotsArray = [0,0,1, 0,1,0, 1,0,0]
                break
            case 4:
                dotsArray = [1,0,1, 0,0,0, 1,0,1]
                break
            case 5:
                dotsArray = [1,0,1, 0,1,0, 1,0,1]
                break
            case 6:
                dotsArray = [1,0,1, 1,0,1, 1,0,1]
                break
        }
        console.log(dots)
        console.log(dotsArray)

        return new Array(9).fill(0).map((item, index) => {
            return <span class="dot" style={{background: dotsArray[index]===1 ? "black" : "none"}}></span>
        }
             
        )
    }


    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {createFace(props.value)}
        </div>
    )
}