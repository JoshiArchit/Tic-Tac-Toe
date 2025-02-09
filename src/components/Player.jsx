import { useState, React } from "react";

const Player = ({ name, symbol, isActive }) => {
  const [editing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEdit() {
    setEditing((editing) => !editing);
  }

  function handleNameChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editing ? (
          <input type="text" value={playerName} required onChange={handleNameChange} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
