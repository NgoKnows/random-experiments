import React, { Component } from 'react';
import Radium from 'radium';
import { Motion, spring } from 'react-motion';
import FontAwesome from 'react-fontawesome';

//Constants
// Value of 1 degree in radians
const DEG_TO_RAD = 0.0174533;
// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 50;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 5;
// Hard coded position values of the mainButton
const M_X = 490;
const M_Y = 450;

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 120;
const SEPARATION_ANGLE = 40; // degrees
const FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE; // degrees
const BASE_ANGLE = ((180 - FAN_ANGLE) / 2); // degrees

const BUTTONS_OUT_SPRING = { stiffness: 400, damping: 8 };
const BUTTONS_IN_SPRING = { stiffness: 400, damping: 20 };
// Utility functions

// Since JS Math. functions accept value of angle in radians and we've been working in degrees we will need to convert
// degrees to radians first.
function toRadians(degrees) {
    return degrees * DEG_TO_RAD;
}

function finalDeltaPositions(index) {
    const angle = BASE_ANGLE + (index * SEPARATION_ANGLE);
    return {
        deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM / 2),
        deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM / 2)
    };
}

@Radium
export default class ExpandingButton extends Component {
    static defaultProps = {};
    props : {};

    state = {
        isOpen: false,
        buttons: [
            { handleClick: () => {}, icon: 'comment-o' },
            { handleClick: () => {}, icon: 'comment-o' },
            { handleClick: () => {}, icon: 'comment-o' },
            { handleClick: () => {}, icon: 'comment-o' },
            { handleClick: () => {}, icon: 'comment-o' },
        ]
    };

    state : { isOpen: boolean };

    initialChildButtonStyles() {
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: M_Y - (CHILD_BUTTON_DIAM / 2),
            left: M_X - (CHILD_BUTTON_DIAM / 2)
        };
    }

    getButtonPosition(childIndex) {
        const { deltaX, deltaY } = finalDeltaPositions(childIndex);

        if (this.state.isOpen) {
            return {
                left: spring(M_X + deltaX, BUTTONS_OUT_SPRING),
                top: spring(M_Y - deltaY, BUTTONS_OUT_SPRING)
            };
        }

        return {
            left: spring(M_X - (CHILD_BUTTON_DIAM / 2), BUTTONS_IN_SPRING),
            top: spring(M_Y - (CHILD_BUTTON_DIAM / 2), BUTTONS_IN_SPRING),
        };
    }

    openMenu() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isOpen, buttons } = this.state;

        return (
            <div>
                <div style={STYLES.button} onClick={() => this.openMenu()} />
                {this.renderMenuButtons()}
            </div>
        );
    }

    renderMenuButtons() {
        const { isOpen, buttons } = this.state;

        return (
            buttons.map((button, index) => (
                <Motion key={index} style={this.getButtonPosition(index)}>
                    {({ top, left }) => (
                        <div style={[STYLES.miniButton, { top, left }]}>
                            <FontAwesome name={button.icon} style={STYLES.icon} />
                        </div>
                    )}
                </Motion>
            )
        ));
    }
}

const STYLES = {
    button: {
        position: 'absolute',
        top: M_Y - (MAIN_BUTTON_DIAM / 2),
        left: M_X - (MAIN_BUTTON_DIAM / 2),
        width: MAIN_BUTTON_DIAM,
        height: MAIN_BUTTON_DIAM,
        backgroundColor: '#1976D2',
        borderRadius: '50%',
        zIndex: 1,
        cursor: 'pointer'
    },

    miniButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: CHILD_BUTTON_DIAM,
        height: CHILD_BUTTON_DIAM,
        backgroundColor: '#64B5F6',
        borderRadius: '50%',
        cursor: 'pointer'
    },

    icon: {
        color: 'white'
    }
}
