import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'

import { db, doc, setDoc, getDoc } from '../../config'
import { uniqueSlug } from '../../utils'
import Providers from './Providers'

function Register() {
	const router = useRouter()
	const [err, setErr] = useState('')

	const handleAuth = async (user) => {
		const id = toast.loading(
			'Đang kiểm tra đăng ký, vui lòng đợi một chút...'
		)

		const docRef = doc(db, 'users', user.uid)
		const docSnap = await getDoc(docRef)

		// ! nếu đã có tài khoản thì chỉ đăng nhập
		if (docSnap.exists()) {
			setErr(null)

			toast.update(id, {
				render: 'Đăng nhập thành công!',
				type: 'success',
				isLoading: false,
			})

			setTimeout(() => {
				toast.dismiss(id)
				router.replace('/')
			}, 3000)

			return
		}

		// ! Trường hợp chưa có tài khoản
		toast.update(id, { render: 'Chưa có tài khoản, bắt đầu tạo...' })

		const username = await uniqueSlug({
			path: 'users',
			field: 'username',
			value: user.displayName,
		})

		await setDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			photoURL: user.photoURL,
			displayName: user.displayName,
			providerId: user.providerId,
			createdAt: new Date().getTime(),
			username,
			isVip: false,
			bookmarks: [],
			recent: [],
		})
			.then(() => {
				setErr(null)

				toast.update(id, {
					render: 'Đã tạo tài khoản thành công!',
					type: 'success',
					isLoading: false,
				})

				setTimeout(() => {
					toast.dismiss(id)
					router.replace('/')
				}, 3000)
			})
			.catch((err) => handleError(err.message))
	}

	const handleError = (msg) => {
		setErr(msg)
		toast.error(msg)
	}

	return (
		<div className='form-container'>
			<form
				action=''
				autoComplete='off'
				className='form'
				onSubmit={(e) => e.preventDefault()}>
				<header className='text-center'>
					<Link href='/'>
						<a className='inline-block'>
							<Image
								src='/images/logo.png'
								alt=''
								width={60}
								height={60}
								className='block rounded-full object-cover'
							/>
						</a>
					</Link>

					<h1 className='text-2xl font-bold'>
						Đăng ký tài khoản {process.env.SITE_NAME}
					</h1>

					{err && <div className='text-red-500'>{err}</div>}
				</header>

				<Providers handleError={handleError} handleAuth={handleAuth} />

				<div className='text-center'>
					Bạn đã có tài khoản?{' '}
					<Link href='/auth/login'>
						<a className='text-indigo-500 font-bold hover:underline'>
							Đăng nhập
						</a>
					</Link>
				</div>
			</form>
		</div>
	)
}

Register.Layout = null

export default Register
