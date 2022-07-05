import React from 'react';

class Aeroplane extends React.Component { 
    constructor(props) {
        super(props);

        // 0 - miss
        // 1 - hit
        // 2 - dead
        this.setState({
            design: [
                0, 0, 2, 0, 0,
                1, 1, 1, 1, 1,
                0, 0, 1, 0, 0,
                0, 1, 1, 1, 0,
            ]
        })
    }
}

