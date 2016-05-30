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
                <svg width="100" height="100" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.4 29.17">
                    <title>curve</title>
                    <path style={STYLES.a} d="M0.08,28.16c6.89-1,13.45-3.47,18.33-8.5a26.7,26.7,0,0,0,3.85-5.18l22.65-14V28.67Z" transform="translate(0 0)"/>
                    <path style={STYLES.a} d="M44.91,0.5l-22.65,14a27.59,27.59,0,0,1,4.15-5.65C30.3,4.85,36.11,1.67,44.91.5Z" transform="translate(0 0)"/>
                    <path style={STYLES.b} d="M0.08,28.16L22.26,14.48a26.7,26.7,0,0,1-3.85,5.18C13.53,24.69,7,27.15.08,28.16Z" transform="translate(0 0)"/>
                    <path style={STYLES.c} d="M0.08,28.16c6.89-1,13.45-3.47,18.33-8.5a26.7,26.7,0,0,0,3.85-5.18,27.59,27.59,0,0,1,4.15-5.65c3.89-4,9.7-7.16,18.5-8.33" transform="translate(0 0)"/>
                    <line style={STYLES.c} x1="0" y1="28.16" x2="44.9" y2="28.67"/>
                    <line style={STYLES.c} x1="44.9" y1="0" x2="44.9" y2="28.67"/>
                </svg>
                <svg style={STYLES.flip}width="200" height="100" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.4 29.17">
                    <title>curve</title>
                    <path style={STYLES.a} d="M0.08,28.16c6.89-1,13.45-3.47,18.33-8.5a26.7,26.7,0,0,0,3.85-5.18l22.65-14V28.67Z" transform="translate(0 0)"/>
                    <path style={STYLES.a} d="M44.91,0.5l-22.65,14a27.59,27.59,0,0,1,4.15-5.65C30.3,4.85,36.11,1.67,44.91.5Z" transform="translate(0 0)"/>
                    <path style={STYLES.b} d="M0.08,28.16L22.26,14.48a26.7,26.7,0,0,1-3.85,5.18C13.53,24.69,7,27.15.08,28.16Z" transform="translate(0 0)"/>
                    <path style={STYLES.c} d="M0.08,28.16c6.89-1,13.45-3.47,18.33-8.5a26.7,26.7,0,0,0,3.85-5.18,27.59,27.59,0,0,1,4.15-5.65c3.89-4,9.7-7.16,18.5-8.33" transform="translate(0 0)"/>
                    <line style={STYLES.c} x1="0" y1="28.16" x2="44.9" y2="28.67"/>
                    <line style={STYLES.c} x1="44.9" y1="0" x2="44.9" y2="28.67"/>
                </svg>
            </div>
        );
    }
}

const STYLES = {
    container: {
        // display: 'inline-flex',
        width: 200,
        position: 'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
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
        transform: 'scaleX(-1)'
    }
};
