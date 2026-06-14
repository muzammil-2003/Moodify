import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import Player from './Player';
import { useSong } from "../hooks/useSong";

const moodMap = {
    Happy: "Happy",
    Laughing: "Laughing",
    Kissing: "Kissing",
    Concerned: "Concerned",
    Surprised: "Surprised",
    Shocked: "Surprised",
    Angry: "Concerned",
    Sad: "Concerned",
    Confused: "Concerned",
    Playful: "Laughing",
    Neutral: "Happy"
};

export default function FaceExpression({ onClick = () => { } }) {

    const { handleGetSong } = useSong();

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const lastExpressionRef = useRef("");
    const lastTimeRef = useRef(0);
    const useStream = useRef(null)

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {

        init({ videoRef, landmarkerRef, useStream, animationRef, lastExpressionRef, lastTimeRef, setExpression })

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (landmarkerRef.current) {
                try {
                    landmarkerRef.current.close();
                } catch { }
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    const handleDetectMood = async () => {
        const detectedMood = detect({
            animationRef,
            lastExpressionRef,
            lastTimeRef,
            landmarkerRef,
            videoRef,
            setExpression
        });

        const mood = moodMap[detectedMood] || "Happy";
        await handleGetSong({ mood });
        onClick(detectedMood);
    }

    return (
        <div style={{ gap: "20px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "450px", borderRadius: "12px", transform: "scaleX(-1)" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button
                onClick={handleDetectMood}
                className="px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer"
            >Detect Mood</button>
            <Player />
        </div>
    );
}
