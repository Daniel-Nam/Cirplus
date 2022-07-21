import { memo, useState, useEffect } from 'react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import GameContainer from './GameContainer'

function RenderGames({ itemsPerPage = 60, data, loading }) {
	const [currentItems, setCurrentItems] = useState(null)
	const [pageCount, setPageCount] = useState(0)
	const [itemOffset, setItemOffset] = useState(0)

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage
		console.log(`Loading items from ${itemOffset} to ${endOffset}`)
		setCurrentItems(data.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(data.length / itemsPerPage))
	}, [data, itemOffset, itemsPerPage])

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		)
		setItemOffset(newOffset)
	}

	return (
		<>
			<GameContainer currentItems={currentItems} loading={loading} />
			<ReactPaginate
				breakLabel='...'
				nextLabel={<AiOutlineDoubleRight />}
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				pageLinkClassName='block w-10 h-10 p-2 border text-center rounded-md hover:bg-gray-200 transition'
				activeLinkClassName='bg-gray-200'
				previousLabel={<AiOutlineDoubleLeft />}
				renderOnZeroPageCount={null}
				containerClassName='flex items-center flex-wrap gap-3 justify-center p-2 mt-10'
			/>
		</>
	)
}

export default memo(RenderGames)
