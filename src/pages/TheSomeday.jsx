import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.js";
import SomedayCard from "../components/SomedayCard.jsx";
import SomedayForm from "../components/SomedayForm.jsx";
import "./TheSomeday.css";
import "./TheSomeday.css";

function TheSomeday() {
  const [letters, setLetters] = useState([]);
  async function handleAddLetter(newLetter) {
    const { data, error } = await supabase
      .from("someday_letters")
      .insert([
        {
          title: newLetter.title,
          content: newLetter.content,
          unlock_at: new Date(`${newLetter.unlockDate}T00:00:00`).toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error saving letter:", error.message);
      return false;
    }

    const savedLetter = {
      ...data,
      unlockDate: new Date(data.unlock_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    if (new Date(data.unlock_at) <= new Date()) {
      setLetters((previousLetters) => [savedLetter, ...previousLetters]);
    }

    return true;
  }
  useEffect(() => {
    async function fetchLetters() {
      const { data, error } = await supabase
        .from("someday_letters")
        .select("*")
        .lte("unlock_at", new Date().toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading letters:", error.message);
        return;
      }

      const formattedLetters = data.map((letter) => ({
        ...letter,
        unlockDate: new Date(letter.unlock_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }));

      setLetters(formattedLetters);
    }

    fetchLetters();
  }, []);
  return (
    <main id="someday" className="someday-page">
      <section className="someday-hero">
        <span className="someday-eyebrow">✿ A LITTLE PLACE FOR TOMORROW ✿</span>

        <h1>
          The <em>Someday</em>
        </h1>

        <p>
          Letters to the people we have yet to become. Words waiting patiently
          for the right moment.
        </p>

        <span className="someday-decoration">✉</span>
      </section>
      <section className="someday-form-section">
        <SomedayForm onAddLetter={handleAddLetter} />
      </section>

      <section className="someday-collection">
        <div className="someday-grid">
          {letters.map((letter) => (
            <SomedayCard
              key={letter.id}
              title={letter.title}
              content={letter.content}
              unlockDate={letter.unlockDate}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default TheSomeday;
