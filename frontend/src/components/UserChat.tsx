import { useState } from "react";
import styles from "./css/Resources.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserChat() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const responseReceived = answer !== "";

  async function submitQuery(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/Chat/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({question : query}),
    });
    if (!response.ok) {
      throw new Error("Något gick fel vid förfrågan.");
    }
    console.log(response);
    const answer: string = await response.text();
    setAnswer(answer);
    console.log("answer: " + answer);
  }

  return (
    <section className={styles.resourcesWrapper}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>AI-chat</p>
        <p>Fråga något</p>
        <form onSubmit={submitQuery}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            size={60}
            placeholder="När kan jag boka ett skrivbord i 4 timmar, så snart som möjligt?"
          />
          <button type="submit">Skicka fråga</button>
        </form>
        {responseReceived && (
          <output
            style={{
              display: "inline-block",
              width: "400px",
              minHeight: "1.5em",
              padding: "0.4rem 0.6rem",
              border: "1px solid #767676",
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#222",
              boxSizing: "border-box",
              font: "inherit",
              lineHeight: 1.4,
              verticalAlign: "middle",
            }}
          >
            {answer}
          </output>
        )}
      </div>
    </section>
  );
}
