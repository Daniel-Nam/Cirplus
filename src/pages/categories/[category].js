import { useRouter } from 'next/router'
import { useEffect, useState, memo } from 'react'
import axios from 'axios'
import RenderGames from '../../components/RenderGames'

function Category() {
	const router = useRouter()
	const { category } = router.query
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios
			.get(`${process.env.BASE_URL}/games?category=${category}`)
			.then((res) => setData(res.data.data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false))
	}, [category])

	return <RenderGames data={data} loading={loading} />
}

export default memo(Category)
