import { useEffect, useRef, useState } from "react";
import { initialize, detectFace } from "../utils/utils";

export default function FaceExpression({ getSong }) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const [expression, setExpression] = useState("Loading...");

  useEffect(() => {
    initialize(streamRef, videoRef, faceLandmarkerRef, setExpression);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      faceLandmarkerRef.current?.close();
    };
  }, []);

  const handleClick = async () => {
    const expressionDetected = detectFace(
      videoRef,
      faceLandmarkerRef,
      animationFrameRef,
      setExpression,
    );
    getSong(expressionDetected);
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
      <button className="button btn-primary" onClick={() => handleClick()}>
        Detect Face Expression
      </button>
    </div>
  );
}
