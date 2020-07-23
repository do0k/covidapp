import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'

import Home from "./components/Home"
import Search from "./components/Search"
import CaseRanking from "./components/CaseRanking"
import DeathRanking from "./components/DeathRanking"
import RecoveredRanking from "./components/RecoveredRanking"

function App() {
	return (
			<div className="App">
				<Router>
					<Switch>
						<Route path='/' component={Home} exact />
						<Route path='/ranking/cases' component={CaseRanking} exact />
						<Route path='/ranking/deaths' component={DeathRanking} exact />
						<Route path='/ranking/recovered' component={RecoveredRanking} exact />
						<Route path='/search' component={Search} exact />
					</Switch>
				</Router>
			</div>
	)
}

export default App
