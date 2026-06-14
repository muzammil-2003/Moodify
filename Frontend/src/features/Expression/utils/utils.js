import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ videoRef, landmarkerRef, useStream, setExpression }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1
    });

    try {
        useStream.current = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
        console.error("Camera access denied:", err);
        setExpression("Camera access denied ❌");
        return;
    }

    videoRef.current.srcObject = useStream.current;

    // Safely play video, ignoring Strict Mode interruptions
    videoRef.current.play().catch(() => { });

};

export const detect = ({ animationRef, lastExpressionRef, lastTimeRef, landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const now = performance.now();

    // Throttle detection to ~10 fps
    if (now - lastTimeRef.current < 100) {
        animationRef.current = requestAnimationFrame(() =>
            detect({ animationRef, lastExpressionRef, lastTimeRef, landmarkerRef, videoRef, setExpression })
        );
        return;
    }
    lastTimeRef.current = now;

    if (videoRef.current.readyState < 2) {
        animationRef.current = requestAnimationFrame(() =>
            detect({ animationRef, lastExpressionRef, lastTimeRef, landmarkerRef, videoRef, setExpression })
        );
        return;
    }

    const results = landmarkerRef.current.detectForVideo(videoRef.current, now);
    const blendshapes = results.faceBlendshapes?.[0]?.categories;
    if (!blendshapes) {
        animationRef.current = requestAnimationFrame(() =>
            detect({ animationRef, lastExpressionRef, lastTimeRef, landmarkerRef, videoRef, setExpression })
        );
        return;
    }

    const getScore = (name) => blendshapes.find(b => b.categoryName === name)?.score || 0;

    // Precompute signals
    const smile = (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;
    const frown = (getScore("mouthFrownLeft") + getScore("mouthFrownRight")) / 2;
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const browDown = (getScore("browDownLeft") + getScore("browDownRight")) / 2;
    const eyeWide = (getScore("eyeWideLeft") + getScore("eyeWideRight")) / 2;
    const eyeSquint = (getScore("eyeSquintLeft") + getScore("eyeSquintRight")) / 2;
    const mouthPucker = getScore("mouthPucker");

    // Determine expression
    let currentExpression = "Neutral 😐";
    if (smile > 0.6 && jawOpen < 0.3) currentExpression = "Happy";
    else if (smile > 0.5 && jawOpen > 0.4) currentExpression = "Laughing";
    else if (jawOpen > 0.65 && eyeWide > 0.5) currentExpression = "Shocked";
    else if (jawOpen > 0.6 && browUp > 0.5) currentExpression = "Surprised";
    else if (frown > 0.5 && browDown > 0.4) currentExpression = "Angry";
    else if (frown > 0.45) currentExpression = "Sad";
    else if (browUp > 0.6 && smile < 0.3) currentExpression = "Concerned";
    else if (eyeSquint > 0.5 && smile > 0.4) currentExpression = "Playful";
    else if (mouthPucker > 0.6) currentExpression = "Kissing";
    else if (eyeWide > 0.4 && smile < 0.3) currentExpression = "Confused";

    // Update state only if changed
    if (currentExpression !== lastExpressionRef.current) {
        lastExpressionRef.current = currentExpression;
        setExpression(currentExpression);
    }

    // Always return the current expression
    return currentExpression;
};