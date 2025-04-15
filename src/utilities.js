// Define our labelmap
const labelMap = {
    1:{name:'Hello', color:'red'},
    2:{name:'Thank You', color:'yellow'},
    3:{name:'I Love You', color:'lime'},
    4:{name:'Yes', color:'blue'},
    5:{name:'No', color:'purple'},
}
// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle= labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}

// // Define our labelmap
// const labelMap = {
//     1: { name: 'Hello', color: 'red' },
//     2: { name: 'Thank You', color: 'yellow' },
//     3: { name: 'I Love You', color: 'lime' },
//     4: { name: 'Yes', color: 'blue' },
//     5: { name: 'No', color: 'purple' },
// };

// // Define a drawing function
// export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
//     for (let i = 0; i < boxes.length; i++) {
//         if (boxes[i] && classes[i] && scores[i] > threshold) {
//             // Extract variables
//             const [y, x, height, width] = boxes[i];
//             const text = classes[i];

//             // Skip if class is not in labelMap
//             if (!labelMap[text]) continue;

//             // Set styling
//             ctx.strokeStyle = labelMap[text].color;
//             ctx.lineWidth = 10;
//             ctx.fillStyle = 'white';
//             ctx.font = '30px Arial';

//             // Draw
//             ctx.beginPath();
//             ctx.fillText(
//                 `${labelMap[text].name} - ${Math.round(scores[i] * 100) / 100}`,
//                 x * imgWidth,
//                 y * imgHeight - 10
//             );
//             ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth, height * imgHeight); // Fixed scaling
//             ctx.stroke();
//         }
//     }
// };

// Define our labelmap
// const labelMap = {
//     1: { name: 'Hello',      color: 'red'    },
//     2: { name: 'Thank You',  color: 'yellow' },
//     3: { name: 'I Love You', color: 'lime'   },
//     4: { name: 'Yes',        color: 'blue'   },
//     5: { name: 'No',         color: 'purple' },
//   };
  
//   export function drawRect(
//     boxes,    // [numBoxes, 4]
//     classes,  // [numBoxes]
//     scores,   // [numBoxes]
//     threshold,
//     imgW, imgH,
//     ctx
//   ) {
//     // clear previous drawings
//     ctx.clearRect(0, 0, imgW, imgH);
  
//     for (let i = 0; i < boxes.length; i++) {
//       if (scores[i] > threshold) {
//         const [ymin, xmin, ymax, xmax] = boxes[i];
//         const x = xmin * imgW;
//         const y = ymin * imgH;
//         const w = (xmax - xmin) * imgW;
//         const h = (ymax - ymin) * imgH;
  
//         const cls = classes[i];
//         const { name, color } = labelMap[cls] || { name: cls, color: 'black' };
//         const score = Math.round(scores[i] * 100);
  
//         // styling
//         ctx.strokeStyle = color;
//         ctx.lineWidth   = 2;
//         ctx.fillStyle   = color;
//         ctx.font        = '16px Arial';
  
//         // draw label background
//         ctx.fillText(`${name} ${score}%`, x, y > 10 ? y - 5 : y + 15);
//         // draw box
//         ctx.beginPath();
//         ctx.rect(x, y, w, h);
//         ctx.stroke();
//       }
//     }
//   }
  