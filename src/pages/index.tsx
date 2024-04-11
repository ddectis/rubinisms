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
   const [content, setContent] = useState(<></>);

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

   useEffect(() => {
      setContent(
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
      );
   }, [selectedQuote]);

   useEffect(() =>{
      setSelectedQuote(quotes[quoteIndex]);
   }, [quoteIndex])

   const getRandomQuote = () => {
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         setQuoteIndex(Math.floor(Math.random() * quotes.length));
         

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
               content={content}
               actionOnDismiss={getRandomQuote} />
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
