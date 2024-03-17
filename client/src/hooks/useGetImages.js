/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useImagesContext } from "../context/ImagesContext";
import useImages from "../zustand/useImages";


const useGetImages = () => {

    const {images,setImages} = useImages();

// const [images, setImages] = useState([])
const [imagesLoading,setImagesLoading] = useState(true)

  useEffect(() => {
    
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/fetchImages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(data){
        setImages(data.images)
      }

      
      } catch (error) {
        toast.error(error)
      }
      finally{
        setImagesLoading(false)
      }
    };

    fetchImages();
    
  }, []);

  return {images,imagesLoading}


};

export default useGetImages
