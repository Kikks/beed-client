import { useState, useEffect } from "react"
import axios from "axios"
import Card from "../components/Card"

const Home = () => {
	const [auctions, setAuctions] = useState([])

	useEffect(() => {
		axios
			.get("https://beed-server1234.herokuapp.com/fetch-auctions")
			.then(res => {
				setAuctions(res.data)
			})
			.catch(err => {
				console.log(err.response.data)
			})
	}, [])

	return (
		<div className='card__container'>
			{auctions.map(({ title, start, end, image }, id) => (
				<Card key={id} title={title} start={start} end={end} image={image} />
			))}
		</div>
	)
}

export default Home
