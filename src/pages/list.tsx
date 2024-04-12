import { useEffect, useState, ChangeEvent } from "react";
import styles from "@/styles/List.module.css";

interface Quote {
   text: string;
}

export default function List() {
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [inputValue, setInputValue] = useState('')

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

   const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value)
   }

   const filteredQuotes = quotes.filter((quote) =>
    quote.text.toLowerCase().includes(inputValue.toLowerCase())
   )

   return (
      <div className={styles.content}>
         <h1>The Full List</h1>
         <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search quotes..."
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
