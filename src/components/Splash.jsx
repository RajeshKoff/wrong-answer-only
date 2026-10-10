export default function Splash({ onStart, onLeaderboard, highScore = 0 }) {
  return <div className="screen splash-screen">
    <button className="top-score-link" onClick={onLeaderboard}><span><i>HIGH</i> <b>SCORE :</b></span><strong>{highScore.toLocaleString()}</strong></button>
    <div className="logo-wrap">
      <h1 className="glitch-logo" data-text="WRONG ANSWER"><span>WRONG</span><br />ANSWER</h1>
      <div className="logo-only">ONLY <i>✦</i></div>
      <div className="logo-stamp">WAO!<br /><small>QUIZ</small></div>
    </div>
    <p className="splash-copy">Every option looks right.<br /><b>Your job? Pick the one that isn't.</b></p>
    <button className="arcade-button start-button" onClick={onStart}>TAP TO START <span>➜</span></button>
    <div className="sticker sticker-one" aria-hidden="true">100%<br />WRONG</div>
    <div className="sticker sticker-two" aria-hidden="true">WRONG<br />IS RIGHT!</div>

  </div>;
}
