import { useState, useEffect } from "react"

const Card = ({ title, start, end, image }) => {
	const [time, setTime] = useState({
		days: "",
		hours: "",
		minutes: "",
		seconds: ""
	})

	const startTimer = () => {
		const countDownTime = new Date(start).getTime()
		const x = setInterval(() => {
			const currentTime = new Date().getTime()

			const distance = countDownTime - currentTime

			const days = Math.floor(distance / (1000 * 60 * 60 * 24))
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			)
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((distance % (1000 * 60)) / 1000)

			if (distance < 0) {
				clearInterval(x)
			}

			function pad(number) {
				if (number < 10) {
					return "0" + number
				} else return number
			}

			setTime({
				days: pad(days),
				hours: pad(hours),
				minutes: pad(minutes),
				seconds: pad(seconds)
			})
		}, 1000)
	}

	useEffect(() => {
		startTimer()
	}, [])

	return (
		<div className='card'>
			<div className='card__details1'>
				<p>Title: {title}</p>
				<p>Start Time: {start}</p>
				<p>End Time: {end}</p>
			</div>

			<div className='card__details2'>
				<figure className='card__image-container'>
					<img src={image} alt={title} className='card__image' />
				</figure>
				<p className='card__timer'>
					{new Date(start).getTime() < new Date().getTime() ? (
						<p>Auction Closed</p>
					) : (
						<>
							{`${time.days}days ${time.hours}hrs ${time.minutes}mins ${time.seconds}s left`}
						</>
					)}
				</p>
			</div>
		</div>
	)
}

export default Card
