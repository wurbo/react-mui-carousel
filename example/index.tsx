import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Carousel } from '../.'

const Item: React.FC<{ value: number }> = ({ value }) => {
    return <div style={{ backgroundColor: 'red', height: 50, width: 200 }} key={value}>
        Item {value}
    </div>
}

const App = () => {
    const items = [<Item value={1}/>,<Item value={2}/>,<Item value={3}/>,<Item value={4}/>]
    return <div style={{ width: 300 }}>
        <Carousel items={items} />
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
