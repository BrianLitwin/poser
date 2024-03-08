import {
  PoseLandmarker,
  FilesetResolver,
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";

let poseLandmarker = undefined;

async function initializePoseLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task`,
      delegate: "GPU",
    },
    runningMode: "IMAGE",
    numPoses: 1,
  });
}

initializePoseLandmarker();

export async function getPoseKeypoints(image) {
  if (!poseLandmarker) {
    console.log("PoseLandmarker is not initialized yet.");
    return;
  }
  await poseLandmarker.setOptions({ runningMode: "IMAGE" });

  const result = await poseLandmarker.detect(image);
  console.log(result);
  if (result && result.landmarks.length > 0) {
    return result.landmarks[0];
  } else {
    console.log("No landmarks detected.");
    return [];
  }
}

export function getBody(keypoints, scaleX, scaleY) {
  if (keypoints.length !== 33) {
    throw new Error("Expected 33 keypoints.");
  }

  const scalePoint = (point) => ({
    x: point.x * scaleX,
    y: point.y * scaleY,
  });

  const body = {
    nose: scalePoint(keypoints[0]),
    leftEyeInner: scalePoint(keypoints[1]),
    leftEye: scalePoint(keypoints[2]),
    leftEyeOuter: scalePoint(keypoints[3]),
    rightEyeInner: scalePoint(keypoints[4]),
    rightEye: scalePoint(keypoints[5]),
    rightEyeOuter: scalePoint(keypoints[6]),
    leftEar: scalePoint(keypoints[7]),
    rightEar: scalePoint(keypoints[8]),
    mouthLeft: scalePoint(keypoints[9]),
    mouthRight: scalePoint(keypoints[10]),
    leftShoulder: scalePoint(keypoints[11]),
    rightShoulder: scalePoint(keypoints[12]),
    leftElbow: scalePoint(keypoints[13]),
    rightElbow: scalePoint(keypoints[14]),
    leftWrist: scalePoint(keypoints[15]),
    rightWrist: scalePoint(keypoints[16]),
    leftPinky: scalePoint(keypoints[17]),
    rightPinky: scalePoint(keypoints[18]),
    leftIndex: scalePoint(keypoints[19]),
    rightIndex: scalePoint(keypoints[20]),
    leftThumb: scalePoint(keypoints[21]),
    rightThumb: scalePoint(keypoints[22]),
    leftHip: scalePoint(keypoints[23]),
    rightHip: scalePoint(keypoints[24]),
    leftKnee: scalePoint(keypoints[25]),
    rightKnee: scalePoint(keypoints[26]),
    leftAnkle: scalePoint(keypoints[27]),
    rightAnkle: scalePoint(keypoints[28]),
    leftHeel: scalePoint(keypoints[29]),
    rightHeel: scalePoint(keypoints[30]),
    leftFootIndex: scalePoint(keypoints[31]),
    rightFootIndex: scalePoint(keypoints[32]),
  };

  return body;
}
