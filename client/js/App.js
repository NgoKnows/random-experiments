import React, { Component } from 'react';
import CircularExpandingButton from 'components/ExpandingButton/CircularExpandingButton';
import VerticalExpandingButton from 'components/ExpandingButton/VerticalExpandingButton';
export default class App extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES}>
                <CircularExpandingButton />
                <VerticalExpandingButton direction="up" />
                <VerticalExpandingButton direction="down" />
                <VerticalExpandingButton direction="left" />
                <VerticalExpandingButton direction="right" />
            </div>
        );
    }
}

const STYLES = {
    height: 1000,
    width: 1500,
    fontFamily: 'Lato',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
};
