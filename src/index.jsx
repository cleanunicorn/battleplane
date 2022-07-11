import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import cloneDeep from 'lodash/cloneDeep';

import Aeroplane from './Aeroplane';

const COLOR = {
    EMPTY: '#eeeeee',
    PLANE: '#123412',
};

const PLANESQUARE = {
    BODY: 'BODY',
    HEAD: 'HEAD',
}

class Square extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            highlight: false,
        };
    }

    render() {
        const x = this.props.x
        const y = this.props.y

        const style = {
            backgroundColor: this.props.color,
        };

        return (
            <button
                className={`square`}
                style={style}
                onClick={() => this.props.clickAction(x, y)}
                onMouseEnter={() => this.props.enterSquare(x, y)}
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
                color={this.props.squares[squareIndex].color}
                clickAction={this.props.clickAction}
                enterSquare={this.props.enterSquare}
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
                    color: COLOR.EMPTY,
                    planeId: null,
                    squareType: null,
                })
            }
            board.push(row);
        }

        this.state = {
            gameState: 1,
            player: {
                board,
                planeHover: {
                    x: null,
                    y: null,
                }
            }
        }
    }

    placePlane(x, y) { 
        console.log('Placing aeroplane at ' + this.state.player.planeHover.x + ', ' + this.state.player.planeHover.y);

        const state = cloneDeep(this.state);
        const planeDesign = new Aeroplane().design();
        const playerBoard = cloneDeep(state.player.board);

        for (let pi = 0; pi < planeDesign.length; pi++) {
            for (let pj = 0; pj < planeDesign[pi].length; pj++) {
                if (planeDesign[pi][pj] === 1) {
                    playerBoard[pi][pj].planeId = 1;
                    playerBoard[pi][pj].squareType = PLANESQUARE.BODY;
                    playerBoard[x + pi][y + pj].color = COLOR.PLANE;
                }
                if (planeDesign[pi][pj] === 2) {
                    playerBoard[pi][pj].planeId = 1;
                    playerBoard[pi][pj].squareType = PLANESQUARE.HEAD;
                    playerBoard[x + pi][y + pj].color = COLOR.PLANE;
                }
            }
        }

        this.setState({
            ...state,
            player: {
                ...state.player,
                board: playerBoard,
                planeHover: {x: null, y: null},
            },
        })
    }

    hoverPlane(x, y) { 
        const state = cloneDeep(this.state);
        const planeDesign = new Aeroplane().design();
        const playerBoard = cloneDeep(state.player.board);
        let newPlanePosition = {x: null, y: null}

        // Clear the previous plane
        if (state.player.planeHover.x !== null) { 
            for (let pi = 0; pi < planeDesign.length; pi++) {
                for (let pj = 0; pj < planeDesign[pi].length; pj++) {
                    // Set the square to the color of the plane
                    if (planeDesign[pi][pj] !== 0) {
                        playerBoard[state.player.planeHover.x + pi][state.player.planeHover.y + pj].color = COLOR.EMPTY;
                    }
                }
            }
        }

        // Draw plane at new location
        if (
            planeDesign.length + x <= playerBoard.length &&            planeDesign[0].length + y <= playerBoard[0].length
        ) {
            for (let pi = 0; pi < planeDesign.length; pi++) {
                for (let pj = 0; pj < planeDesign[pi].length; pj++) {
                    // Set the square to the color of the plane
                    if (planeDesign[pi][pj] !== 0) {
                        // If a plane already exists at this location, don't place it
                        if (
                            playerBoard[state.player.planeHover.x + pi][state.player.planeHover.y + pj].planeId !== null
                        ) { 
                            return
                        }

                        // Set the square to the color of the plane
                        playerBoard[x + pi][y + pj].color = COLOR.PLANE;
                    } 
                }
            }

            newPlanePosition = {x, y}
        }

        this.setState({
            ...state,
            player: {
                ...state.player,
                board: playerBoard,
                planeHover: newPlanePosition,
            }
        });
    }

    render() {
        let status
        let clickAction
        let enterSquare
        if (this.state.gameState === 1) {
            status = `Place aeroplanes`
            clickAction = (x, y) => this.placePlane(x, y)
            enterSquare = (x, y) => this.hoverPlane(x, y)
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        clickAction={clickAction}
                        enterSquare={enterSquare}
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
