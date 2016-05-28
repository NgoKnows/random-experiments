import React, { Component } from 'react';
import ExpandingButton from 'components/ExpandingButton/ExpandingButton';

export default class App extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div>
                <ExpandingButton />
            </div>
        );
    }
}

const STYLES = {};
