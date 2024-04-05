import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

const JsonParserComponent = () => {
   const [quotes, setQuotes] = useState([]);
   const [selectedQuote, setSelectedQuote] = useState("");
   const [quoteIndex, setQuoteIndex] = useState(0);
   const [quotesLoaded, setQuotesLoaded] = useState(false);

   useEffect(() => {
      const loadJsonFile = async () => {
         try {
            const response = await fetch("/rubinisms.json");
            const parsedQuotes = await response.json();
            setQuotes(parsedQuotes.quotes);
            setQuoteIndex(Math.floor(Math.random() * quotes.length));
            //setSelectedQuote(quotes[quoteIndex]);
            //setQuotesLoaded(true);
         } catch (error) {
            console.error("Error loading JSON file:", error);
         }
      };

      loadJsonFile();
   }, []); // Empty dependency array ensures it runs only once on mount

   const handleRandomQuote = () => {
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         setQuoteIndex(Math.floor(Math.random() * quotes.length));
         setSelectedQuote(quotes[quoteIndex]);
         setQuotesLoaded(true)
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
      } else {
         console.log("Quotes not yet loaded. Please wait.");
      }
   };

   return (
      <div className={styles.main}>
         {quotesLoaded ? (
            <>
               <div className={styles.quote}>
                  <div className={styles.quoteText}>
                     <h2 className={styles.quoteIndex}>#{quoteIndex}</h2>
                     <p>{selectedQuote.text}</p>
                  </div>
               </div>
            </>
         ) : (
            <p>When I read <a href="https://www.penguinrandomhouse.com/books/717356/the-creative-act-by-rick-rubin/" target="_blank">The Creative Act: A Way of Being by Rick Ruben</a></p>
         )}
         <button
                  className={styles.getQuoteButton}
                  onClick={handleRandomQuote}
               >
                  Grab Random Quote
               </button>
      </div>
   );
};

export default JsonParserComponent;
