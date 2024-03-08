import { KEYS } from "./constants";

function calcAngleBetweenLines(line1, line2) {
  const vector1 = {
    x: line1.end.x - line1.start.x,
    y: line1.end.y - line1.start.y,
  };
  const vector2 = {
    x: line2.end.x - line2.start.x,
    y: line2.end.y - line2.start.y,
  };
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
  const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
  const cosTheta = dotProduct / (magnitude1 * magnitude2);
  const angleRadians = Math.acos(cosTheta);
  const angleDegrees = angleRadians * (180 / Math.PI);

  return angleDegrees;
}

export function getMeasurements({
  leftAnkle,
  leftKnee,
  rightAnkle,
  rightKnee,
  rightHip,
  leftHip,
  rightShoulder,
  leftShoulder,
  rightElbow,
  leftElbow,
  rightWrist,
  leftWrist,
}) {
  const dorsi = (ankle, knee) => {
    const shin = { start: ankle, end: knee };
    const lineEndPt = { x: ankle.x, y: ankle.y - 50 };
    const verticalLine = { start: ankle, end: lineEndPt };
    const measurement = calcAngleBetweenLines(shin, verticalLine);
    const lines = [shin, verticalLine];
    const pts = [ankle, knee, lineEndPt];
    return { measurement, lines, pts };
  };

  const butterfly = () => {
    const leftShin = { start: leftAnkle, end: leftKnee };
    const rightShin = { start: rightAnkle, end: rightKnee };
    const measurement = calcAngleBetweenLines(leftShin, rightShin);
    const lines = [leftShin, rightShin];
    const pts = [leftAnkle, rightAnkle, leftKnee, rightKnee];
    return { measurement, lines, pts };
  };

  const abduction = () => {
    const rightFemur = { start: rightKnee, end: rightHip };
    const leftFemur = { start: leftKnee, end: leftHip };
    const measurement = calcAngleBetweenLines(rightFemur, leftFemur);
    const lines = [rightFemur, leftFemur];
    const pts = [rightKnee, leftKnee, rightHip, leftHip];
    return { measurement, lines, pts };
  };

  const hipFlexion = (hip, knee) => {
    const femur = { start: knee, end: hip };
    const lineEndPt = { x: knee.x, y: knee.y - 50 };
    const verticalLine = { start: knee, end: lineEndPt };
    const measurement = calcAngleBetweenLines(femur, verticalLine);
    const lines = [femur, verticalLine];
    const pts = [hip, knee, lineEndPt];
    return { measurement, lines, pts };
  };

  const straightLegRaise = (ankle, knee) => {
    const shin = { start: ankle, end: knee };
    const lineEndPt = { x: knee.x + 500, y: knee.y };
    const horizontalLine = { start: knee, end: lineEndPt };
    console.log(shin, horizontalLine);
    const measurement = calcAngleBetweenLines(shin, horizontalLine);
    const lines = [shin, horizontalLine];
    const pts = [shin, horizontalLine, lineEndPt];
    return { measurement, lines, pts };
  };

  const shoulderFlexion = (shoulder, elbow) => {
    const upperArm = { start: shoulder, end: elbow };
    const lineEndPt = { x: shoulder.x, y: shoulder.y - 50 };
    const verticalLine = { start: shoulder, end: lineEndPt };
    const measurement = calcAngleBetweenLines(upperArm, verticalLine);
    const lines = [upperArm, verticalLine];
    const pts = [shoulder, elbow, lineEndPt];
    return { measurement, lines, pts };
  };

  const kneeFlexion = (knee, ankle, hip) => {
    const shin = { start: ankle, end: knee };
    const femnur = { start: knee, end: hip };
    const measurement = calcAngleBetweenLines(shin, femnur);
    const lines = [shin, femnur];
    const pts = [ankle, knee, hip];
    return { measurement, lines, pts };
  };

  const torsoFlexion = (shoulder, hip) => {
    const torso = { start: shoulder, end: hip };
    const lineEndPt = { x: shoulder.x, y: shoulder.y - 50 };
    const verticalLine = { start: shoulder, end: lineEndPt };
    const measurement = calcAngleBetweenLines(torso, verticalLine);
    const lines = [torso, verticalLine];
    const pts = [shoulder, hip, lineEndPt];
    return { measurement, lines, pts };
  };

  const forearm = (elbow, wrist) => {
    const forearm = { start: elbow, end: wrist };
    const lineEndPt = { x: elbow.x, y: elbow.y - 50 };
    const verticalLine = { start: elbow, end: lineEndPt };
    const measurement = calcAngleBetweenLines(forearm, verticalLine);
    const lines = [forearm, verticalLine];
    const pts = [elbow, wrist, lineEndPt];
    return { measurement, lines, pts };
  };

  return {
    [KEYS.rightDorsi]: dorsi(rightAnkle, rightKnee),
    [KEYS.leftDorsi]: dorsi(leftAnkle, leftKnee),
    [KEYS.rightHipFlexion]: hipFlexion(rightHip, rightKnee),
    [KEYS.leftHipFlexion]: hipFlexion(leftHip, leftKnee),
    [KEYS.abduction]: abduction(),
    [KEYS.butterfly]: butterfly(),
    [KEYS.rightShoulderFlexion]: shoulderFlexion(rightShoulder, rightElbow),
    [KEYS.leftShoulderFlexion]: shoulderFlexion(leftShoulder, leftElbow),
    [KEYS.rightKneeFlexion]: kneeFlexion(rightKnee, rightAnkle, rightHip),
    [KEYS.leftKneeFlexion]: kneeFlexion(leftKnee, leftAnkle, leftHip),
    [KEYS.rightTorsoFlexion]: torsoFlexion(rightShoulder, rightHip),
    [KEYS.leftTorsoFlexion]: torsoFlexion(leftShoulder, leftHip),
    [KEYS.rightForearm]: forearm(rightElbow, rightWrist),
    [KEYS.leftForearm]: forearm(leftElbow, leftWrist),
  };
}
