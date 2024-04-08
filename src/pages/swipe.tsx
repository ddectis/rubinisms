import styles from "@/styles/Swipe.module.css";
import React, { useState, useEffect, MouseEvent } from "react";

export default function Swipe() {
   const [position, setPosition] = useState(0);
   const [mouseDown, setMouseDown] = useState(false);
   const [initialX, setInitialX] = useState(0);
   const [swipeDistance, setSwipeDistance] = useState(0);
   const [swipeThreshold, setSwipeThreshold] = useState(0);
   const [initalMousePosition, setInitialMousePosition] = useState({
      x: 0,
      y: 0,
   });

   useEffect(() => {
      const screenWidth = window.innerWidth;
      const midPoint = screenWidth / 2;
      setInitialX(midPoint);
      setPosition(midPoint);
      setSwipeThreshold(screenWidth * 0.3);
      console.log("Doing initial setup. Width:" + screenWidth);
   }, [initialX]);

   const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
      if (mouseDown) {
         console.log("Mousedown: " + mouseDown);
         setPosition(event.clientX);
         measureSwipeDistance();
      }
   };

   const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
      event: MouseEvent<HTMLDivElement>
   ) => {
      console.log("Mouse Down");
      setMouseDown(true);
      setInitialMousePosition({ x: event.clientX, y: event.clientY });
      //setPosition({ x: event.clientX, y: position.y });
   };

   const handleMouseUp = () => {
      console.log("Handle Mouse Up");
      setMouseDown(false);
      checkForDismiss();
   };

   const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (
      event
   ) => {
      console.log("Touch Start");
      const touch = event.touches[0];
      setPosition(touch.clientX);
   };

   const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
      const touch = event.touches[0];
      setPosition(touch.clientX);
      measureSwipeDistance();
   };

   const handleTouchStop = () => {
      console.log("Handle touch stop");
      checkForDismiss();
   };

   const measureSwipeDistance = () => {
      const swipeDistance = initialX - position;
      console.log("Swipe Distance: " + swipeDistance);
      setSwipeDistance(swipeDistance);
   };

   const checkForDismiss = () => {
      console.log(
         "Checking for swipe dismiss. Distance: " +
            swipeDistance +
            " Thresh: " +
            swipeThreshold
      );
      if (Math.abs(swipeDistance) > swipeThreshold) {
         console.log("swipe threshold exceeded");
         const slider = document.getElementById("slider");
         if (swipeDistance < 0) {
            slider?.classList.add(styles.dismissRight);
         } else {
            slider?.classList.add(styles.dismissLeft);
         }
      } else {
         setPosition(initialX);
      }
   };

   return (
      <>
         <div
            className={styles.content}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchCancel={handleTouchStop}
         >
            <div
               style={{
                  position: "absolute",
                  left: position,
                  top: 50,
               }}
               id="slider"
            >
               <p>This is my movable div</p>
            </div>
         </div>
      </>
   );
}
