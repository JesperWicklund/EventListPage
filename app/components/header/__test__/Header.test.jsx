import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../../header'


it('should render the same header passed as props', () => {
    render(<Header/>)
    const headingElement = screen.getByText('Eventi')

    expect(headingElement).toBeInTheDocument()
})