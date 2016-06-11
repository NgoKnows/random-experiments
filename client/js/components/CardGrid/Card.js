import React, { Component } from 'react';
import Radium from 'radium';
import './card.css'

@Radium
export default class Card extends Component {
    static defaultProps = {};
    props: { name: string, image: string };
    state = { expanded: false }
    state: void;

    render() {
        const { name, image } = this.props;
        const { expanded } = this.state;

        const containerClass = expanded ? '' : '';

        return (
            <div style={STYLES.container} onClick={(e) => this.expandCard(e)}>
                <div
                    ref="cardContainer"
                    style={STYLES.cardContainer}
                    className={containerClass}
                />
                <div style={STYLES.siblingContainer}>
                    <div style={STYLES.image} />
                    <div style={STYLES.info.container}>
                        <div style={STYLES.info.name}>{name}</div>
                        <div style={STYLES.info.team}>Chicago Bulls</div>
                    </div>
                </div>
            </div>
        );
    }

    expandCard(e) {
        const { expanded } = this.state;

        // this.setState({ expanded: !expanded });
        const ele = this.refs.cardContainer;

        // get where the card is first
        const first = ele.getBoundingClientRect();
        ele.classList.add('expandedCard');

        // get where it is after you do your thang
        const last = ele.getBoundingClientRect();

        // figure out how to scale and transform it
        const invert = {};

        invert.x = first.left - last.left;
        invert.y = first.top - last.top;
        invert.sx = first.width / last.width;
        invert.sy = first.height / last.height;

        // invert the changes due to adding the class
        ele.style.transformOrigin = '0 0';
        ele.style.transform = `translate(${invert.x}px, ${invert.y}px) scale(${invert.sx}, ${invert.sy}) `;

        // rewind dem changes
        setTimeout(() => ele.style.transition = 'transform 0.4s ease', 1);
        setTimeout(() => ele.style.transform = '', 1);

        // const newStyle = {
        //     transformOrigin: '0 0',
        //     transform: `translate(${invert.x}px, ${invert.y}px) scale(${invert.sx}, ${invert.sy}) `
        // }
        // console.log(ele.getBoundingClientRect());
        //
        // ele.style.transform = 'translateY(50px)';
        // console.log(ele.style);
        //
        // ele.style.transform = '';
        // console.log(ele.getBoundingClientRect());

        // this.setState({ active: index });
    }
}

const STYLES = {
    container: {
        height: 400,
        width: 300,
        borderRadius: 3,
        position: 'relative',
        padding: 30,

    },

    cardContainer: {
        height: 400,
        width: 300,
        borderRadius: 3,
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        // transition: 'transform 0.2s ease'
    },

    siblingContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
    },

    image: {
        height: 300,
        // backgroundColor: 'black',
        borderRadius: '3px 3px 0 0',
        backgroundImage: 'url(https://blog-blogmediainc.netdna-ssl.com/upload/SportsBlogcom/2159727/0355040001455753583_filepicker.jpg)',
        backgroundPosition: 'center'
    },

    info: {
        container: {
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },

        name: {
            color: 'grey',
            fontSize: 20,
            fontWeight: '300'
        },

        team: {
            color: 'red',
            fontWeight: '300'
        }
    }
};
