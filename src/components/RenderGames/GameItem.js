import { useRouter } from 'next/router'
import { useState, memo } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'

function GameItem({ item, loading }) {
	const router = useRouter()
	const [readMore, setReadMore] = useState(false)

	const handleClick = (e) => {
		e.preventDefault()
		router.push(`/game/${item.id}`)
	}

	const toggle = () => setReadMore(!readMore)

	return (
		<div className='p-2 border rounded-md hover:shadow-xl hover:scale-105 transition'>
			{loading ? (
				<Skeleton height={160} borderRadius='0.375rem' />
			) : (
				<Link href={`/game/${item.id}`}>
					<a className='block'>
						<div
							className='w-full bg-cover rounded-md bg-center bg-no-repeat h-[160px]'
							style={{
								backgroundImage: `url("${item.thumbnailUrl100}")`,
							}}
						/>
					</a>
				</Link>
			)}

			<div className='flex flex-col h-[calc(100%-160px)] pt-2'>
				<h3 className='text-center text-lg font-bold leading-tight'>
					{loading ? <Skeleton /> : item.title}
				</h3>

				<div className='text-center text-sm text-gray-600 mb-auto'>
					{loading ? (
						<Skeleton count={5} />
					) : (
						<>
							<span>
								{readMore
									? item.description + ' '
									: item.description.substring(0, 97) +
									  '... '}
							</span>

							<button
								className='text-blue-500 font-semibold'
								onClick={toggle}>
								{readMore ? 'bớt' : 'thêm'}
							</button>
						</>
					)}
				</div>

				<div className='mt-auto'>
					<button
						className='btn btn-play mx-auto'
						onClick={handleClick}>
						<BsPlayFill />
						<span>Bắt đầu</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default memo(GameItem)
