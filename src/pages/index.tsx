import { useState, useEffect, ReactNode } from "react";
import styles from "@/styles/Home.module.css";
import Intro from "@/components/Intro";
import NavButtons from "@/components/NavButtons";
import Swipe from "@/components/Swipe";
import CopyToClipboard from "@/components/CopyToClipboard";

interface Quote {
   text: string;
}

const JsonParserComponent = () => {
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [quoteTemplates, setQuoteTemplates] = useState<ReactNode[]>([]);
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
                  {selectedQuote && <p id="quote-text">{selectedQuote.text}</p>}
               </div>
            </div>
         </>
      );
   }, [selectedQuote]);

   useEffect(() => {
      const templateOfQuotes = quotes.map((quote, index) => (
         <>
            {/* {console.log("mapping. quotes: " + quotes.length + " text: " + quote.text)} */}
            <div className={styles.quote} style={{zIndex: index}}>
               <div className={styles.quoteText}>
                  <div className={styles.quoteHeading}>
                     <h2>Rubinisms</h2>
                     <h3 className={styles.quoteIndex}>
                        {index} of {quotes.length - 1}
                     </h3>
                  </div>
                  <p id="quote-text">{quote.text}</p>
               </div>
            </div>
         </>
      ));
      setQuoteTemplates(templateOfQuotes);
   }, [quotes]);

   useEffect(() => {
      console.log("Length: " + quoteTemplates.length);
   }, [quoteTemplates]);

   useEffect(() => {
      setSelectedQuote(quotes[quoteIndex]);
   }, [quoteIndex]);

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

   const copyCurrentQuoteToClipboard = () => {
      console.log("Copying to clipboard");
   };

   return (
      <div className={styles.main}>
         {quotesLoaded ? (
            <>
               {quoteTemplates.map((template, index) => {
                  index++
                  return (
                     <Swipe
                        key={index}
                        content={template}
                        actionOnDismiss={getRandomQuote}
                        cardIndex={index}
                     />
                  );
               })}
            </>
         ) : (
            <>
               <Intro />
            </>
         )}
         <CopyToClipboard onClick={copyCurrentQuoteToClipboard} />
         <NavButtons
            getNextQuote={getNextQuote}
            getRandomQuote={getRandomQuote}
            getPreviousQuote={getPreviousQuote}
         />
      </div>
   );
};

export default JsonParserComponent;
