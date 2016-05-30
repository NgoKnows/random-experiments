import React, { Component } from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';

import Curve from './Test';

@Radium
export default class TabBar extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.tabBar} />
                <div style={STYLES.curve} />
                <div style={STYLES.primaryButton}>
                    <FontAwesome name="times" style={STYLES.icon} size="3x" />
                </div>
                <Curve />
            </div>
        );
    }
}

const STYLES = {
    container: {
        position: 'absolute',
        top: 100,
        left: 0,
        display: 'flex',
        alignItems: 'flex-end',
        height: 150,
        width: '100%',
    },

    tabBar: {
        width: '100%',
        height: 80,
        backgroundColor: '#455A64'
    },

    curve: {
        fill: 'black'
    },



    primaryButton: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 100,
        width: 100,
        borderRadius: '50%',
        backgroundColor: '#388E3C',
        zIndex: 9
    },

    icon: {
        color: 'white'
    }
};
