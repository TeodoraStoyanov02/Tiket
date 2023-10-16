// src/TicketPage.js

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './TicketPage.css';

function TicketPage({ tickets, setTickets, ticketIndex, removePlayer }) {
    const { id } = useParams();
    const ticket = tickets[id];
    const [points, setPoints] = useState({});

    const updatePoints = (playerId, value) => {
        setPoints(prev => ({ ...prev, [playerId]: (prev[playerId] || 0) + value }));
    };

    const deleteTicket = () => {
        const newTickets = [...tickets];
        newTickets.splice(id, 1);
        setTickets(newTickets);
    };

    const handleMatchEnd = () => {
        const missingPoints = ticket.players // Adjust this line
            .filter(player => (points[player.id] || 0) < player.target)
            .map(player => ({
                name: player.name,
                missing: player.target - (points[player.id] || 0)
            }));
        
        if (missingPoints.length) {
            alert(`Fale mu:\n${missingPoints.map(p => `${p.name}: ${p.missing}`).join('\n')}`);
        } else {
            alert("PROŠO TIKET!");
        }
    };

    const removeFromTicket = (playerId) => {
        const updatedPlayers = ticket.players.filter(p => p.id !== playerId);
        setTickets(prevTickets => {
            const updatedTickets = [...prevTickets];
            updatedTickets[id] = { ...ticket, players: updatedPlayers };
            return updatedTickets;
        });
    };

    if (!ticket) return <div>Ticket not found.</div>;

    return (
        <div>
            <h2>Tiket {+id + 1}</h2>
            <ul>
                {ticket.players.map(player => {
                    const currentPoints = points[player.id] || 0;
                    return (
                        <li key={player.id}>
                            {player.name}
                            <button onClick={() => removeFromTicket(player.id)}>Obriši</button>
                            <div>
                                Granica: <input type="number" defaultValue={player.target || 0} onChange={e => player.target = +e.target.value} />
                            </div>
                            <div>
                                Points: {currentPoints}
                                <button onClick={() => updatePoints(player.id, 1)}>+1</button>
                                <button onClick={() => updatePoints(player.id, 2)}>+2</button>
                                <button onClick={() => updatePoints(player.id, 3)}>+3</button>
                            </div>
                            <div style={{ backgroundColor: currentPoints >= player.target ? 'lightgreen' : 'white' }}>
                                {currentPoints >= player.target ? 'Bravo bravo!' : 'Još nije došo'}
                            </div>
                        </li>
                    );
                })}
            </ul>

            <button onClick={handleMatchEnd}>Kraj meča</button>
            <button onClick={deleteTicket}>Obriši tiket</button>
            <ticket selectedPlayers={ticket} removePlayer={removeFromTicket} />
        </div>
    );
}

export default TicketPage;