import { useState } from 'react';

export default function App() {
  return (
    <>
      < Game />
      <Calculator />
    </>
  );
}

// CALCULATOR
function Calculator() {
  return (<Panel />);
}

function Panel({}) {
  const [input, setInput] = useState('');
  function handleClick(i) {
    setInput(input + i.toString());
  }

  function Clear() {
    setInput('');
 }
  function Calculate() {
    const operators = ['+', '-', 'x', '/'];
    const vars = [];
    const ops = [];
    let num = "";
    for (let i = 0; i < input.length; i++) {
      console.log(input[i]);
      let curr = input[i];
      switch (curr) {
        case('+'):
          vars.push(num);
          num = '';
          ops.push(curr);
          break;
        case('-'):
          vars.push(num);
          num = '';
          ops.push(curr);
          break;
        case('x'):
          vars.push(num);
          num = '';
          ops.push(curr);
          break;
        case ('/'):
          vars.push(num);
          num = '';
          ops.push(curr);
          break;
        default:
          num += input[i];
      }
    }
    vars.push(num);

    console.log(vars);
    console.log(ops);

    let output = parseInt(vars[0], 10);
    let k = 0;
    for (let j = 1; j < vars.length; j++) {
      num = parseInt(vars[j], 10);
      switch (ops[k]) {
        case('+'):
          output += num;
          break;
        case('-'):
          output -= num;
          break;
        case('x'):
        output *= num;
          break;
        case ('/'):
          output /= num;
          break;
      };
      k++;
    }

    return setInput(output);
  }


  return (
    <>
      <div class="calc">
        <Display input={input}/>
        <div class="row">
          <Button value={7} onButtonClick={() => handleClick(7)}/>
          <Button value={8} onButtonClick={() => handleClick(8)}/>
          <Button value={9} onButtonClick={() => handleClick(9)}/>
          <Button value={'+'} type={'operator'} onButtonClick={() => handleClick('+')}/>
        </div>
        <div class="row">
          <Button value={4} onButtonClick={() => handleClick(4)}/>
          <Button value={5} onButtonClick={() => handleClick(5)}/>
          <Button value={6} onButtonClick={() => handleClick(6)}/>
          <Button value={'-'} type={'operator'} onButtonClick={() => handleClick('-')}/>
        </div>
        <div class="row">
          <Button value={1} onButtonClick={() => handleClick(1)}/>
          <Button value={2} onButtonClick={() => handleClick(2)}/>
          <Button value={3} onButtonClick={() => handleClick(3)}/>
          <Button value={'x'} type={'operator'} onButtonClick={() => handleClick('x')}/>
        </div>
        <div class="row">
          <Button value={'C'} type={'clear'} onButtonClick={() => Clear()}/>
          <Button value={0} onButtonClick={() => handleClick(0)}/>
          <Button value={'='} type={'operator'} onButtonClick={() => Calculate()}/>
          <Button value={'/'} type={'operator'} onButtonClick={() => handleClick('/')}/>
        </div>
      </div>
    </>
  );
}

function Button({ value, onButtonClick, type}) {
  return (
  <button class={type} onClick={onButtonClick}>
    {value}
  </button>
 );
}

function Display({ input }) {
  return (
    <div class="output">
      <p class="display-box">{input}</p>
    </div>
  );
}


// TIC TAC TOE 
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
