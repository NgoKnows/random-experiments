import React, { Component } from 'react';
import Radium from 'radium';
import { Motion, spring } from 'react-motion';

@Radium
export default class App extends Component {
    static defaultProps = {};
    props: {};
    state = { rotated: false };
    state: { rotated: boolean };

    render() {
        const { rotated } = this.state;

        const mainButtonRotation = this.state.rotated ?
            { rotate: spring(-135, { stiffness : 500, damping : 30 }) } :
            { rotate: spring(0, { stiffness : 500, damping : 30 }) };

        return (
            <div style={STYLES.container}>
                <Motion style={mainButtonRotation}>
                    {({ rotate }) =>
                        <div
                            key="mainButton"
                            style={[STYLES.button, { transform: `rotate(${rotate}deg)` }]}
                            onClick={() => this.setState({ rotated: !rotated })}
                        >
                            <span>X</span>
                        </div>
                    }
                </Motion>
            </div>
        );
    }
}

const STYLES = {
    container: {
        height: 1000,
        width: 1500,
        fontFamily: 'Lato',
        margin: 100
    },

    button: {
        // layout
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        // presentational
        backgroundColor: '#1976D2',
        width: 100,
        height: 100,
        borderRadius: '50%',
        cursor: 'pointer',
        willChange: 'transform',

        ':hover': {
            opacity: 0.5
        }
    }

};
