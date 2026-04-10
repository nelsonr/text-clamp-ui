import { ResizableContainer, TextClamp } from "./components";
import "./App.css";
import { useState } from "react";

const totallyNormalFileNames = [
  "Working Day (2010) [2160p] [HD] [SupaRay] [5.1] [SYT.XM].wmv",
  "Meeting_Notes_That_Could_Have_Been_An_Email.txt",
  "Budget_Draft_DO_NOT_SHOW_MANAGEMENT_v2_FINAL.xlsx",
];

function App() {
  const [emoji, setEmoji] = useState(() => randomEmoji());
  const setRandomEmoji = () => setEmoji(randomEmoji());

  return (
    <main>
      <div className="note">
        <p className="text-underline">Resize the container</p>
        <p>↓</p>
      </div>
      <div className="layers">
        <div className="layer layer--center">
          <span className="emoji">{emoji}</span>
        </div>
        <div className="layer">
          <ResizableContainer onFullWidth={setRandomEmoji}>
            <div className="list">
              {totallyNormalFileNames.map((name) => (
                <TextClamp key={name} text={name} />
              ))}
            </div>
          </ResizableContainer>
        </div>
      </div>
      <div className="foot-note">Just some totally normal filenames...</div>
    </main>
  );
}

function randomEmoji() {
  const min = 0x1f600;
  const max = 0x1f64f;
  const codepoint = Math.floor(Math.random() * (max - min + 1)) + min;
  return String.fromCodePoint(codepoint);
}

export default App;
