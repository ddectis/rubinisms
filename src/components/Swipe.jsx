import styles from "@/styles/Swipe.module.css";
import homeStyles from "@/styles/Home.module.css";
import React, { useState, useEffect, MouseEvent } from "react";

export default function Swipe({quoteIndex, selectedQuote, quotes, getRandomQuote}) {
   //position is actually used to measure the swipe distance
   const [position, setPosition] = useState(0);
   //screen position is a percent that starts at 0 and feeds the transformX css property
   const [screenPosition, setScreenPosition] = useState(0);
   const [mouseDown, setMouseDown] = useState(false);
   const [initialX, setInitialX] = useState(0);
   const [swipeDistance, setSwipeDistance] = useState(0);
   const [swipeThreshold, setSwipeThreshold] = useState(0);
   const [initalMousePosition, setInitialMousePosition] = useState(0);
   //we're actually only capturing X position here since we're sliding cards left and right
   const [initialTouchPosition, setInitialTouchPosition] = useState(0);

   useEffect(() => {
      const screenWidth = window.innerWidth;
      const midPoint = screenWidth / 2;
      setInitialX(midPoint);
      //setPosition(midPoint);
      setSwipeThreshold(screenWidth * 0.35);
      console.log("Doing initial setup. Width:" + screenWidth);
   }, [initialX]);

   const handleMouseMove = (event) => {
      if (mouseDown) {
         console.log("Mousedown: " + mouseDown);
         setPosition(event.clientX - initalMousePosition);
         measureSwipeDistance();
      }
   };

   const handleMouseDown = (event) => {
      console.log("Mouse Down");
      setMouseDown(true);
      setInitialMousePosition(event.clientX);
      //setPosition({ x: event.clientX, y: position.y });
   };

   const handleMouseUp = () => {
      console.log("Handle Mouse Up");
      setMouseDown(false);
      checkForDismiss();
   };

   const handleTouchStart= (
      event
   ) => {
      console.log("Touch Start");
      const touch = event.touches[0];
      //setPosition(touch.clientX);
      setInitialTouchPosition(touch.clientX);
      setInitialX(touch.clientX);
   };

   const handleTouchMove= (event) => {
      const touch = event.touches[0];
      setPosition(touch.clientX - initialTouchPosition);
      console.log("Position: " + position);
      measureSwipeDistance();
   };

   const handleTouchStop = () => {
      console.log("Handle touch stop");
      checkForDismiss();
   };

   const measureSwipeDistance = () => {
      const swipeDistance = position;
      const screenWidth = window.innerWidth;
      const screenPosition = (position / screenWidth) * 100;
      setScreenPosition(screenPosition);
      console.log(
         "Screen Position: " +
            screenPosition +
            " Swipe Distance: " +
            swipeDistance +
            " Screen Width: " +
            screenWidth
      );
      //console.log("Swipe Distance: " + swipeDistance);
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
         if (swipeDistance > 0) {
            //slider?.classList.add(styles.dismissRight);
         } else {
            //slider?.classList.add(styles.dismissLeft);
         }
         getRandomQuote();
         setScreenPosition(0);
      } else {
         setPosition(initialX);
         setScreenPosition(0);
      }
   };

   const calculateScreenPosition = () => {
      const screenPosition = position - initialX;
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
            onTouchEnd={handleTouchStop}
         >
            <div
               
               style={{
                  position: "absolute",
                  transform: `translateX(${screenPosition}%)`,
                  top: 50,
               }}
               id="slider"
            >
               <div className={homeStyles.quote}>
                  <div className={homeStyles.quoteText}>
                     <div className={homeStyles.quoteHeading}>
                        <h2>Rubinisms</h2>
                        <h3 className={homeStyles.quoteIndex}>
                           {quoteIndex} of {quotes.length}
                        </h3>
                     </div>

                     {selectedQuote && <p>{selectedQuote.text}</p>}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}