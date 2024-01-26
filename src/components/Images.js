import React from 'react'
import IndivisualImage from './IndivisualImage'
export const Images = ({images}) => {

    return images.map((image)=>(
      <IndivisualImage key={image.id} image={image}/>
    )
    )  
}

export default Images
