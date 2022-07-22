/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import OverallLeaderboard from './OverallLeaderboard';
import ZhaLeaderboard from './ZhaLeaderboard';
import ChopsticksLeaderboard from './ChopsticksLeaderboard';
import ThumbsLeaderboard from './ThumbsLeaderboard';


describe("Leaderboard components", () => {
    it("should render Overall Leaderboard", () => {
        const {queryByTitle}  = render(<OverallLeaderboard/>)
        const overall = queryByTitle("OverallLeaderboard")
        expect(overall).toBeTruthy()
      })
      
      it("should render Zha Leaderboard", () => {
          const {queryByTitle}  = render(<ZhaLeaderboard/>)
          const zha = queryByTitle("ZhaLeaderboard")
          expect(zha).toBeTruthy()
      })
      
      it("should render Chopsticks Leaderboard", () => {
          const {queryByTitle}  = render(<ChopsticksLeaderboard/>)
          const chopsticks = queryByTitle("ChopsticksLeaderboard")
          expect(chopsticks).toBeTruthy()
      })
      
      it("should render Thumbs Leaderboard", () => {
          const {queryByTitle}  = render(<ThumbsLeaderboard/>)
          const thumbs = queryByTitle("ThumbsLeaderboard")
          expect(thumbs).toBeTruthy()
      })
})
