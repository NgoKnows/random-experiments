import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Curve extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <img style={STYLES.blah} src={require('./test.svg')}/>
                <img style={[STYLES.blah, STYLES.flip]} src={require('./test.svg')}/>
            </div>
        );
    }
}

const STYLES = {
    container: {
        // display: 'inline-flex',
        width: 200,
        position: 'absolute',
        bottom: 72,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    blah: {
        width: 100,
        transform: 'translateX(-22px) scale(1.5, 1)'
    },

    a: {
        fill: '#455A64',
        stroke: '#455A64',
    },

    b: {
        fill: '#fff'
    },

    c: {
        fill: 'none',
        stroke: '#455A64',
        strokeMiterlimit: '10'
    },

    flip: {
        transform: 'scaleX(-1) translateX(-22px) scale(1.5, 1)'
    }
};
