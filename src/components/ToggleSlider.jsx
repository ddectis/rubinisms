import React, { useState } from "react";
import styles from "@/styles/ToggleSlider.module.css"

export default function ToggleSlider({onToggle}) {
    const [isChecked, setisChecked] = useState(false)
    const handleToggle = (event) =>{
        setisChecked(event.target.checked)
        console.log("Checked: " + event.target.checked)
        onToggle(event.target.checked)
    }

   return (
      <div className={styles.toggleSlider}>
         <label htmlFor="toggle">
            <input
               type="checkbox"
               id="toggle"
               checked={isChecked}
               onChange={handleToggle}
            />
            <span className={styles.slider}></span>
         </label>
      </div>
   );
}
