import React from 'react';

function PlayerList({ players, addToTiket }) {
    return (
        <div>
            {Object.keys(players).map(team => (
                <div key={team}>
                    <h2>{team}</h2>
                    <ul>
                        {players[team].map(player => (
                        <li key={player.id}>
                            {player.name}
                            <button onClick={() => addToTiket(player)}>Dodaj na tiket</button>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default PlayerList;
