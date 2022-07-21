import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import Actions from './Actions'
import ActiveLink from '../ActiveLink'

function Header() {
	const pages = [
		{
			name: 'Trang chủ',
			path: '/',
		},
		{
			name: 'Thể loại',
			path: '/categories',
		},
		{
			name: 'Đánh dấu',
			path: '/bookmarks',
		},
	]

	return (
		<header className='sticky top-0 inset-x-0 z-10 h-16 px-4 md:px-7 bg-white border-b'>
			<div className='flex items-center justify-between h-full'>
				<div className='flex items-center gap-10 h-full'>
					<div className='hidden md:flex md:items-center md:gap-3'>
						<Image
							src='/images/logo.png'
							alt='Logo'
							width={50}
							height={50}
							className='block object-cover rounded-md'
						/>
						<h1 className='font-bold uppercase'>cirplus</h1>
					</div>

					<nav className='flex items-center gap-5 h-full'>
						{pages.map((page) => (
							<ActiveLink key={uuidv4()} href={page.path}>
								{page.name}
							</ActiveLink>
						))}
					</nav>
				</div>

				<Actions />
			</div>
		</header>
	)
}

export default Header
