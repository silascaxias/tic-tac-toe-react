import { useState } from 'react';

const Player = ({ initialName, symbol, isActive, onPlayerNameChanged }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  let playerName = <span className='player-name'>{name}</span>;
  let playerNameInput = (
    <input
      type='text'
      onChange={(event) => setName(event.target.value)}
      value={name}
      required
    />
  );
  let buttonTitle = isEditing ? 'Save' : 'Edit';

  const onEdit = () => {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onPlayerNameChanged(symbol, playerName);
    }
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {isEditing ? playerNameInput : playerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={onEdit}>{buttonTitle}</button>
    </li>
  );
};

export default Player;
