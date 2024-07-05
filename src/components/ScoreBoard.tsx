import React, { useEffect, useState } from "react";

type ScoreBoardProps = {
	winner: string | null;
};

const ScoreBoard = ({ winner }: ScoreBoardProps) => {
	//users names
	const [player1, setPlayer1] = useState<string>("Player 1");
	const [player2, setPlayer2] = useState<string>("Player 2");
	const [game, setGame] = useState<boolean>(false);
	const [draw, setDraw] = useState<boolean>(false);
	//users scores
	const [score1, setScore1] = useState<number>(0);
	const [score2, setScore2] = useState<number>(0);

	const resetScores = () => {
		setScore1(0);
		setScore2(0);
		setDraw(false);
	};

	useEffect(() => {
		if (winner) {
			if (winner === "X") {
				setScore1((prev) => prev + 1);
			} else if (winner === "O") {
				setScore2((prev) => prev + 1);
			} else if (winner === "draw") {
				setDraw(true);
			}
		}

		return () => {
			setDraw(false);
		};
	}, [winner]);

	return (
		<div className="score-board">
			<h2>Score Board</h2>
			{winner && winner !== "draw" ? (
				<h3>{winner === "X" ? player1 : player2} is the winner!</h3>
			) : null}
			{draw === true ? <h3>It's a draw!</h3> : null}

			{game ? (
				<div className="players">
					<input
						className="playerInput"
						defaultValue="Player 1"
						onChange={(e) => setPlayer1(e.target.value)}
					/>
					<input
						className="playerInput"
						defaultValue="Player 2"
						onChange={(e) => setPlayer2(e.target.value)}
					/>
				</div>
			) : null}

			<div className="players">
				<span> O : {player1}</span>
				<span> X : {player2}</span>
			</div>
			<div className="score">
				<span>{score1}</span>
				<span>{score2}</span>
			</div>
			<div>
				<button
					className="button reset-scores-button"
					onClick={() => resetScores()}
				>
					Reset Scores
				</button>
			</div>
			<button className="button players-button" onClick={() => setGame(!game)}>
				{!game ? "Update" : "Set"} Players
			</button>
		</div>
	);
};

export { ScoreBoard };
