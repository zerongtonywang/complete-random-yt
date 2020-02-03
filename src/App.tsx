import React, { useState, useEffect } from "react";

const CORS_BYPASS = "http://localhost:8080/";
// const CORS_BYPASS = "https://c24641b5.ngrok.io/";
const YT_BASE_URL = "https://www.youtube.com/watch?v=";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL_CHARS = "-_";

const CHARS = LETTERS + LETTERS.toUpperCase() + NUMBERS + SPECIAL_CHARS;

async function verify(id: string) {
  const imgLink =
    CORS_BYPASS + "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
  return fetch(imgLink, {
    headers: {}
  })
    .then(r => {
      // console.log(r);
      return r.status === 200;
    })
    .catch(() => {
      return false;
    });
}

function genChar(source = CHARS) {
  const char = source[Math.floor(Math.random() * source.length)];
  return char;
}

function genId() {
  return Array(11)
    .fill(null)
    .map(() => genChar())
    .join("");
  // return "dQw" + genChar(NUMBERS) + "w" + genChar(NUMBERS) + "WgXcQ";
}

function makeYTLink(id: string) {
  return YT_BASE_URL + id;
}

const App = () => {
  const [link, setLink] = useState("");
  const [verifiedLinks, setVerifiedLinks] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const [inProgress, setInProgress] = useState(false);

  const latestVerifiedLink = verifiedLinks[0];

  useEffect(() => {
    genLink();
  }, []);

  useEffect(() => {
    if (inProgress) {
      genLink();
    }
  }, [counter]);

  function genLink() {
    setInProgress(true);
    const id = genId();
    const newLink = makeYTLink(id);
    setLink(newLink);
    verify(id).then(verified => {
      if (verified) {
        setVerifiedLinks([...verifiedLinks, newLink]);
        setInProgress(false);
      } else {
        setCounter(counter + 1);
      }
    });
  }

  const handleClick = () => {
    genLink();
  };

  return (
    <div className="App">
      <h1>Complete Random Video</h1>
      <div
        style={{
          marginBottom: 20
        }}
      >
        <button
          style={{
            backgroundColor: inProgress ? "grey" : "red",
            color: "white"
          }}
          onClick={handleClick}
          disabled={inProgress}
        >
          generat{inProgress ? "ing ..." : "e"}
        </button>
      </div>

      <p>attempts: {counter}</p>
      {inProgress ? (
        <p>{link}</p>
      ) : latestVerifiedLink && (
        <a target="_blank" rel="noopener noreferrer" href={latestVerifiedLink}>
          {latestVerifiedLink}
        </a>
      )}
    </div>
  );
};

export default App;
