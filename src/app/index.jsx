import React from 'react';
import {render} from 'react-dom';
import VideoList from './VideoList.js'

var App = React.createClass({
	render() {
		return <div>
			<h1>Hello from React</h1>
			<VideoList />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));