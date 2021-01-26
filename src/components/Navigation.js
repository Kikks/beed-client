import { Link } from "react-router-dom"

const Navigation = () => {
	return (
		<nav>
			<h2>Auctions</h2>

			<div>
				<Link to='/'>Home</Link>
				<Link to='/new'>Create</Link>
			</div>
		</nav>
	)
}

export default Navigation
