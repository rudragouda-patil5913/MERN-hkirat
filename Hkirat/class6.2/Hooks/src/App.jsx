import { useState } from "react";

function Header({ title }) {
  return <h1>{title}</h1>;
}

function App() {
  const [title, setTitle] = useState("rudraheera");

  function changeTitle() {
    setTitle(Math.random());
  }
  return (
    <>
      <div>
        <button onClick={() => changeTitle()}>change</button>
        <Header title={title} />
        <Header title="rudra" />
      </div>
    </>
  );
}

export default App;
