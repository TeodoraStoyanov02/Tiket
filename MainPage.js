import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { players } from './data';
import './MainPage.css';

function MainPage({ tickets, setTickets }) {
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedTeam, setExpandedTeam] = useState(null);

    const addToTicket = (player) => {
        setSelectedPlayers(prevPlayers => [...prevPlayers, player]);
    };

    const removeFromTicket = (playerId) => {
        setSelectedPlayers(prevPlayers => prevPlayers.filter(p => p.id !== playerId));
    };

    const saveTicket = () => {
        const ticketWithDetails = {
            name: `Tiket ${tickets.length + 1}`,
            players: selectedPlayers
        };
        setTickets(prevTickets => [...prevTickets, ticketWithDetails]);
        setSelectedPlayers([]);
    };

    const toggleTeam = (teamName) => {
        if (expandedTeam === teamName) {
            setExpandedTeam(null);
        } else {
            setExpandedTeam(teamName);
        }
    };

    const filteredTeamsAndPlayers = Object.keys(players)
        .filter(team => 
            team.toLowerCase().includes(searchTerm.toLowerCase()) || 
            players[team].some(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    return (
        <div>
            <input type="text" placeholder="Pretraži timove i igrače..." onChange={e => setSearchTerm(e.target.value)} />
            {filteredTeamsAndPlayers.map(teamName => (
                <div key={teamName}>
                    <h3 onClick={() => toggleTeam(teamName)}>{teamName}</h3>

                    {expandedTeam === teamName && players[teamName].map(player => {
                        if(player.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm) {
                            return (
                                <div key={player.id}>
                                    {player.name}
                                    <button onClick={() => addToTicket(player)}>Dodaj u tiket</button>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            ))}

            <h3>Izabrani igrači:</h3>
            <ul>
                {selectedPlayers.map(player => (
                    <li key={player.id}>{player.name}
                    <button onClick={() => removeFromTicket(player.id)}>Ukloni</button>
                    </li>
                ))}
            </ul>

            <button onClick={saveTicket}>Sačuvaj tiket</button>

            <h3>Tvoji tiketi:</h3>
            {tickets.map((ticket, index) => (
                <Link key={index} to={`/ticket/${index}`}>Vidi tiket {index + 1}</Link>
            ))}
        </div>
    );
}

export default MainPage;
