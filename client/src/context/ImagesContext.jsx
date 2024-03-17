/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

export const ImagesContext = createContext()

export const useImagesContext = ()=>{
    return useContext(ImagesContext);
}

export const ImagesContextProvider = ({children})=>{

    const [images, setImages] = useState([])
    const [imagesLoading, setImagesLoading] = useState(false)
    
    return <ImagesContext.Provider value={{images,setImages,imagesLoading,setImagesLoading}}>{children}</ImagesContext.Provider>

}