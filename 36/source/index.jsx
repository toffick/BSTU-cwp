import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './components/Todo/index';
import 'babel-polyfill';
import './assets/style.css'

ReactDOM.render(<ToDo/>, document.getElementById('app'));
