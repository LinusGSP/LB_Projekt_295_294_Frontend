import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'


describe("This is a Testpacket for the Home component", () => {
    test("Testing Home renders", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText("Wilkommen bei QuizMe")).toBeInTheDocument()
    })

})