import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [expression, setExpression] = useState("Loading...");

  useEffect(() => {
    let stream;

    const initialize = async () => {
      try {
        // Start webcam
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio:false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Load MediaPipe
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        faceLandmarkerRef.current =
          await FaceLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
              },
              runningMode: "VIDEO",
              numFaces: 1,
              outputFaceBlendshapes: true,
            }
          );

        detectFace();
      } catch (error) {
        console.error(error);
        setExpression("Camera Error");
      }
    };

    initialize();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      faceLandmarkerRef.current?.close();
    };
  }, []);

  const getBlendshapeScore = (blendshapes, name) => {
    return (
      blendshapes.find(
        (shape) => shape.categoryName === name
      )?.score || 0
    );
  };

  const detectFace = () => {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    if (
      !video ||
      !faceLandmarker ||
      video.readyState < 2
    ) {
      animationFrameRef.current =
        requestAnimationFrame(detectFace);
      return;
    }

    const results = faceLandmarker.detectForVideo(
      video,
      performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes =
        results.faceBlendshapes[0].categories;

      const smileLeft = getBlendshapeScore(
        blendshapes,
        "mouthSmileLeft"
      );

      const smileRight = getBlendshapeScore(
        blendshapes,
        "mouthSmileRight"
      );

      const jawOpen = getBlendshapeScore(
        blendshapes,
        "jawOpen"
      );

      const blinkLeft = getBlendshapeScore(
        blendshapes,
        "eyeBlinkLeft"
      );

      const blinkRight = getBlendshapeScore(
        blendshapes,
        "eyeBlinkRight"
      );

      if (smileLeft > 0.5 && smileRight > 0.5) {
        setExpression("😊 Happy");
      } else if (jawOpen > 0.6) {
        setExpression("😮 Surprised");
      } else if (
        blinkLeft > 0.8 &&
        blinkRight > 0.8
      ) {
        setExpression("😉 Blinking");
      } else {
        setExpression("😐 Neutral");
      }
    }

    animationFrameRef.current =
      requestAnimationFrame(detectFace);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={640}
        height={480}
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
        }}
      />

      <h2>Expression: {expression}</h2>
    </div>
  );
}