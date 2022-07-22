/* eslint-disable testing-library/prefer-screen-queries */
import ChopsticksMenu from "./ChopsticksMenu";
import ChopsticksGame from "./ChopsticksGame"
import ChopsticksTutorial from "./ChopsticksTutorial"
import ChopsticksCreateRoom from "./ChopsticksCreateRoom"
import ChopsticksJoinRoom from "./ChopsticksJoinRoom"
import ChopsticksNewGame from "./ChopsticksNewGame"
import {render} from '@testing-library/react'
import React from 'react'



jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/chopsticks-game",
      state: {roomID: "test", type: "create", game: "chopsticks"}
    })
}));

describe("Chopsticks components", () => {
    it("Chopsticks menu page renders", () => {
        const {queryByTitle}  = render(<ChopsticksMenu/>)
        const menu = queryByTitle("ChopsticksMenu")
        expect(menu).toBeTruthy()
    })

    it("Chopsticks game page renders", () =>  {
        const {queryByTitle}  = render(<ChopsticksGame/>)
        const game = queryByTitle("ChopsticksGame")
        const gameboard = queryByTitle("ChopsticksGameboard")
        expect(game).toBeTruthy()
        expect(gameboard).toBeNull()
    })

    it("Chopsticks new game page renders", () => {
        const {queryByTitle}  = render(<ChopsticksNewGame/>)
        const newgame = queryByTitle("ChopsticksNewGame")
        expect(newgame).toBeTruthy()
    })

    it("Chopsticks tutorial page renders", () => {
        const {queryByTitle}  = render(<ChopsticksTutorial/>)
        const tutorial = queryByTitle("ChopsticksTutorial")
        expect(tutorial).toBeTruthy()
    })

    it("Chopsticks create room page renders", () => {
        const {queryByTitle}  = render(<ChopsticksCreateRoom/>)
        const createroom = queryByTitle("ChopsticksCreateRoom")
        expect(createroom).toBeTruthy()
    })

    it("Chopsticks join room renders", () => {
        const {queryByTitle}  = render(<ChopsticksJoinRoom/>)
        const joinroom = queryByTitle("ChopsticksJoinRoom")
        expect(joinroom).toBeTruthy()
    })
})