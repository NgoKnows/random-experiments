import React, { Component } from 'react';
import ExpandingButton from 'components/ExpandingButton/ExpandingButton';
import ExpandingButton2 from 'components/ExpandingButton/ExpandingButton2';


export default class App extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES}>
                <ExpandingButton />
                <ExpandingButton2 />
            </div>
        );
    }
}

const STYLES = {
    height: 2000,
    width: 2000
};
