import { useSelector, useDispatch } from 'react-redux'
import { IoCloseCircle } from 'react-icons/io5'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { db, doc, updateDoc } from '../config'
import { userSelector, updateData } from '../store/reducers/userSlice'

function Bookmarks() {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleRemove = (gid) => {
		const newData = user.bookmarks.filter((item) => item !== gid)

		const docRef = doc(db, 'users', user.uid)
		dispatch(updateData({ bookmarks: newData }))
		updateDoc(docRef, { bookmarks: newData })
	}

	if (!user) router.replace('/auth/login')

	return (
		<>
			<h2 className='text-2xl font-bold mb-3'>Đánh dấu</h2>

			<div className='flex items-center gap-5 flex-wrap'>
				{user?.bookmarks.map((gid) => (
					<div
						key={gid}
						className='flex items-center gap-3 border p-2 rounded-md hover:scale-110 hover:shadow-md transition'>
						<Link href={`/game/${gid}`}>
							<a>GAME ID: {gid}</a>
						</Link>

						<button
							className='hover:text-red-500 transition'
							onClick={() => handleRemove(gid)}>
							<IoCloseCircle size={20} />
						</button>
					</div>
				))}
			</div>
		</>
	)
}

export default Bookmarks
