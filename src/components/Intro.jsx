import styles from "@/styles/Home.module.css";

export default function Intro() {
   return (
      <>
         <h1>Rubinisms</h1>
         <p className={styles.intro}>
            When I read{" "}
            <a
               href="https://www.penguinrandomhouse.com/books/717356/the-creative-act-by-rick-rubin/"
               target="_blank"
               className={styles.link}
            >
               The Creative Act: A Way of Being by Rick Ruben
            </a>{" "}
            I found myself highllighting passage after passage. There are so
            many lines that inspired. Lines that I feel like I would be best
            served to remember while I am creating. So I put together this page
            to share those quotes with my friends. I hope you find them
            similarly inspirational.
            <br /> <br />
            And, get the book. Read it.
            <br />
            <br />- Dan
         </p>
      </>
   );
}
