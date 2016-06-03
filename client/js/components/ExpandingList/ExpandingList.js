import React, { Component } from 'react';
import Radium from 'radium';

import './ExpandingList.css';

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

        active: null
    }
    state : { items: Array<Object>};

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                {this.renderList()}
            </div>
        );
    }

    renderList() {
        const { items, active } = this.state;

        return items.map((item, index) => {
            return (
                <div
                    key={index}
                    style={[STYLES.listItem, active === index ? STYLES.activeListItem : {}]}
                    onClick={(e) => this.test(e)}
                />
            );
        });
    }

    test(e) {
        const ele = e._targetInst._nativeNode;

        const first = ele.getBoundingClientRect();
        ele.classList.add('expanded');

        const last = ele.getBoundingClientRect();
        // ele.classList.remove('expanded');
        const invert = {};

        invert.x = first.left - last.left;
        invert.y = first.top - last.top;
        invert.sx = first.width / last.width;
        invert.sy = first.height / last.height;

        ele.style.transformOrigin = '0 0';
        ele.style.transform = `translate(${invert.x}px, ${invert.y}px) scale(${invert.sx}, ${invert.sy}) `;

        ele.classList.add('animate');

        ele.style.transform = ''

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
        marginLeft: 300,
        marginTop: 100,
        color: 'white',
        fontFamily: 'Lato'
    },

    listItem: {
        width: 350,
        height: 75,
        margin: 15,
        backgroundColor: '#00796B',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        transition: 'transform 0.3s cubic-bezier(.25,.8,.25,1)'
    },

    activeListItem: {
        // boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        height: 100
    },

    title: {
        paddingTop: 10,
        paddingLeft: 10
    }
};
