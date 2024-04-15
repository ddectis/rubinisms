import { useState, useEffect, ReactNode } from "react";
import styles from "@/styles/Home.module.css";
import Intro from "@/components/Intro";
import NavButtons from "@/components/NavButtons";
import Swipe from "@/components/Swipe";
import CopyToClipboard from "@/components/CopyToClipboard";
import Link from "next/link";
import ToggleSlider from "@/components/ToggleSlider";

interface Quote {
   text: string;
}

const JsonParserComponent = () => {
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [quoteTemplates, setQuoteTemplates] = useState<ReactNode[]>([]);
   const [quoteTemplate, setQuoteTemplate] = useState<ReactNode>();
   const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
   const [quoteIndex, setQuoteIndex] = useState(0);
   const [quotesLoaded, setQuotesLoaded] = useState(false);
   const [lastIndexToLoad, setLastIndexToLoad] = useState(0);
   const [firstIndexToLoad, setFirstIndexToLoad] = useState(0);
   //swipe through sequentially if false, shuffle randomly if true
   const [shuffleCards, setShuffleCards] = useState(false);
   const [isShuffleChecked, setisShuffleChecked] = useState(false);

   let loadedQuotes: Quote[] = [];

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

      if (quotesLoaded) {
         const quote = quotes[lastIndexToLoad].text;
         const template = (
            <div
               className={`${styles.quote} ${styles.hideOnLoad}`}
               key={lastIndexToLoad}
               id={`quote-${lastIndexToLoad}`}
            >
               <div className={styles.quoteText}>
                  <div className={styles.quoteHeading}>
                     <h2>Rubinisms</h2>
                     <h3 className={styles.quoteIndex}>
                        {lastIndexToLoad} of {quotes.length}
                     </h3>
                  </div>
                  <p id="quote-text">{quote}</p>
               </div>
            </div>
         );
         setQuoteTemplate(template);
         setTimeout(() => removeHidefterLoad(lastIndexToLoad), 400);
      }
   }, [lastIndexToLoad]);

   useEffect(() => {
      //quotes start with 0 opacity, removing the hideOneLoad class will make them visible
      //method is called in the FOR loop lower in this useEffect hook
      const removeHidefterLoad = (id: number) => {
         //console.log("Removing hide")
         const divToRemove = document.getElementById(`quote-${id}`);
         //console.log(divToRemove)
         divToRemove?.classList.remove(`${styles.hideOnLoad}`);
      };
      console.log(
         "loading quotes from " + firstIndexToLoad + " to " + lastIndexToLoad
      );
      console.log("Loaded Quotes Pre: ", loadedQuotes);
      const firstFiveQuotes: Quote[] = quotes.slice(
         firstIndexToLoad,
         lastIndexToLoad
      );
      loadedQuotes = [...firstFiveQuotes, ...loadedQuotes];
      console.log("Loaded Quotes Post: ", loadedQuotes);
      const templateOfQuotes = [];

      console.log("first five shit,. Length: " + firstFiveQuotes.length);
      console.log(firstFiveQuotes[0]);
      for (let i = 0; i < loadedQuotes.length; i++) {
         const quote = loadedQuotes[i];
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
      console.log("Geting next Quote. Shuffle: " + shuffleCards);
      if (quotes.length > 0) {
         // Check if quotes are loaded before accessing them
         setQuoteIndex(Math.floor(Math.random() * quotes.length));
         if (!shuffleCards) {
            setLastIndexToLoad(lastIndexToLoad + 1);
         } else {
            const rnd = Math.floor(Math.random() * quotes.length);
            console.log("Rnd: " + rnd);
            setFirstIndexToLoad(rnd - 2);
            setLastIndexToLoad(rnd);
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
      const quoteText = quotes[lastIndexToLoad - 1].text;

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

   const handleShuffleChange = (value: boolean) => {
      console.log("Handling shuffle change. Setting to: " + value);
      setShuffleCards(value);
   };

   const handleSliderHolderClick = () => {
      if (isShuffleChecked) {
         setisShuffleChecked(false);
      } else {
         setisShuffleChecked(true);
      }
      setShuffleCards(isShuffleChecked);
      console.log("slider div click. Shuffle Checked: " + shuffleCards);
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
                     {/* <button
                     className={styles.randomButton}
                     onClick={startFromRandom}
                  >
                     Get Random Quote
                  </button> */}
                     <Link href="/list" className={styles.mainMenuButtons}>
                        Browse / Search List
                     </Link>
                  </div>
                  <ToggleSlider
                     onToggle={handleShuffleChange}
                     isShuffleChecked={isShuffleChecked}
                     setIsShuffleChecked={setisShuffleChecked}
                     shuffleCards={shuffleCards}
                     setShuffleCards={setShuffleCards}
                  />
               </div>

               {/* {quoteTemplates.map((template, index) => {
                  return (
                     <Swipe
                        key={index}
                        content={template}
                        actionOnDismissRight={getNextQuote}
                        actionOnDismissLeft={getPreviousQuote}
                        cardIndex={index}
                     />
                  );
               })} */}
               <Swipe
                  content={quoteTemplate}
                  actionOnDismissRight={getNextQuote}
                  actionOnDismissLeft={getPreviousQuote}
                  cardIndex={lastIndexToLoad}
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

         {/* <NavButtons
            getNextQuote={getNextQuote}
            getRandomQuote={getRandomQuote}
            getPreviousQuote={getPreviousQuote}
         /> */}
      </div>
   );
};

export default JsonParserComponent;
