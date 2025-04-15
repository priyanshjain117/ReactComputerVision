// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
//  import { drawRect } from "./utilities";
import {drawRect} from "./utilities"; 

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function

  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
    try {
      const net = await tf.loadGraphModel('/model/model.json')
      
      //  Loop and detect hands
      setInterval(() => {
        detect(net);
      }, 16.7);
    } catch (error) {
      console.error("Failed to load model:", error);
    }
  };
  // const runCoco = async () => {
  //   try {
  //     const net = await tf.loadGraphModel('/model/model.json');
  //     const loop = () => {
  //       detect(net);
  //       requestAnimationFrame(loop);
  //     };
  //     requestAnimationFrame(loop);
  //   } catch (error) {
  //     console.error("Failed to load model:", error);
  //   }
  // };


  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      console.log(obj)

      const boxes = await obj[1].array()
      const classes = await obj[2].array()
      const scores = await obj[4].array()
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;

// import React, { useRef, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import Webcam from 'react-webcam';
// import { drawRect } from './utilities';
// import './App.css';

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   let intervalId = null;

//   // Load the model and start detection loop
//   const runDetection = async () => {
//     const net = await tf.loadGraphModel('/model/model.json');
//     intervalId = setInterval(() => detect(net), 1000 / 30); // ~30fps
//     return intervalId;
//   };

//   const detect = async (net) => {
//     if (
//       webcamRef.current?.video &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       const video     = webcamRef.current.video;
//       const vw        = video.videoWidth;
//       const vh        = video.videoHeight;
//       webcamRef.current.video.width  = vw;
//       webcamRef.current.video.height = vh;
//       canvasRef.current.width  = vw;
//       canvasRef.current.height = vh;

//       // preprocess
//       const img      = tf.browser.fromPixels(video);
//       const resized  = tf.image.resizeBilinear(img, [640, 480]);
//       const casted   = resized.cast('int32');
//       const expanded = casted.expandDims(0);

//       // run model
//       const [boxesT, scoresT, classesT] = await net.executeAsync(expanded);

//       const boxes   = await boxesT.array();
//       const scores  = await scoresT.array();
//       const classes = await classesT.array();

//       // draw
//       const ctx = canvasRef.current.getContext('2d');
//       drawRect(
//         boxes[0],
//         classes[0],
//         scores[0],
//         0.8,
//         vw, vh,
//         ctx
//       );

//       // cleanup
//       tf.dispose([img, resized, casted, expanded, boxesT, scoresT, classesT]);
//     }
//   };

//   useEffect(() => {
//     const idPromise = runDetection();
//     return () => {
//       // clear the interval on unmount
//       Promise.resolve(idPromise).then(id => clearInterval(id));
//     };
//   }, []);

//   return (
//     <div className="App">
//       <Webcam
//         ref={webcamRef}
//         muted
//         style={{
//           position: 'absolute',
//           left: 0, right: 0,
//           margin: 'auto',
//           zIndex: 9,
//           width: 640, height: 480,
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: 'absolute',
//           left: 0, right: 0,
//           margin: 'auto',
//           zIndex: 10,
//           width: 640, height: 480,
//         }}
//       />
//     </div>
//   );
// }

// export default App;
