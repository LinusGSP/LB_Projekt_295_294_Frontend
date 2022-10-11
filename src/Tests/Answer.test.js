import { render, screen } from '@testing-library/react'
import Answer from '../Answer'

jest.mock("../answer", () => () => <div>AnswerRendered</div>)

describe("This is a Testpacket for the Answer component", () => {

    test("Testing if the answer content renders", () => {
        render(
            <Answer />
        )
        expect(screen.getByText("AnswerRendered")).toBeInTheDocument()
        
    })
})
