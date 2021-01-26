import { useState } from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./container/Home"
import New from "./container/New"
import Navigation from "./components/Navigation"

import "./App.css"

function App() {
	const [backdrop, setBackdrop] = useState(false)

	return (
		<div className='App'>
			{backdrop && (
				<div className='backdrop'>
					<span>Loading...</span>
				</div>
			)}

			<main>
				<Navigation />
				<Switch>
					<Route path='/new'>
						<New setBackdrop={setBackdrop} />
					</Route>
					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</main>
		</div>
	)
}

export default App
