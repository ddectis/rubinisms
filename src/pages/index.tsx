import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Intro from "@/components/Intro"

interface Quote {
   text: string;
}

const JsonParserComponent = () => {
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
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

   const getRandomQuote = () => {
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         setQuoteIndex(Math.floor(Math.random() * quotes.length));
         setSelectedQuote(quotes[quoteIndex]);
         setQuotesLoaded(true);
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
                     <div className={styles.quoteHeading}>
                        <h2>Rubinisms</h2>
                        <h3 className={styles.quoteIndex}>
                           {quoteIndex} of {quotes.length}
                        </h3>
                     </div>

                     {selectedQuote && <p>{selectedQuote.text}</p>}
                  </div>
               </div>
            </>
         ) : (
            <>
               <Intro/>
            </>
         )}
         <button className={styles.getRandomQuoteButton} onClick={getRandomQuote}>
            Grab Random Quote
         </button>
      </div>
   );
};

export default JsonParserComponent;
