import {createContext, useState} from "react"

const VideoContext = createContext()   

export const VideoProvider = ({children}) =>{
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

   return(
    <VideoContext.Provider value={{ video, loading, error, setError, setLoading, setVideo }}>
        {children}
    </VideoContext.Provider>
   )
}

export default VideoContext