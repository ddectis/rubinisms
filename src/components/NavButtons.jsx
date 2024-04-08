import styles from "@/styles/Home.module.css";


export default function NavButtons({getNextQuote, getPreviousQuote, getRandomQuote}){
    return (
        <div className={styles.navButtonHolder}>
        <button
           className={`${styles.getRandomQuoteButton} ${styles.negQuote}`}
           onClick={getPreviousQuote}
        >
           -
        </button>
        <button
           className={styles.getRandomQuoteButton}
           onClick={getRandomQuote}
        >
           Random
        </button>
        <button
           className={`${styles.getRandomQuoteButton} ${styles.plusQuote}`}
           onClick={getNextQuote}
        >
           +
        </button>
     </div>
    )
}