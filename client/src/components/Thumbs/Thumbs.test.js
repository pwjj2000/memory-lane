/* eslint-disable testing-library/prefer-screen-queries */
import ThumbsMenu from "./ThumbsMenu";
import ThumbsGame from "./ThumbsGame"
import ThumbsTutorial from "./ThumbsTutorial"
import ThumbsCreateRoom from "./ThumbsCreateRoom"
import ThumbsJoinRoom from "./ThumbsJoinRoom"
import ThumbsNewGame from "./ThumbsNewGame"
import {render} from '@testing-library/react'
import React from 'react'



jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/thumbs-game",
      state: {roomID: "test", type: "create", game: "thumbs"}
    })
  }));

describe("Thumbs components", () => {
    it("Thumbs menu page renders", () => {
        const {queryByTitle}  = render(<ThumbsMenu/>)
        const menu = queryByTitle("ThumbsMenu")
        expect(menu).toBeTruthy()
    })

    it("Thumbs game page renders", () =>  {
        const {queryByTitle}  = render(<ThumbsGame/>)
        const game = queryByTitle("ThumbsGame")
        const gameboard = queryByTitle("ThumbsGameboard")
        expect(game).toBeTruthy()
        expect(gameboard).toBeNull()
    })

    it("Thumbs new game page renders", () => {
        const {queryByTitle}  = render(<ThumbsNewGame/>)
        const newgame = queryByTitle("ThumbsNewGame")
        expect(newgame).toBeTruthy()
    })

    it("Thumbs tutorial page renders", () => {
        const {queryByTitle}  = render(<ThumbsTutorial/>)
        const tutorial = queryByTitle("ThumbsTutorial")
        expect(tutorial).toBeTruthy()
    })

    it("Thumbs create room page renders", () => {
        const {queryByTitle}  = render(<ThumbsCreateRoom/>)
        const createroom = queryByTitle("ThumbsCreateRoom")
        expect(createroom).toBeTruthy()
    })

    it("Thumbs join room renders", () => {
        const {queryByTitle}  = render(<ThumbsJoinRoom/>)
        const joinroom = queryByTitle("ThumbsJoinRoom")
        expect(joinroom).toBeTruthy()
    })
})