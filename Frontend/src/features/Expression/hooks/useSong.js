import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext);

    if (!context) {
        throw new Error("useSong must be used within a SongContextProvider");
    }

    const { song, setSong, loading, setLoading } = context;

    const handleGetSong = async ({ mood }) => {
        setLoading(true);
        try {
            const data = await getSong({ mood });
            if (data?.song) {
                setSong(data.song);
            }
        } catch (error) {
            console.error('Error fetching song:', error);
        } finally {
            setLoading(false);
        }
    };

    return { song, handleGetSong, loading };
};
