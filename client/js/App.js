import React, { Component } from 'react';
import ExpandingButton from 'components/ExpandingButton/ExpandingButton';
import ExpandingButton2 from 'components/ExpandingButton/ExpandingButton2';
import ExpandingList from 'components/ExpandingList/ExpandingList';

export default class App extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES}>
                <ExpandingList />
            </div>
        );
    }
}

const STYLES = {
    height: 2000,
    width: 2000
};
