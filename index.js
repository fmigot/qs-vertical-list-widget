import React from 'react';
import ReactDOM from 'react-dom';
import VerticalListWidget from 'vertical-list-widget';

let container = document.getElementById('container');
export let component = ReactDOM.render(React.createElement(VerticalListWidget), container);

if (module)
    component.setState(module.component.state);
