/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it("App renders", () => {
    const {queryByTitle}  = render(<App/>)
    const app = queryByTitle("App")
    expect(app).toBeTruthy()
  })
})
