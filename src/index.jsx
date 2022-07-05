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
        const squareClassName = this.state.highlight ? 'squareHighlighted' : ''

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
        console.log(`Row ${this.props.value}`);

        let squares = []
        for (let x = 0; x < this.props.squares; x++) {
            squares.push(<Square
                key={x.toString()}
                x={x}
                y={this.props.y}
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
    constructor(props) {
        super(props);

        //
        console.log('Board init')
    }

    render() {
        // Rows
        let rows = []
        for (let y = 0; y < this.props.rowCount; y++) {
            rows.push(<Row
                key={y.toString()}
                y={y}
                squares={this.props.squareCount}
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
        this.state = {
            gameState: 1,
            board: [],
        }
    }

    placePlane() { 
        console.log('Placing aeroplane')
    }

    hoverPlane(x, y) { 
        console.log(`enter = (${x}, ${y})`)
    }

    removeHoverPlane(x, y) { 
        console.log(`exit = (${x}, ${y})`)
    }

    render() {
        let status
        let clickAction
        let enterSquare, leaveSquare
        if (this.state.gameState === 1) {
            status = `Place aeroplanes`
            clickAction = this.placePlane
            enterSquare = this.hoverPlane
            leaveSquare = this.removeHoverPlane
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        rowCount={10}
                        squareCount={10}
                        clickAction={clickAction}
                        enterSquare={enterSquare}
                        leaveSquare={leaveSquare}
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
root.render(<Game />);
