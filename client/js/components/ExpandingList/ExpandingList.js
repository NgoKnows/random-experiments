import React, { Component } from 'react';
import Radium from 'radium';

import './ExpandingList.css';

import ListItem from './ListItem';

@Radium
export default class ExpandingList extends Component {
    static defaultProps = {};
    props: {};
    state = {
        items: [
            { title: 'Gitlab', description: '', image: '' },
            { title: 'Instagram', description: '', image: '' },
            { title: 'Snapchat', description: '', image: '' },
            { title: 'Reddit', description: '', image: '' },
            { title: 'Vine', description: '', image: '' }
        ],

        activeIndex: null
    }
    state : { items: Array<Object> };

    render() {
        return (
            <div style={STYLES.container}>
                {this.renderList()}
            </div>
        );
    }

    renderList() {
        const { items, activeIndex } = this.state;

        return items.map((item, index) => {
            return (
                <ListItem
                    key={index}
                    index={index}
                    activeIndex={activeIndex}
                    handleClick={() => this.listClick(index)}
                />
            );
        });
    }

    listClick(index) {
        console.log(index, this.state.activeIndex);
        if (index === this.state.activeIndex) {
            this.setState({ activeIndex: null });
        } else {
            this.setState({ activeIndex: index });
        }
    }

}

const STYLES = {
    container: {
        marginLeft: 300,
        marginTop: 100,
        color: 'white',
        fontFamily: 'Lato'
    }
};
