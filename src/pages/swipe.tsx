import styles from "@/styles/Swipe.module.css";
import React, { useState, useEffect, MouseEvent } from "react";

export default function Swipe() {
   const [xPosition, setXPosition] = useState(0);

   useEffect(() => {}, [xPosition]);

   const updateXPosition = (newXposition: number) => {
      setXPosition(newXposition);
   };

   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [mouseDown, setMouseDown] = useState(false);

   const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
      if (mouseDown) {
         console.log("Mousedown: " + mouseDown);
         setPosition({ x: event.clientX, y: event.clientY });
      }
   };

   const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
      event: MouseEvent<HTMLDivElement>
   ) => {
      console.log("Mouse Down");
      setMouseDown(true);
      setPosition({ x: event.clientX, y: event.clientY });
   };

   const handleMouseUp = () => {
      console.log("Handle Mouse Up");
      setMouseDown(false);
   };

   return (
      <>
         <div
            style={{
               position: "absolute",
               height: "100vh",
               width: "100vw",
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
         >
            <div
               style={{
                  position: "absolute",
                  left: position.x,
                  top: position.y,
               }}
            >
               <p>This is my movable div</p>
            </div>
         </div>
         <div>
            <p>
               Mouse Position: {position.x}, {position.y}
            </p>
         </div>
      </>
   );
}
