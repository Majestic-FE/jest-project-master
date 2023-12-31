import React from "react";
import axios from "axios";

const MockApi = () => {
  const [clicked, setClicked] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");

  const fetchUser = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        const { username } = res.data;
        setUsername(username);
        setClicked(true);
      })
      .catch(() => {
        setError("Fetching Failed !");
      });
  };

  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {clicked ? "Loaded" : "Start Fetch"}
      </button>
      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};

export default MockApi;
