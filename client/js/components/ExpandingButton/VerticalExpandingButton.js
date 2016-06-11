import React, { Component } from 'react';
import Radium from 'radium';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import FontAwesome from 'react-fontawesome';
import { range } from 'lodash';

// Constants
// ----------------------------

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 60;

// Hard coded position values of the mainButton
const M_X = 590;
const M_Y = 450;

const SPRING_CONFIG = { stiffness: 500, damping: 18 };
const OFFSET = 0.4;

@Radium
export default class VerticalExpandingButton extends Component {
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

    finalChildDeltaPositions(index) {
        const { direction } = this.props;

        let delta = index * (CHILD_BUTTON_DIAM + 10) + MAIN_BUTTON_DIAM;

        if (direction === 'up' || direction === 'left') {
            delta *= -1;
        }

        if (direction === 'up' || direction === 'down') {
            return {
                deltaX: 0,
                deltaY: delta
            };
        }

        return {
            deltaX: delta,
            deltaY: 0
        };
    }

    initialChildButtonStyles() {
        return {
            translateX: 0,
            translateY: 0,
            rotate: -180,
            scale: 0.5
        };
    }

    finalChildButtonStyles(childIndex) {
        const { deltaX, deltaY } = this.finalChildDeltaPositions(childIndex);

        return {
            translateX: deltaX,
            translateY: deltaY,
            rotate: 0,
            scale: 1
        };
    }

    initialChildButtonStylesAnimate(childIndex) {
        const b = { stiffness: 350 + childIndex * 75, damping: 24 };

        return {
            translateX: spring(0, b),
            translateY: spring(0, b),
            rotate: spring(-180, b),
            scale: spring(0.5, b)
        };
    }

    finalChildButtonStylesAnimate(childIndex) {
        const { deltaX, deltaY } = this.finalChildDeltaPositions(childIndex);

        return {
            translateX: spring(deltaX, { stiffness: 500, damping: 18 }),
            translateY: spring(deltaY, { stiffness: 500, damping: 18 }),
            rotate: spring(0, { stiffness: 500, damping: 18 }),
            scale: spring(1, { stiffness: 500, damping: 18 })
        };
    }

    openMenu(e) {
        e.stopPropagation();

        this.setState({ isOpen: !this.state.isOpen });
    }

    renderChildButtons() {
        const { isOpen, buttons } = this.state;
        const defaultButtonStyles = range(buttons.length).map((i) => {
            return isOpen ?
                this.finalChildButtonStyles(i) :
                this.initialChildButtonStyles();
        });

        const targetButtonStyles = range(buttons.length).map((i) => {
            return isOpen ?
                this.finalChildButtonStylesAnimate(i) :
                this.initialChildButtonStylesAnimate(i);
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

                return shouldApplyTargetStyle() ?
                    targetButtonStyles[i] :
                    buttonStyleInPreviousFrame;
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
                        {interpolatedStyles.map(({ translateX, translateY, rotate, scale }, index) => (
                            <div
                                key={index}
                                style={[STYLES.childButton, { transform:
                                    `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})` }]}
                            >
                                <FontAwesome
                                    name={buttons[index].icon}
                                    style={STYLES.icon}
                                    size="2x"
                                />
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
            <div style={STYLES.container}>
                {this.renderChildButtons()}
                <Motion style={mainButtonRotation}>
                    {({ rotate }) =>
                        <div
                            key="mainButton"
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
    container: {
        position: 'relative'
    },

    button: {
        // layout
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
        top: CHILD_BUTTON_DIAM / 4,
        left: CHILD_BUTTON_DIAM / 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        // presentational
        width: CHILD_BUTTON_DIAM,
        height: CHILD_BUTTON_DIAM,
        backgroundColor: '#64B5F6',
        borderRadius: '50%',
        cursor: 'pointer',
        willChange: 'transform'
    },

    icon: {
        color: 'white',
        zIndex: 2
    }
};
