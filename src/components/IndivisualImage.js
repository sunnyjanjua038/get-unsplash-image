import React from 'react'

const IndivisualImage = ({image}) => {
  return (
    <div className='photo'>
      <img src={image.urls.small} alt='unsplash images'/>
    </div> 
  )
}
export default IndivisualImage

