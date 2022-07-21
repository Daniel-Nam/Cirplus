import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'

import { db, doc, getDoc } from '../../config'
import Providers from './Providers'

function Login() {
	const router = useRouter()
	const [err, setErr] = useState('')

	const handleAuth = async (user) => {
		const id = toast.loading(
			'Đang kiểm tra đăng nhập, vui lòng đợi một chút...'
		)

		const docRef = doc(db, 'users', user.uid)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			setErr(null)

			toast.update(id, {
				render: 'Đã đăng nhập thành công, trở về trang chủ sau 3s...',
				type: 'success',
				isLoading: false,
			})

			setTimeout(() => {
				toast.dismiss(id)
				router.replace('/')
			}, 3000)

			return
		}

		toast.update(id, {
			render: 'Vui lòng đăng ký tài khoản!',
			type: 'error',
			isLoading: false,
		})

		setTimeout(() => toast.dismiss(id), 3000)
	}

	const handleError = (msg) => {
		setErr(msg)
		toast.error(msg)
	}

	return (
		<div className='form-container'>
			<form
				action=''
				className='form'
				autoComplete='off'
				onSubmit={(e) => e.preventDefault()}>
				<header className='text-center'>
					<Link href='/'>
						<a className='inline-block'>
							<Image
								src='/images/logo.png'
								alt='Logo'
								width={60}
								height={60}
								className='block rounded-full object-cover'
							/>
						</a>
					</Link>

					<h1 className='text-2xl font-bold'>
						Chào mừng đến với {process.env.SITE_NAME}
					</h1>

					{err && <div className='text-red-500'>{err}</div>}
				</header>

				<Providers handleAuth={handleAuth} handleError={handleError} />

				<div className='text-center'>
					Bạn chưa có tài khoản?{' '}
					<Link href='/auth/register'>
						<a className='text-indigo-500 font-bold hover:underline'>
							Đăng ký
						</a>
					</Link>
				</div>
			</form>
		</div>
	)
}

Login.Layout = null

export default Login
