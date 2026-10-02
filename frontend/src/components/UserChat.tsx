import styles from "./css/Resources.module.css";

export default function UserChat() {
  return (
    <section className={styles.resourcesWrapper}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>AI-chat</p>
        <p>Fråga något</p>
        <input
          type="text"
          size={60}
          placeholder="När kan jag boka ett skrivbord i 4 timmar, så snart som möjligt?"
        />
        <p></p>
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
          Idag kl 10-14 finns det lediga skrivbord.
        </output>
      </div>
    </section>
  );
}
