import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'


jest.mock("../GlobalNavigation", () => () => <div>NavigationRendered</div>)

describe("This is a Testpacket for the App component", () => {
  test("Testing if the navigation component renderers", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
      )
    expect(screen.getByText("NavigationRendered")).toBeInTheDocument()
  })

  test("Testing if the Create component renders", () => {
    render(
        <MemoryRouter initialEntries={["/create"]}>
          <App />
        </MemoryRouter>
    )
    expect(screen.getByText("Hier kannst du ein neues Lernset erstellen.")).toBeInTheDocument()
  })

  test("Testing if the notfound site renders", () => {
    render(
      <MemoryRouter initialEntries={["/notfound"]}>
          <App />
      </MemoryRouter>
    )
    expect(screen.getByText("the page was not not found")).toBeInTheDocument()
  })

})
