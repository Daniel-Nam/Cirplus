import { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'

function CategoryItem({ name, description, loading }) {
	return (
		<Link href={`/categories/${name}`}>
			<a className='block p-2 rounded-md border hover:scale-105 transition hover:bg-gray-200'>
				<h3 className='text-lg font-bold'>
					{loading ? <Skeleton /> : name}
				</h3>
				<p className='text-gray-600 text-sm'>
					{loading ? <Skeleton /> : description}
				</p>
			</a>
		</Link>
	)
}

export default memo(CategoryItem)
