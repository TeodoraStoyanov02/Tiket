import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { players } from './data';
import MainPage from './MainPage';
import TicketPage from './TicketPage';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);

    return (
        <Router>
            <nav>
            <Link to="/" className="link-button">Početna</Link>
            </nav>
            <Routes>
                <Route path="/" element={<MainPage tickets={tickets} setTickets={setTickets} />} />
                <Route path="/ticket/:id" element={<TicketPage tickets={tickets} setTickets={setTickets} />} />
            </Routes>
        </Router>
    );
}

export default App;
