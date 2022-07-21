import { useState, useEffect } from 'react'
import axios from 'axios'
import RenderGames from '../components/RenderGames'

function Home() {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		axios
			.get(`${process.env.BASE_URL}/games?sid=1`)
			.then((res) => setData(res.data.data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false))
	}, [])

	return <RenderGames data={data} loading={loading} />
}

export default Home
