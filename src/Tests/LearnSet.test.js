import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'
import LearnSet from '../LearnSet'

describe("This is a Testpacket for the LearnSet component", () => {

    test("Testing if the LearnSet content renders", () => {
        const { container } = render(
            <LearnSet />
        )
        expect(container.firstChild).toHaveClass("content")
    })

})