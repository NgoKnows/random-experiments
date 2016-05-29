import React, { Component } from 'react';
import Radium from 'radium';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import FontAwesome from 'react-fontawesome';
import { range } from 'lodash';

//Constants
// Value of 1 degree in radians
const DEG_TO_RAD = 0.0174533;
// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 60;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 5;
// Hard coded position values of the mainButton
const M_X = 590;
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
const toRadians = (degrees) => degrees * DEG_TO_RAD;

function deltaPositions(index, percent) {
    const angle = BASE_ANGLE + (index * SEPARATION_ANGLE);

    return {
        deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) * percent,
        deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) * percent
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

    constructor(props) {
        super(props);

        this.openMenu = this.openMenu.bind(this);
    }

    childButtonStyle(idx, percent) {
        const { deltaX, deltaY } = deltaPositions(idx, percent);

        if (this.state.isOpen) {
            return {
                transform: `translate(${deltaX}px, -${deltaY}px)`
            };
        }

        return {
            transform: `translate(${0}px, ${0}px)`
        };
    }

    openMenu() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isOpen, buttons } = this.state;
        const goalPercent = isOpen ? 1.0 : 0.0;

        const springParams = { stiffness: 210, damping: 20 };
        const defaultStyles = buttons.map(() => ({ percent: 0.0 }));

        const nextStyles = (previousStyles) => {
            return previousStyles.map((prev, i) => {
                if (i === 0) {
                    return { percent: spring(goalPercent, springParams) };
                } else {
                    const lastButtonPreviousPercent = previousStyles[i - 1].percent;
                    const thisButtonPreviousPercent = previousStyles[i].percent;
                    const shouldThisAnimate = isOpen ?
                        lastButtonPreviousPercent > 0.2 :
                        lastButtonPreviousPercent < 0.8;

                    return { percent: shouldThisAnimate ? spring(goalPercent, springParams) : thisButtonPreviousPercent };
                }
            })
        }

        return (
            <div>
                <StaggeredMotion defaultStyles={defaultStyles} styles={nextStyles}>
                    {(interpolatedStyles) => {
                        const leaderPercent = interpolatedStyles[0].percent;

                        return (
                            <div>
                                {interpolatedStyles.map(({ percent }, idx) => {
                                    const style = this.childButtonStyle(idx, percent);

                                    return (
                                        <div key={idx} style={[STYLES.menuButton, style]}>
                                            <FontAwesome name={buttons[idx].icon} style={STYLES.icon} size="2x" />
                                        </div>
                                    )
                                })}
                                <div style={STYLES.button} onClick={this.openMenu}>
                                    <FontAwesome name="times" style={STYLES.icon} size='3x'/>
                                </div>
                            </div>
                        );
                    }}
                </StaggeredMotion>
            </div>
        );
    }

    // renderMenuButtons() {
    //     const { isOpen, buttons } = this.state;
    //
    //     const menuButtonStyles = buttons.map((button, index) => getMenuButtonPosition(index));
    //
    //     return (
    //         <StaggeredMotion
    //             defaultStyles={menuButtonStyles}
    //         >
    //         buttons.map((button, index) => (
    //                 {({ deltaX, deltaY }) => (
    //                     <div key="index"
    //                         style={[
    //                             STYLES.menuButton,
    //                             { transform: `translate(${deltaX}px, -${deltaY}px)` }
    //                         ]}
    //                     >
    //                         <FontAwesome name={button.icon} style={STYLES.icon} size="2x" />
    //                     </div>
    //                 )}
    //         )
    //     ));
    // }
}

const STYLES = {
    button: {
        // layout
        position: 'absolute',
        top: M_Y - (MAIN_BUTTON_DIAM / 2),
        left: M_X - (MAIN_BUTTON_DIAM / 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        // presentational
        backgroundColor: '#1976D2',
        width: MAIN_BUTTON_DIAM,
        height: MAIN_BUTTON_DIAM,
        borderRadius: '50%',
        zIndex: 1,
        cursor: 'pointer'
    },

    menuButton: {
        // layout
        position: 'absolute',
        top: M_Y - (CHILD_BUTTON_DIAM / 2),
        left: M_X - (CHILD_BUTTON_DIAM / 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',

        // presentational
        width: CHILD_BUTTON_DIAM,
        height: CHILD_BUTTON_DIAM,
        backgroundColor: '#64B5F6',
        borderRadius: '50%',
        cursor: 'pointer'
    },

    icon: {
        color: 'white',
        zIndex: 2
    }
}
