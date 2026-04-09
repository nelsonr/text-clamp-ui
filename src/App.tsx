import { ResizableContainer, TextClamp } from "./components";
import "./App.css";

const totallyNormalFileNames = [
  "Hot Buzz (2017) [720p] [4K] [MegaRay] [5.1] [STY.XM].avi",
  "Working Day (2010) [2160p] [HD] [SupaRay] [5.1] [SYT.XM].wmv",
  "Outfit Me (2002) [1080p] [NoRay] [5.1] [TYS.XH].mov",
];

function App() {
  return (
    <main>
      <div className="note">
        <p className="text-underline">Resize the container</p>
        <p>↓</p>
      </div>
      <div className="layers">
        <div className="layer layer--center">
          <span className="emoji">😲</span>
        </div>
        <div className="layer">
          <ResizableContainer>
            <div className="list">
              {totallyNormalFileNames.map((name) => (
                <div key={name}>
                  <TextClamp text={name} />
                </div>
              ))}
            </div>
          </ResizableContainer>
        </div>
      </div>
      <div className="foot-note">Just some totally normal filenames...</div>
    </main>
  );
}

export default App;
