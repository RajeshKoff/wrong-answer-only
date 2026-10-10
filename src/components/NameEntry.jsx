import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const blocked = /\b(fuck|shit|bitch|bastard|asshole|piss)\b/i;
export default function NameEntry({ onSubmit, onBack }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const clean = name.trim().replace(/\s+/g, " ");
    if (clean.length < 3 || clean.length > 12) return setError("Keep it 3–12 characters, machi.");
    if (!/^[\p{L}\p{N}_ ]+$/u.test(clean)) return setError("Letters, numbers, spaces or _ only.");
    if (blocked.test(clean)) return setError("Choose a friendly gamer tag!");
    onSubmit(clean);
  };
  return <div className="screen centered-screen">
    <button className="back-button" onClick={onBack} aria-label="Back"><ArrowLeft size={18} /></button>
    <div className="sticker name-entry-sticker name-entry-sticker-extra name-entry-sticker-top-left" aria-hidden="true">ODD ONE<br />OUT</div>
    <div className="name-entry-content">
      <span className="eyebrow">PLAYER SETUP</span>
      <h2 className="screen-title">WHAT DO<br />WE CALL YOU?</h2>

      <form className="name-form" onSubmit={submit}>
        <label htmlFor="gamer-name">YOUR GAMER TAG</label>
        <input id="gamer-name" autoFocus autoComplete="nickname" maxLength={16} value={name} onChange={(event) => { setName(event.target.value); setError(""); }} placeholder="e.g. Thalapathy" />
        <div className="input-foot"><span>{error || "3–12 characters • keep it friendly"}</span><span>{name.trim().length}/12</span></div>
        <div className="name-entry-button-wrap">
          <div className="sticker name-entry-sticker name-entry-sticker-bottom" aria-hidden="true">TAG<br />UP!</div>
          <button className="arcade-button full-button" type="submit">LET'S PLAY <span>➜</span></button>
        </div>
      </form>
    </div>
  </div>;
}
