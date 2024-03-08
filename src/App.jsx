import { useState } from "react";
import { getPoseKeypoints, getBody } from "./integrations/mediapipe/keypoints";
import { getMeasurements } from "./measurement";
import { drawImage, drawCircle, drawLine } from "./draw";
import { ImageUpload } from "./components/ImageUpload";
import { PanelDrawers } from "./components/PanelDrawers";
import { sidePanelData } from "./constants";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [measurementData, setMeasurementData] = useState(null);

  const onImageLoad = (image, canvas) => {
    setImage(image);
    setCanvas(canvas);
    drawImage(image, canvas);

    getPoseKeypoints(image)
      .then((kps) => {
        const body = getBody(kps, canvas.width, canvas.height);
        setMeasurementData(getMeasurements(body));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onMouseEnter = (child) => {
    const measurement = measurementData[child.key];
    if (measurement) {
      const { pts, lines } = measurement;
      const ctx = canvas.getContext("2d");
      drawImage(image, canvas);

      for (const pt of pts) {
        drawCircle(ctx, pt, "red");
      }

      for (const line of lines) {
        drawLine(ctx, line.start, line.end, "red");
      }
    }
  };

  const onMouseLeave = (child) => {
    drawImage(image, canvas);
  };

  return (
    <div className="wrapper">
      <div className="sidePanel">
        <PanelDrawers
          title={"Measurements"}
          data={sidePanelData}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </div>
      <div className="mainContent">
        <div className="imageUploadWrapper">
          <ImageUpload onImageLoad={onImageLoad} />
        </div>
      </div>
    </div>
  );
};

export default App;
