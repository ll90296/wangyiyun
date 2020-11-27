import Index from './pages/index'
import List from './pages/list'
import Play from './pages/play'

import { Switch, Route, Redirect } from 'react-router-dom'
function App() {
    return (
        <Switch>
            <Route path="/index" component={Index}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="/play" component={Play}></Route>
            <Redirect to="/index"></Redirect>
        </Switch>
    )
}


export default App