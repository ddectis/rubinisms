import { useEffect, useState, ChangeEvent } from "react";
import styles from "@/styles/List.module.css";

interface Quote {
   text: string;
}

export default function List() {
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [textSearchInputValue, setTextSearchInputValue] = useState('')

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

   const handleTextSearch = (event: ChangeEvent<HTMLInputElement>) =>{
    setTextSearchInputValue(event.target.value)
   }


   const filteredQuotes = quotes.filter((quote) =>
    quote.text.toLowerCase().includes(textSearchInputValue.toLowerCase())
   )

   return (
      <div className={styles.content}>
         <h2 className={styles.pageTitle}>The List of Rubinisms</h2>
         <input
            className={styles.searchField}
            type="text"
            value={textSearchInputValue}
            onChange={handleTextSearch}
            placeholder="Filter / Search"
         />

         {filteredQuotes.map((quote, index) => (
            <div className={styles.quoteCard} key={index}>
               <h3 className={styles.quoteNumber}>#{index}</h3>
               <p>{quote.text}</p>
            </div>
         ))}
      </div>
   );
}
