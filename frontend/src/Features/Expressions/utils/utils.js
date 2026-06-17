import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export const initialize = async (
  streamRef,
  videoRef,
  faceLandmarkerRef,
  setExpression,
) => {
  try {
    // Start webcam
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }

    // Load MediaPipe
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true,
    });

    // detectFace();
  } catch (error) {
    console.error(error);
    setExpression("Camera Error");
  }
};

const getBlendshapeScore = (blendshapes, name) => {
  return blendshapes.find((shape) => shape.categoryName === name)?.score || 0;
};

export const detectFace = (
  videoRef,
  faceLandmarkerRef,
  animationFrameRef,
  setExpression,
) => {
  const video = videoRef.current;
  const faceLandmarker = faceLandmarkerRef.current;

  if (!video || !faceLandmarker || video.readyState < 2) {
    animationFrameRef.current = requestAnimationFrame(detectFace);
    return;
  }

  const results = faceLandmarker.detectForVideo(video, performance.now());
  let expression;
  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const smileLeft = getBlendshapeScore(blendshapes, "mouthSmileLeft");

    const smileRight = getBlendshapeScore(blendshapes, "mouthSmileRight");

    const jawOpen = getBlendshapeScore(blendshapes, "jawOpen");

    const blinkLeft = getBlendshapeScore(blendshapes, "eyeBlinkLeft");

    const blinkRight = getBlendshapeScore(blendshapes, "eyeBlinkRight");

    if (smileLeft > 0.5 && smileRight > 0.5) {
      setExpression("😊 Happy");
      expression = "happy";
    } else if (jawOpen > 0.6) {
      setExpression("😮 Surprise");
      expression = "surprise";
    } else {
      setExpression("😐 Neutral");
      expression = "sad";
    }
  }

  return expression;
};
