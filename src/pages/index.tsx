import { useState, useEffect, ReactNode } from "react";
import styles from "@/styles/Home.module.css";
import Intro from "@/components/Intro";
import Swipe from "@/components/Swipe";
import CopyToClipboard from "@/components/CopyToClipboard";
import Link from "next/link";
import ToggleSlider from "@/components/ToggleSlider";
import ArrowTooltip from "@/components/ArrowTooltip";

interface Quote {
   text: string;
}

const JsonParserComponent = () => {
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [quoteTemplate, setQuoteTemplate] = useState<ReactNode>();
   const [quotesLoaded, setQuotesLoaded] = useState(false);
   const [quoteIndex, setQuoteIndex] = useState(0);
   //swipe through sequentially if false, shuffle randomly if true
   const [shuffleCards, setShuffleCards] = useState(false);
   const [initialSwipeDetected, setInitialSwipeDetected] = useState(false);

   useEffect(() => {
      const loadJsonFile = async () => {
         try {
            const response = await fetch("/rubinisms.json");
            const parsedQuotes = await response.json();
            setQuotes(parsedQuotes.quotes);
         } catch (error) {
            console.error("Error loading JSON file:", error);
         }
      };

      loadJsonFile();
   }, []); // Empty dependency array ensures it runs only once on mount

   useEffect(() => {
      const removeHidefterLoad = (id: number) => {
         //console.log("Removing hide")
         const divToRemove = document.getElementById(`quote-${id}`);
         //console.log(divToRemove)
         divToRemove?.classList.remove(`${styles.hideOnLoad}`);
      };

      if (quotesLoaded) {
         const quote = quotes[quoteIndex].text;
         const template = (
            <div
               className={`${styles.quote} ${styles.hideOnLoad}`}
               key={quoteIndex}
               id={`quote-${quoteIndex}`}
            >
               <div className={styles.quoteText}>
                  <div className={styles.quoteHeading}>
                     <h2>Rubinism</h2>
                     <h3 className={styles.quoteIndex}>
                        {quoteIndex} of {quotes.length}
                     </h3>
                  </div>
                  <p id="quote-text">{quote}</p>
               </div>
            </div>
         );
         setQuoteTemplate(template);
         setTimeout(() => removeHidefterLoad(quoteIndex), 400);
      }
   }, [quoteIndex]);

   const getNextQuote = () => {
      console.log("Geting next Quote. Shuffle: " + shuffleCards);
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         if (!shuffleCards) {
            setQuoteIndex(quoteIndex + 1);
         } else {
            const rnd = Math.floor(Math.random() * quotes.length);
            console.log("Rnd: " + rnd);

            setQuoteIndex(rnd);
         }

         //appendNewQuoteToArray();
         setQuotesLoaded(true);
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
      } else {
         console.log("Quotes not yet loaded. Please wait.");
      }
   };

   const getPreviousQuote = () => {
      setQuoteIndex(quoteIndex - 1);
   };

   const startFromBeginning = () => {
      setQuoteIndex(quoteIndex + 1);
      setQuotesLoaded(true);
   };

   const startFromRandom = () => {
      const rnd = Math.floor(Math.random() * quotes.length);
      console.log("Rnd " + rnd);
      setShuffleCards(true);

      setQuoteIndex(rnd + 1);
      setQuotesLoaded(true);
   };

   const copyCurrentQuoteToClipboard = () => {
      console.log("Copying to clipboard");
      const quoteText = quotes[quoteIndex - 1].text;

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
   };

   return (
      <div className={styles.main}>
         {quotesLoaded ? (
            <>
               <div className={styles.outerMenu}>
                  <div className={styles.menu}>
                     <CopyToClipboard
                        copyFunction={copyCurrentQuoteToClipboard}
                     />
                     <Link href="/list" className={styles.mainMenuButtons}>
                        Browse / Search List
                     </Link>
                  </div>
                  <ToggleSlider
                     shuffleCards={shuffleCards}
                     setShuffleCards={setShuffleCards}
                  />
               </div>
               <ArrowTooltip initialSwipeDetected={initialSwipeDetected} />
               <Swipe
                  content={quoteTemplate}
                  actionOnDismissRight={getNextQuote}
                  actionOnDismissLeft={getPreviousQuote}
                  cardIndex={quoteIndex}
                  setInitialSwipeDetected={setInitialSwipeDetected}
               />
            </>
         ) : (
            <>
               <Intro />
               <div className={styles.oneAtTime}>
                  <h3>Swipe through</h3>
                  <button
                     onClick={startFromBeginning}
                     className={styles.mainMenuButtons}
                  >
                     Starting from the beginning
                  </button>

                  <button
                     onClick={startFromRandom}
                     className={styles.mainMenuButtons}
                  >
                     Or Get a Random Quote
                  </button>
               </div>
               <div className={styles.oneAtTime}>
                  <h3>Dive Deep</h3>
                  <Link href="/list" className={styles.mainMenuButtons}>
                     Browse / Search List
                  </Link>
               </div>
            </>
         )}
      </div>
   );
};

export default JsonParserComponent;
