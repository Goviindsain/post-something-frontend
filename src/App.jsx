// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import './App.css';

const App = () => {
	return (
		<Router>
			<div className="app">
				<header className="app-header">
					<nav className="app-navbar">
						<ul className="navbar-list">
							<li className="navbar-item">
								<NavLink 
									to="/" 
									className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
								>
									Home
								</NavLink>
							</li>
							<li className="navbar-item">
								<NavLink 
									to="/create" 
									className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
								>
									Create Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<main className="app-main">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create" element={<CreatePost />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
