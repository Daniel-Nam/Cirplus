import Header from '../components/Header'

function DefaultLayout({ children }) {
	return (
		<>
			<Header />
			<main className='min-h-screen overflow-hidden p-4 md:px-7'>
				{children}
			</main>
		</>
	)
}

export default DefaultLayout
