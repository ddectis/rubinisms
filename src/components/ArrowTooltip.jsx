import { useEffect } from "react";
import styles from "@/styles/ArrowTooltip.module.css";

export default function ArrowTooltip({ initialSwipeDetected }) {
   //hide the tooltip when initial swipe has been detected
   useEffect(() => {
      const hideToolTip = () => {
         const toolTip = document.getElementById("tooltip");
         toolTip.classList.add(styles.hide);
      };

      if (initialSwipeDetected) {
         console.log("hiding tool tip");
         hideToolTip();
      }
   }, [initialSwipeDetected]);

   return (
      <div className={styles.toolTip} id="tooltip">
         <img
            className={styles.flipped}
            src="\arrow-line-right.png"
            alt="Right Arrow"
         />
         <p>Swipe for next</p>{" "}
         <img src="\arrow-line-right.png" alt="Right Arrow" />
      </div>
   );
}
