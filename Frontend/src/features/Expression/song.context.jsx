import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/qh8ding9dr/cohort-2/moodify/songs/Bandhan__From__Vanvaas___biiDR6UdJ",
        "posterUrl": "https://ik.imagekit.io/qh8ding9dr/cohort-2/moodify/posters/Bandhan__From__Vanvaas___bXOKlj7Xi.jpeg",
        "title": "Bandhan (From \"Vanvaas\")",
        "mood": "Happy"
    })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    )
}