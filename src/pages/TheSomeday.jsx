import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.js";
import "./TheSomeday.css";

function TheSomeday() {
  return (
    <main id="someday" className="someday-page">
      <section className="someday-hero">
        <span className="someday-eyebrow">
          ✿ A LITTLE PLACE FOR TOMORROW ✿
        </span>

        <h1>
          The <em>Someday</em>
        </h1>

        <p>
          Letters to the people we have yet to become.
          Words waiting patiently for the right moment.
        </p>

        <span className="someday-decoration">✉</span>
      </section>
    </main>
  );
}

export default TheSomeday;