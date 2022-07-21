import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextSeo } from 'next-seo'
import { AiFillHome } from 'react-icons/ai'
import { BsFacebook, BsTwitter, BsFillBookmarkStarFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import clsx from 'clsx'

import { ContentOnly } from '../../layouts'
import { doc, updateDoc, db } from '../../config'
import { updateData, userSelector } from '../../store/reducers/userSlice'

function Game() {
	const router = useRouter()
	const dispatch = useDispatch()
	const user = useSelector(userSelector)
	const { gid } = router.query
	const [marked, setMarked] = useState(user?.bookmarks.includes(gid))
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const shareURL = `https://${process.env.SITE_NAME.toLowerCase()}.vercel.app/game/${gid}`

	useEffect(() => {
		axios
			.get(`${process.env.BASE_URL}/game?sid=1&gid=${gid}`)
			.then((res) => setData(res.data.data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false))
	}, [gid])

	const handleBookmark = () => {
		setMarked(!marked)
		const id = toast.info('Đang đánh dấu...')

		if (!user) {
			toast.update(id, {
				render: 'Bạn cần đăng nhập để thực hiện chức năng này',
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			})
			return
		}

		const docRef = doc(db, 'users', user.uid)

		const isExist = user.bookmarks.find((item) => item === gid)
		if (isExist) {
			const newBookmarks = user.bookmarks.filter((item) => item !== gid)
			updateDoc(docRef, { bookmarks: newBookmarks }).then(() => {
				dispatch(updateData({ bookmarks: newBookmarks }))
				toast.update(id, {
					render: 'Đã xóa khỏi danh sách đánh dấu',
					type: 'success',
					autoClose: 3000,
					isLoading: false,
				})
			})
			return
		}

		const newBookmarks = [...user.bookmarks, gid]
		updateDoc(docRef, {
			bookmarks: newBookmarks,
		})
			.then(() => {
				dispatch(updateData({ bookmarks: newBookmarks }))
				toast.update(id, {
					render: 'Đã thêm vào danh sách đánh dấu',
					type: 'success',
					autoClose: 3000,
					isLoading: false,
				})
			})
			.catch((err) => console.log(err))
	}

	return (
		<>
			<NextSeo
				title={`${data?.title || 'LOADING...'} | ${
					process.env.SITE_NAME
				}`}
				description={`${data?.title} is a game on ${process.env.SITE_NAME} play with your friends now!`}
			/>

			<div>
				{loading ? (
					<Skeleton height={400} borderRadius='0.375rem' />
				) : (
					<iframe
						src={data.url}
						frameBorder='0'
						className='block w-full max-w-[960px] mx-auto aspect-video rounded-md'></iframe>
				)}
			</div>

			<div className='mt-3'>
				<div className='flex items-center gap-3'>
					<h1 className='font-bold text-xl'>
						{loading ? <Skeleton /> : data.title}
					</h1>

					<button
						className={clsx('hover:text-amber-500 transition', {
							'text-amber-500': marked,
						})}
						onClick={handleBookmark}>
						<BsFillBookmarkStarFill size={20} />
					</button>
				</div>

				<p className='text-gray-600 md:text-lg'>
					{loading ? <Skeleton count={5} /> : data.description}
				</p>

				<div className='flex items-center gap-3'>
					{loading ? (
						<Skeleton />
					) : (
						<>
							<div>Thể loại:</div>
							<div>
								{data.categories.map((category) => (
									<span
										key={category}
										className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
										{category}
									</span>
								))}
							</div>
						</>
					)}
				</div>

				<p>
					{loading ? (
						<Skeleton />
					) : (
						`Cập nhật gần nhất: ${data.lastUpdate}`
					)}
				</p>

				<div className='flex items-center gap-3 flex-wrap'>
					<a
						href={`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-3 w-fit mt-2 p-2 bg-blue-500 text-white hover:bg-blue-600 transition rounded-md'>
						<BsFacebook />
						<span>Facebook</span>
					</a>

					<a
						href={`https://twitter.com/intent/tweet?text=Play ${data?.title.trim()} on ${
							process.env.SITE_NAME
						} now!&url=${shareURL}`}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-3 w-fit mt-2 p-2 bg-blue-500 text-white hover:bg-blue-600 transition rounded-md'>
						<BsTwitter />
						<span>Twitter</span>
					</a>

					<Link href='/'>
						<a className='flex items-center gap-3 w-fit mt-2 p-2 bg-red-500 text-white hover:bg-red-600 transition rounded-md'>
							<AiFillHome />
							<span>Quay về</span>
						</a>
					</Link>
				</div>
			</div>
		</>
	)
}

Game.Layout = ContentOnly

export default Game
