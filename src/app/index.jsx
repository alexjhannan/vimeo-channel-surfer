import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/VideoList.js'

var list = [{name:1}, {name:2}, {name:3}];

var App = React.createClass({
	render() {
		return <div>
			<h1>Hello from React</h1>
			<VideoList list={list} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));