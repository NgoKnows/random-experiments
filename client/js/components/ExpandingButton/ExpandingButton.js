import React, { Component } from 'react';
import Radium from 'radium';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import FontAwesome from 'react-fontawesome';
import { range } from 'lodash';

// Constants
// ----------------------------
// Value of 1 degree in radians
const DEG_TO_RAD = Math.PI / 180;

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

const SPRING_CONFIG = { stiffness: 500, damping: 18 };
const OFFSET = 0.4;

// Utility functions
// -----------------------------------
const toRadians = (degrees) => degrees * DEG_TO_RAD;

function finalChildDeltaPositions(index) {
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
            { handleClick: () => {}, icon: 'gitlab' },
            { handleClick: () => {}, icon: 'instagram' },
            { handleClick: () => {}, icon: 'snapchat' },
            { handleClick: () => {}, icon: 'reddit' },
            { handleClick: () => {}, icon: 'vine' },
        ]
    };

    state : { isOpen: boolean };

    constructor(props) {
        super(props);

        this.openMenu = this.openMenu.bind(this);
    }

    initialChildButtonStyles() {
        return {
            top: M_Y - (CHILD_BUTTON_DIAM / 2),
            left: M_X - (CHILD_BUTTON_DIAM / 2),
            rotate: -180,
            scale: 0.5
        };
    }

    finalChildButtonStyles(childIndex) {
        const { deltaX, deltaY } = finalChildDeltaPositions(childIndex);

        return {
            top: M_Y - deltaY,
            left: M_X + deltaX,
            rotate: 0,
            scale: 1
        };
    }

    initialChildButtonStylesAnimate() {
        return {
            top: spring(M_Y - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
            left: spring(M_X - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
            rotate: spring(-180, SPRING_CONFIG),
            scale: spring(0.5, SPRING_CONFIG)
        };
    }

    finalChildButtonStylesAnimate(childIndex) {
        const { deltaX, deltaY } = finalChildDeltaPositions(childIndex);

        return {
            top: spring(M_Y - deltaY, SPRING_CONFIG),
            left: spring(M_X + deltaX, SPRING_CONFIG),
            rotate: spring(0, SPRING_CONFIG),
            scale: spring(1, SPRING_CONFIG)
        };
    }

    openMenu(e) {
        e.stopPropagation();

        this.setState({ isOpen: !this.state.isOpen });
    }

    renderChildButtons() {
        const { isOpen, buttons } = this.state;
        const defaultButtonStyles = range(buttons.length).map((i) => {
            return isOpen ? this.finalChildButtonStyles(i) : this.initialChildButtonStyles();
        });

        const targetButtonStyles = range(buttons.length).map((i) => {
            return isOpen ? this.finalChildButtonStylesAnimate(i) : this.initialChildButtonStylesAnimate();
        });

        const scaleMin = this.initialChildButtonStyles().scale;
        const scaleMax = this.finalChildButtonStyles(0).scale;

        const calculateStylesForNextFrame = (prevFrameStyles) => {
            const b = isOpen ? prevFrameStyles : prevFrameStyles.slice(0).reverse();

            const nextFrameTargetStyles = b.map((buttonStyleInPreviousFrame, i) => {
                if (i === 0) {
                    return targetButtonStyles[i];
                }

                const prevButtonScale = b[i - 1].scale;
                const shouldApplyTargetStyle = () => {
                    if (isOpen) {
                        return prevButtonScale >= scaleMin + OFFSET;
                    } else {
                        return prevButtonScale <= scaleMax - OFFSET;
                    }
                };

                return shouldApplyTargetStyle() ? targetButtonStyles[i] : buttonStyleInPreviousFrame;
            });

            return isOpen ? nextFrameTargetStyles : nextFrameTargetStyles.reverse();
        };

        return (
            <StaggeredMotion
                defaultStyles={defaultButtonStyles}
                styles={calculateStylesForNextFrame}
            >
                {interpolatedStyles =>
                    <div>
                        {interpolatedStyles.map(({ left, top, rotate, scale }, index) => (
                            <div
                                key={index}
                                style={[STYLES.childButton, { left, top, transform: `rotate(${rotate}deg) scale(${scale})` }]}
                            >
                                <FontAwesome name={buttons[index].icon} style={STYLES.icon} size="2x" />
                            </div>
                        ))}
                    </div>
                }
            </StaggeredMotion>
        );
    }

    render() {
        const { isOpen } = this.state;
        const mainButtonRotation = isOpen ?
            { rotate: spring(0, { stiffness : 500, damping : 30 }) } :
            { rotate: spring(-135, { stiffness : 500, damping : 30 }) };

        return (
            <div>
                {this.renderChildButtons()}
                <Motion style={mainButtonRotation}>
                    {({ rotate }) =>
                        <div
                            key="mainButton1"
                            style={[STYLES.button, { transform: `rotate(${rotate}deg)` }]}
                            onClick={this.openMenu}
                        >
                            <FontAwesome name="times" style={STYLES.icon} size="3x" />
                        </div>
                    }
                </Motion>
            </div>
        );
    }
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
        zIndex: 2,
        cursor: 'pointer',
        willChange: 'transform'

    },

    childButton: {
        // layout
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'top, left',

        // presentational
        width: CHILD_BUTTON_DIAM,
        height: CHILD_BUTTON_DIAM,
        backgroundColor: '#64B5F6',
        borderRadius: '50%',
        cursor: 'pointer',

    },

    icon: {
        color: 'white',
        zIndex: 2
    }
};
