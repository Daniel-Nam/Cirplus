import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
	const router = useRouter()

	const className = `block transition ${
		router.asPath === href ? 'text-blue-500 font-bold' : 'text-gray-700'
	}`

	const handleClick = (e) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<a href={href} className={className} onClick={handleClick}>
			{children}
		</a>
	)
}

export default ActiveLink
