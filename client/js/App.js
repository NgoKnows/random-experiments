import React, { Component } from 'react';
import ExpandingButton from 'components/ExpandingButton/ExpandingButton';
import ExpandingButton2 from 'components/ExpandingButton/ExpandingButton2';
import TabBar from 'components/TabBar/TabBar';


export default class App extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES}>
                <ExpandingButton />
                <TabBar />
            </div>
        );
    }
}

const STYLES = {
    height: 2000,
    width: 2000
};
