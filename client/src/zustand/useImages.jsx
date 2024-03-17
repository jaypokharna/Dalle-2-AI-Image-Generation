import { create } from 'zustand'

const useImages = create((set) => ({
    images: [],
    setImages: (images) => set({ images })
}))

export default useImages;