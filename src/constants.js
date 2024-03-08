// want to be able to measure shoulder rotation - ER / IR 

export const KEYS = {
    rightDorsi: "rightDorsi",
    leftDorsi: "leftDorsi",
    rightKneeFlexion: "rightKneeFlexion",
    leftKneeFlexion: "leftKneeFlexion",
    rightHipFlexion: "rightHipFlexion",
    leftHipFlexion: "leftHipFlexion",
    abduction: "abduction",
    butterfly: "butterfly",
    rightShoulderFlexion: "rightShoulderFlexion",
    leftShoulderFlexion: "leftShoulderFlexion",
    rightTorsoFlexion: "rightTorsoFlexion",
    leftTorsoFlexion: "leftTorsoFlexion", 
    rightForearm: "rightForearm",
    leftForearm: "leftForearm",   
}

export const sidePanelData = [
    {
      title: "Ankle/Feet",
      children: [
        { label: "Right Ankle", key: KEYS.rightDorsi },
        { label: "Left Ankle", key: KEYS.leftDorsi },
      ],
    },
    {
      title: "Knees",
      children: [
        { label: "Right Knee", key: KEYS.rightKneeFlexion },
        { label: "Left Knee", key: KEYS.leftKneeFlexion },
      ],
    },
    {
      title: "Hips",
      children: [
        { label: "Right Hip Flexion", key: KEYS.rightHipFlexion },
        { label: "Left Hip Flexion", key: KEYS.leftHipFlexion },
        { label: "Abduction", key: KEYS.abduction },
        { label: "Butterfly", key: KEYS.butterfly },
      ],
    },
    {
      title: "Shoulders",
      children: [
        { label: "Right Shoulder", key: KEYS.rightShoulderFlexion },
        { label: "Left Shoulder", key: KEYS.leftShoulderFlexion },
        { label: "Right Forearm", key: KEYS.rightForearm },
        { label: "Left Forearm", key: KEYS.leftForearm },
      ],
    },
    {
      title: "Torso",
      children: [
        { label: "Right Torso", key: KEYS.rightTorsoFlexion },
        { label: "Left Torso", key: KEYS.leftTorsoFlexion },
      ],
    },
]