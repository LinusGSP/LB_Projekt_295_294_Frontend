import { render, screen } from '@testing-library/react'
import Cards from '../Cards'

jest.mock("../cards", () => () => <div>CardsRendered</div>)

describe("This is a Testpacket for the cards component", () => {

    test("Testing if the cards content renders", () => {
        render(
            <Cards />
        )
        expect(screen.getByText("CardsRendered")).toBeInTheDocument()
        
    })
})
