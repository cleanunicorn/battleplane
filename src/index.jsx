import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            highlight: false,
        };
    }

    render() {
        const squareClassName = this.props.highlight ? 'squareHighlighted' : ''

        const x = this.props.x
        const y = this.props.y

        return (
            <button
                className={`square ${squareClassName}`}
                onClick={() => this.props.clickAction()}
                onMouseEnter={() => this.props.enterSquare(x, y)}
                onMouseLeave={() => this.props.leaveSquare(x, y)}
            >
                {this.props.value}
            </button>
        );
    }
}

class Row extends React.Component { 
    render() { 
        let squares = []
        for (let squareIndex = 0; squareIndex < this.props.squares.length; squareIndex++) {
            squares.push(<Square
                key={squareIndex.toString()}
                x={this.props.squares[squareIndex].x}
                y={this.props.squares[squareIndex].y}
                highlight={this.props.squares[squareIndex].highlight}
                clickAction={this.props.clickAction}
                enterSquare={this.props.enterSquare}
                leaveSquare={this.props.leaveSquare}
            />)
        }

        return (
            <div>
                {squares}
            </div>
        )
    }
}

class Board extends React.Component {
    render() {
        // Rows
        let rows = []
        for (let y = 0; y < this.props.board.length; y++) {
            rows.push(<Row
                key={y.toString()}
                y={y}
                squares={this.props.board[y]}
                squaresCount={this.props.squareCount}
                clickAction={this.props.clickAction} 
                enterSquare={this.props.enterSquare}
                leaveSquare={this.props.leaveSquare}
            />)
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        let board = [];
        for (let ri = 0; ri < props.rowCount; ri++) {
            const row = [];
            for (let si = 0; si < props.squareCount; si++) {
                row.push({
                    x: ri,
                    y: si,
                    highlight: false,
                })
            }
            board.push(row);
        }

        this.state = {
            gameState: 1,
            player: {
                board,
            }
        }
    }

    placePlane() { 
        console.log('Placing aeroplane')
    }

    hoverPlane(x, y) { 
        console.log(`enter = (${x}, ${y})`);
        const state = this.state;
        state.player.board[x][y].highlight = true;
        this.setState(state)
    }

    removeHoverPlane(x, y) { 
        console.log(`exit = (${x}, ${y})`)
        const state = this.state;
        state.player.board[x][y].highlight = false;
        this.setState(state)
    }

    render() {
        let status
        let clickAction
        let enterSquare, leaveSquare
        if (this.state.gameState === 1) {
            status = `Place aeroplanes`
            clickAction = this.placePlane
            enterSquare = (x, y) => this.hoverPlane(x, y)
            leaveSquare = (x, y) => this.removeHoverPlane(x, y)
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        clickAction={clickAction}
                        enterSquare={enterSquare}
                        leaveSquare={leaveSquare}
                        board={this.state.player.board}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game rowCount={10} squareCount={10} />);
