import React, { useState, useEffect } from "react";
import styles from "@/styles/ToggleSlider.module.css";

export default function ToggleSlider({
   onToggle,
   isShuffleChecked,
   setIsShuffleChecked,
   shuffleCards,
   setShuffleCards
}) {
   
   useEffect(() =>{
      console.log("Checked: " + shuffleCards);
   }, [shuffleCards])
   
   const handleToggle = (event) => {
      setShuffleCards(shuffleCards => !shuffleCards)
      
      //onToggle(event.target.checked);
   };

   return (
      <div className={styles.sliderHolder} onClick={handleToggle}>
         <div className={styles.toggleSlider}>
            <label htmlFor="toggle">
               <input
                  type="checkbox"
                  id="toggle"
                  checked={shuffleCards}
                  onChange={(e) =>{
                     e.stopPropagation()
                  }}
               />
               <span className={styles.slider}></span>
            </label>
         </div>
         <p className={styles.enableShuffleLabel}>Enable Shuffle</p>
      </div>
   );
}
