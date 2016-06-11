import React, { Component } from 'react';
import Radium from 'radium';

import Card from './Card';

@Radium
export default class CardGrid extends Component {
    static defaultProps = {};
    props: {};
    state = {
        cards: [
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            },
            {
                name: 'Michael Jordan',
                image: ''
            }
        ]
    };
    state : { cards: Array<Object> };

    render() {
        const { } = this.props;

        return (
            <div>
                {this.renderCards()}
            </div>
        );
    }

    renderCards() {
        return this.state.cards.slice(0,1).map((card) => (
            <Card
                name={card.name}
                image={card.image}
            />
        ))
    }
}

const STYLES = {};
