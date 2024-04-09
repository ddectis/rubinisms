import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Intro from "@/components/Intro";
import NavButtons from "@/components/NavButtons";
import Swipe from "@/components/Swipe";

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

   const getNextQuote = () => {
      console.log("getting next quote");
      setQuoteIndex(quoteIndex + 1);
      if (quoteIndex > quotes.length) {
         setQuoteIndex(0);
      }
      setSelectedQuote(quotes[quoteIndex]);
      setQuotesLoaded(true);
   };

   const getPreviousQuote = () => {
      console.log("getting previous quote");
      setQuoteIndex(quoteIndex - 1);
      if (quoteIndex < 0) {
         setQuoteIndex(quotes.length);
      }
      setSelectedQuote(quotes[quoteIndex]);
      setQuotesLoaded(true);
   };

   return (
      <div className={styles.main}>
         {quotesLoaded ? (
            <>
               <Swipe
               quoteIndex={quoteIndex}
               selectedQuote={selectedQuote}
               quotes={quotes}
               />

            </>
         ) : (
            <>
               <Intro />
            </>
         )}
         <NavButtons
            getNextQuote={getNextQuote}
            getRandomQuote={getRandomQuote}
            getPreviousQuote={getPreviousQuote}
         />
      </div>
   );
};

export default JsonParserComponent;
