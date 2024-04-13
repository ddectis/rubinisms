import React, { useState } from "react";
import styles from "@/styles/ToggleSlider.module.css"

export default function ToggleSlider({onToggle, isShuffleChecked, setIsShuffleChecked}) {
    
    
    const handleToggle = (event) =>{
        setIsShuffleChecked(event.target.checked)
        console.log("Checked: " + event.target.checked)
        onToggle(event.target.checked)
    }

   return (
      <div className={styles.toggleSlider}>
         <label htmlFor="toggle">
            <input
               type="checkbox"
               id="toggle"
               checked={isShuffleChecked}
               onChange={handleToggle}
            />
            <span className={styles.slider}></span>
         </label>
      </div>
   );
}
