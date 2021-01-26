import { useState } from "react"
import axios from "axios"

const New = ({ setBackdrop }) => {
	const [auction, setAuction] = useState({
		title: "",
		start: "",
		end: "",
		image: ""
	})

	const [errors, setErrors] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const [loading, setLoading] = useState(false)

	const uploadImage = e => {
		setBackdrop(true)
		const image = e.target.files[0]
		const formData = new FormData()
		formData.append("image", image, image.name)
		axios
			.post("https://beed-server1234.herokuapp.com/upload-image", formData)
			.then(res => {
				setAuction({ ...auction, image: res.data.url })
				setBackdrop(false)
			})
			.catch(err => {
				setErrors(err.response.data)
				setBackdrop(false)
			})
	}

	const submitHandler = e => {
		setLoading(true)
		e.preventDefault()
		axios
			.post("https://beed-server1234.herokuapp.com/create-auction", auction)
			.then(() => {
				setLoading(false)
				setSubmitted(true)
			})
			.catch(err => {
				setLoading(false)
				setErrors(err.response.data)
			})
	}

	let formContent

	if (!submitted) {
		formContent = (
			<>
				<h2>Create An Auction!</h2>
				<div className='input__container'>
					<h3>Auction Title</h3>
					<input
						type='text'
						value={auction.title}
						onChange={e => setAuction({ ...auction, title: e.target.value })}
						placeholder='Title'
					/>

					{errors.title && (
						<p style={{ color: "red", fontSize: 14 }}>{errors.title}</p>
					)}
				</div>

				<div className='input__container'>
					<h3>Start Date</h3>
					<input
						type='datetime-local'
						value={auction.start}
						onChange={e => setAuction({ ...auction, start: e.target.value })}
					/>

					{errors.start && (
						<p style={{ color: "red", fontSize: 14 }}>{errors.start}</p>
					)}
				</div>

				<div className='input__container'>
					<h3>End Date</h3>
					<input
						type='datetime-local'
						value={auction.end}
						onChange={e => setAuction({ ...auction, end: e.target.value })}
					/>

					{errors.end && (
						<p style={{ color: "red", fontSize: 14 }}>{errors.end}</p>
					)}
				</div>

				<div className='input__container'>
					<h3>Upload Image</h3>
					{auction.image.trim("") === "" ? (
						<input type='file' onChange={uploadImage} />
					) : (
						<p>Image Uploaded Successfully</p>
					)}
					{errors.image && (
						<p style={{ color: "red", fontSize: 14 }}>{errors.image}</p>
					)}
				</div>

				<button disabled={loading ? true : false} type='submit'>
					Submit
				</button>
			</>
		)
	} else {
		formContent = (
			<>
				<p>You have created an Auction Successfully</p>

				<button
					onClick={() => {
						setSubmitted(false)
						setErrors({})
						setAuction({ title: "", start: "", end: "", image: "" })
					}}
				>
					Create New Auction
				</button>
			</>
		)
	}

	return <form onSubmit={submitHandler}>{formContent}</form>
}

export default New
