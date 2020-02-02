import React, { useState, useEffect } from "react";

const CORS_BYPASS = "http://localhost:8080/";
const YT_BASE_URL = "https://www.youtube.com/watch?v=";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL_CHARS = "-_";

const CHARS = LETTERS + LETTERS.toUpperCase() + NUMBERS + SPECIAL_CHARS;

async function verify(id: string) {
  const imgLink = CORS_BYPASS + "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
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

async function createLink() {
  // rick roll - dQw4w9WgXcQ
  let id = genId();
  let newVerified = await verify(id);
  console.log(makeYTLink(id));
  while (!newVerified) {
    id = genId();
    newVerified = await verify(id);
  }
  return makeYTLink(id);
}

const App = () => {
  const [link, setLink] = useState("");

  useEffect(() => {
    genLink();
  }, []);

  async function genLink() {
    const link = await createLink();
    setLink(link);
  }

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
            backgroundColor: !link ? "grey" : "red",
            color: "white"
          }}
          onClick={genLink}
          disabled={!link}
        >
          generat{link ? 'e' : 'ing...'}
        </button>
      </div>
      <a target="_blank" rel="noopener noreferrer" href={link}>
        {link}
      </a>
    </div>
  );
};

export default App;
