import { useState, useEffect } from 'react'
import axios from 'axios'
import CategoryItem from './CategoryItem'

export default function Categories() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios
			.get(`${process.env.BASE_URL}/categories`)
			.then((res) => setData(res.data.data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false))
	}, [])

	return (
		<div className='grid grid-cols-2 gap-5'>
			{data.map((category) => (
				<CategoryItem
					key={category.id}
					name={category.name}
					description={category.description}
					loading={loading}
				/>
			))}
		</div>
	)
}
