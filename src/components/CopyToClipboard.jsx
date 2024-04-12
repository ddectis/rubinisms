import styles from "@/styles/copyToClipboard.module.css";

export default function CopyToClipboard({ copyFunction }) {
   const copyToClipboard = () => {
      const quoteText = document.getElementById("quote-text").innerText;

      // Create a textarea element to hold the text temporarily
      const textarea = document.createElement("textarea");
      textarea.value = quoteText;

      // Append the textarea to the body
      document.body.appendChild(textarea);

      // Select the text inside the textarea
      textarea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the textarea from the body
      document.body.removeChild(textarea);

      // Alert or show a notification indicating the text has been copied
      alert("Text copied to clipboard!");
   };
   return (
      <>
         <button className={styles.copyButton} onClick={copyFunction}>
            Copy To Clipboard
         </button>
      </>
   );
}
