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
   const [lastIndexToLoad, setLastIndexToLoad] = useState(5);
   const [firstIndexToLoad, setFirstIndexToLoad] = useState(0);
   let templateOfQuotes: JSX.Element[] = [];
   let additionalQuote: JSX.Element = <></>

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

   //use this only on page load to load the first set of cards
   useEffect(() => {
      console.log("First Five Quotes");
      const firstFiveQuotes = quotes.slice(0, lastIndexToLoad);
      for (let i = 0; i >= 0; i--) {
         const quote = firstFiveQuotes[i];
         templateOfQuotes.push(
            <div className={styles.quote} key={i}>
               <div className={styles.quoteText}>
                  <div className={styles.quoteHeading}>
                     <h2>Rubinisms</h2>
                     <h3 className={styles.quoteIndex}>
                        {i + 1} of {quotes.length}
                     </h3>
                  </div>
                  <p id="quote-text">{quote.text}</p>
               </div>
            </div>
         );
      }

      setQuoteTemplates(templateOfQuotes);
   }, [quotes]);

   useEffect(() => {
      console.log("Length: " + quoteTemplates.length);
   }, [quoteTemplates]);

   // useEffect(() => {
   //    setSelectedQuote(quotes[quoteIndex]);
   // }, [quoteIndex]);

   useEffect(() =>{

   }, [lastIndexToLoad])

   const getRandomQuote = () => {
      console.log("Get Random Quote");
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         setQuoteIndex(Math.floor(Math.random() * quotes.length)); //not functional

         setLastIndexToLoad(lastIndexToLoad + 1);
         setFirstIndexToLoad(firstIndexToLoad + 1);
         appendNewQuoteToArray();
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

   const appendNewQuoteToArray = () => {
      console.log(
         "appending new quote to array. Last Index: " + lastIndexToLoad
      );
      const updatedTemplates = quoteTemplates.slice(0, -1);
      setQuoteTemplates(updatedTemplates);
      const newQuote = (
         <div className={styles.quote} key={lastIndexToLoad}>
            <div className={styles.quoteText}>
               <div className={styles.quoteHeading}>
                  <h2>Rubinismssss</h2>
                  <h3 className={styles.quoteIndex}>
                     {lastIndexToLoad} of {quotes.length}
                  </h3>
               </div>
               <p id="quote-text">{quotes[lastIndexToLoad].text}</p>
            </div>
         </div>
      );
      console.log(newQuote)
      setQuoteTemplates([...quoteTemplates, newQuote]);
      
   };

   return (
      <div className={styles.main}>
         {quotesLoaded ? (
            <>
               {quoteTemplates.map((template, index) => {
                  //console.log(template)
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
