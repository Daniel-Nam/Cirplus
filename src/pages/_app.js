import { Fragment, useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { NextSeo } from 'next-seo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

import '../styles/globals.scss'
import { onAuthStateChanged, auth, getDoc, doc, db } from '../config'
import { DefaultLayout } from '../layouts'
import { setData } from '../store/reducers/userSlice'
import Loading from '../components/Loading'
import store from '../store'

function App({ Component, pageProps }) {
	let Layout
	const dispatch = useDispatch()
	const [initializing, setInitializing] = useState(true)

	if (Component.Layout) {
		Layout = Component.Layout
	} else if (Component.Layout === null) {
		Layout = Fragment
	} else {
		Layout = DefaultLayout
	}

	async function handleStateChanged(user) {
		if (user) {
			const docRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(docRef)
			dispatch(setData(docSnap.data()))
		}

		if (initializing) setInitializing(false)
	}

	useEffect(() => {
		const subscriber = onAuthStateChanged(auth, handleStateChanged)
		return subscriber
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (initializing) return <Loading />

	return (
		<>
			<NextSeo
				title={process.env.SITE_NAME}
				description='Cirplus is a platform for sharing and playing games with your friends.'
			/>

			<Layout>
				<Component {...pageProps} />
			</Layout>

			<ToastContainer />
		</>
	)
}

function AppWrapper({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<App Component={Component} pageProps={pageProps} />
		</Provider>
	)
}

export default AppWrapper
