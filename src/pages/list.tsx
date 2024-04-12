import { useEffect, useState } from "react";
import styles from "@/styles/List.module.css"


interface Quote {
    text: string;
 }

export default function List(){

    const [quotes, setQuotes] = useState<Quote[]>([]);
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

    return (
    <div className={styles.content}>
        <h1>The Full List</h1>
        {quotes.map((quote, index) => (
            <div className={styles.quoteCard} key={index}>
                <h3 className={styles.quoteNumber}>#{index}</h3>
                <p>{quote.text}</p>
                </div>
        ))}

        
    </div>
 )   
}