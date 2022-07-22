/* eslint-disable testing-library/prefer-screen-queries */
import ZhaMenu from "./ZhaMenu";
import ZhaGame from "./ZhaGame"
import ZhaTutorial from "./ZhaTutorial"
import ZhaCreateRoom from "./ZhaCreateRoom"
import ZhaJoinRoom from "./ZhaJoinRoom"
import ZhaNewGame from "./ZhaNewGame"
import {render} from '@testing-library/react'
import React from 'react'



jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/zha-game",
      state: {roomID: "test", type: "create", game: "zha"}
    })
}));

describe("Zha components", () => {
    it("Zha menu page renders", () => {
        const {queryByTitle}  = render(<ZhaMenu/>)
        const menu = queryByTitle("ZhaMenu")
        expect(menu).toBeTruthy()
    })
    
    it("Zha game page renders", () =>  {
        const {queryByTitle}  = render(<ZhaGame/>)
        const game = queryByTitle("ZhaGame")
        const gameboard = queryByTitle("ZhaGameboard")
        expect(game).toBeTruthy()
        expect(gameboard).toBeNull()
    })
    
    it("Zha new game page renders", () => {
        const {queryByTitle}  = render(<ZhaNewGame/>)
        const newgame = queryByTitle("ZhaNewGame")
        expect(newgame).toBeTruthy()
    })
    
    it("Zha tutorial page renders", () => {
        const {queryByTitle}  = render(<ZhaTutorial/>)
        const tutorial = queryByTitle("ZhaTutorial")
        expect(tutorial).toBeTruthy()
    })
    
    it("Zha create room page renders", () => {
        const {queryByTitle}  = render(<ZhaCreateRoom/>)
        const createroom = queryByTitle("ZhaCreateRoom")
        expect(createroom).toBeTruthy()
    })
    
    it("Zha join room renders", () => {
        const {queryByTitle}  = render(<ZhaJoinRoom/>)
        const joinroom = queryByTitle("ZhaJoinRoom")
        expect(joinroom).toBeTruthy()
    })
})

