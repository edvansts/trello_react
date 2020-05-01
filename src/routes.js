import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import Main from "./pages/Main/App"
import Boards from "./pages/Boards/App"
import Lists from "./pages/Lists/App"

export default class Routes extends React.Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/boards" component={Boards}/>
                        <Route path="/lists"component={Lists}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}