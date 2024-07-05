import React, { useState, useEffect } from "react";
import { ScoreBoard } from "./ScoreBoard";

type SquareProps = {
	index: string | null;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Square = ({ index, onClick }: SquareProps) => {
	return (
		<button className="square" onClick={onClick}>
			{index}
		</button>
	);
};

const Board = () => {
	//board state as 9 squares in initial state as null
	const [squares, setSquares] = useState<(string | null)[]>(
		Array(9).fill(null)
	);
	//state to store the turn of the player
	const [isXNext, setIsXNext] = useState<boolean>(true);
	//winner state
	const [winner, setWinner] = useState<string | null>(null);

	const handleClick = (index: number) => {
		//logic to update the square value
		console.log("click in: ", index, "as: ", isXNext ? "X" : "O");
		setSquares((prevSquares) => {
			const newSquares = prevSquares.slice(); //return a shallow copy of the array to do not mutate the original array
			if (newSquares[index] !== null || winner) return newSquares; //if the array index is not null, return the array, otherwise update the array
			//here we mutate the value for the array index
			newSquares[index] = isXNext ? "X" : "O";

			return newSquares;
		});

		//change turns between X and O
		setIsXNext(!isXNext);
	};

	const resetGame = () => {
		setSquares(Array(9).fill(null));
		setWinner(null);
		setIsXNext(true);
	};

	useEffect(() => {
		//winner combinations
		const winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		//check if there is a winner
		const checkWinner = (squares: (string | null)[]) => {
			//iterate the squares array comparing it with the winningCombos array items to check if there is a winner
			for (let i = 0; i < winningCombos.length; i++) {
				const [a, b, c] = winningCombos[i]; //destructuring the winningCombos array
				//if the squares array has a value and the value is the same in the winningCombos array, return the value
				if (
					squares[a] &&
					squares[a] === squares[b] &&
					squares[a] === squares[c]
				) {
					setWinner(squares[a]);
					//if the squares array has a value and the value is the same in the winningCombos array, return the value
					return squares[a];
				}
			}
		};

		let winner = checkWinner(squares);
		if (winner) {
			setWinner(winner);
		}
		//check if there is a draw
		if (squares.every((square) => square !== null) && !winner) {
			setWinner("draw");
		}

		return () => {
			//cleanup
			setWinner(null);
		};
	}, [squares]);

	return (
		<>
			<div className="board">
				{squares && squares.length === 9
					? squares.map((_, i) => (
							<Square
								key={i}
								index={squares[i]}
								onClick={() => handleClick(i)}
							/>
					  ))
					: null}
			</div>

			<div>
				<button className="button game-button" onClick={() => resetGame()}>
					<span>New Game</span>
				</button>
			</div>
			<ScoreBoard winner={winner} />
		</>
	);
};
export { Board };
