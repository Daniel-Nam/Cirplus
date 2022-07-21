import { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GrUpgrade } from 'react-icons/gr'
import { RiVipCrown2Fill } from 'react-icons/ri'
import { animated, useSpring } from 'react-spring'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import { userSelector, setData } from '../../store/reducers/userSlice'
import { signOut, auth } from '../../config'

function Actions() {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()
	const router = useRouter()
	const [on, setOn] = useState(false)

	const { opacity, y } = useSpring({
		opacity: on ? 1 : 0,
		y: on ? 10 : 100,
	})

	const toggle = () => setOn(!on)

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(setData(null))
				router.replace('/auth/login')
			})
			.catch((err) => console.log(err))
	}

	return (
		<div>
			{user ? (
				<div className='relative h-9'>
					<button onClick={toggle}>
						<Image
							src={user.photoURL}
							alt={user.displayName}
							width={36}
							height={36}
							className='block object-cover cursor-pointer rounded-full shadow'
						/>
					</button>

					<animated.div
						className='absolute top-full right-0 min-w-[240px] py-3 px-5 bg-white rounded-md border shadow-xl'
						style={{
							transform: y.to((y) => `translate3d(0,${y}%,0)`),
							opacity,
							visibility: opacity.to((o) =>
								o === 0 ? 'hidden' : 'visible'
							),
						}}>
						<div className='flex items-center justify-between flex-wrap'>
							<div
								className={clsx('font-semibold space-x-1', {
									'text-amber-500': user.isVip,
								})}>
								<span>{user.displayName}</span>
								<span>({user.isVip ? 'VIP' : 'Thường'})</span>
							</div>

							{user.isVip ? (
								<RiVipCrown2Fill
									size={20}
									className='text-amber-500'
								/>
							) : (
								<Link href='/upgrade'>
									<a>
										<GrUpgrade size={20} />
									</a>
								</Link>
							)}
						</div>

						<div className='text-sm text-gray-600 my-2'>
							<p>{user.email}</p>
							<p>{user.uid}</p>
						</div>

						<button
							className='block w-full p-2 text-center bg-red-500 text-white rounded-md hover:bg-red-600 transition'
							onClick={handleSignOut}>
							Đăng xuất
						</button>
					</animated.div>
				</div>
			) : (
				<Link href='/auth/login'>
					<a className='btn btn-primary'>Đăng nhập</a>
				</Link>
			)}
		</div>
	)
}

export default memo(Actions)
