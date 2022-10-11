import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'

describe("This is a Testpacket for the notfound component", () => {

    test("Testing if the NotFound content renders", () => {
        render(
            <MemoryRouter initialEntries={["/notfound"]}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText("the page was not not found")).toBeInTheDocument()
    })

})
