import React from 'react'
import * as ReactDOM from 'react-dom'
import { Default as Carousel } from '../stories/Carousel.stories'

describe('Carousel', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Carousel items={[]} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
