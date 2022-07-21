import { memo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import GameItem from './GameItem'

function GameContainer({ currentItems, loading }) {
	return (
		<div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
			{currentItems &&
				currentItems.map((item) => (
					<GameItem key={uuidv4()} item={item} loading={loading} />
				))}
		</div>
	)
}

export default memo(GameContainer)
