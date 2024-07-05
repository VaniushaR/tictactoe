import React from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Footer } from "./components/Footer";

function App() {
	return (
		<div className="container">
			<h1>Tic Tac Toe</h1>
			<Board />
			<Footer />
		</div>
	);
}

export default App;
