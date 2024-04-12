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
   const [lastIndexToLoad, setLastIndexToLoad] = useState(0);
   const [firstIndexToLoad, setFirstIndexToLoad] = useState(0);

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
      const removeHidefterLoad = (id: number) => {
         //console.log("Removing hide")
         const divToRemove = document.getElementById(`quote-${id}`);
         //console.log(divToRemove)
         divToRemove?.classList.remove(`${styles.hideOnLoad}`);
      };

      const firstFiveQuotes = quotes.slice(firstIndexToLoad, lastIndexToLoad);
      const templateOfQuotes = [];
      console.log("first five shit,. Length: " + firstFiveQuotes.length);
      console.log(firstFiveQuotes[0]);
      for (let i = 0; i < firstFiveQuotes.length; i++) {
         const quote = firstFiveQuotes[i];
         templateOfQuotes.push(
            <div
               className={`${styles.quote} ${styles.hideOnLoad}`}
               key={i}
               id={`quote-${i}`}
            >
               <div className={styles.quoteText}>
                  <div className={styles.quoteHeading}>
                     <h2>Rubinisms</h2>
                     <h3 className={styles.quoteIndex}>
                        {lastIndexToLoad} of {quotes.length}
                     </h3>
                  </div>
                  <p id="quote-text">{quote.text}</p>
               </div>
            </div>
         );

         setTimeout(() => removeHidefterLoad(i), 400);
      }

      setQuoteTemplates(templateOfQuotes);
      console.log(quoteTemplates);
   }, [quotes, lastIndexToLoad]);

   useEffect(() => {
      console.log("Length: " + quoteTemplates.length);
   }, [quoteTemplates]);

   useEffect(() => {
      setSelectedQuote(quotes[quoteIndex]);
   }, [quoteIndex]);

   const getNextQuote = () => {
      console.log("Geting next Quote");
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         setQuoteIndex(Math.floor(Math.random() * quotes.length));
         setLastIndexToLoad(lastIndexToLoad + 1);
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
      setLastIndexToLoad(lastIndexToLoad - 1);
   };

   const startFromBeginning = () => {
      setLastIndexToLoad(lastIndexToLoad + 1);
      setQuotesLoaded(true);
   };

   const startFromRandom = () => {
      const rnd = Math.floor(Math.random() * quotes.length);
      console.log("Rnd " + rnd);
      setFirstIndexToLoad(rnd);
      setLastIndexToLoad(rnd + 1);
      setQuotesLoaded(true);
   };

   // const getNextQuote = () => {
   //    console.log("getting next quote");
   //    setQuoteIndex(quoteIndex + 1);
   //    if (quoteIndex > quotes.length) {
   //       setQuoteIndex(0);
   //    }
   //    setSelectedQuote(quotes[quoteIndex]);
   //    setQuotesLoaded(true);
   // };

   // const getPreviousQuote = () => {
   //    console.log("getting previous quote");
   //    setQuoteIndex(quoteIndex - 1);
   //    if (quoteIndex < 0) {
   //       setQuoteIndex(quotes.length);
   //    }
   //    setSelectedQuote(quotes[quoteIndex]);
   //    setQuotesLoaded(true);
   // };

   const copyCurrentQuoteToClipboard = () => {
      console.log("Copying to clipboard");
   };

   const appendNewQuoteToArray = () => {
      console.log(
         "appending new quote to array. Last Index: " + lastIndexToLoad
      );
      //const updatedTemplates = quoteTemplates.slice(0, -1);
      //setQuoteTemplates(updatedTemplates);
      const newQuote = (
         <div
            className={`${styles.quote} ${styles.hideOnLoad}`}
            key={lastIndexToLoad}
         >
            {" "}
            id={lastIndexToLoad}
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
      console.log(newQuote);
      setQuoteTemplates([newQuote, ...quoteTemplates]);
   };

   return (
      <div className={styles.main}>
         {quotesLoaded ? (
            <>
               {quoteTemplates.map((template, index) => {
                  return (
                     <Swipe
                        key={index}
                        content={template}
                        actionOnDismissRight={getNextQuote}
                        actionOnDismissLeft={getPreviousQuote}
                        cardIndex={index}
                     />
                  );
               })}
               {/* <CopyToClipboard onClick={copyCurrentQuoteToClipboard} /> */}
               <div>
                  <br />
                  <button
                     className={styles.randomButton}
                     onClick={startFromRandom}
                  >
                     Get Random Quote
                  </button>
               </div>
            </>
         ) : (
            <>
               <Intro />
               <button onClick={startFromBeginning}>
                  Start from the beginning
               </button>

               <button onClick={startFromRandom}>Get Random Quote</button>
            </>
         )}

         {/* <NavButtons
            getNextQuote={getNextQuote}
            getRandomQuote={getRandomQuote}
            getPreviousQuote={getPreviousQuote}
         /> */}
      </div>
   );
};

export default JsonParserComponent;
