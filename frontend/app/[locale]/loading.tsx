import React from 'react'
import SwirlArtistPage from '../components/svg/SwirlArtistPage'

function Loading() {
  return (
    <div className='w-full h-full text-9xl'>
      <SwirlArtistPage
        theme={{ fill: '#05161F' }}
        className='w-[80%] lg:w-[40vw] saturate-100'
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 6.5,
          ease: 'linear',
          repeat: Infinity,
          delay: 0,
        }}
      />
    </div>
  )
}

export default Loading
