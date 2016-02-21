import React from 'react';
import {render} from 'react-dom';

var App = React.createClass({
	render() {
		return <div>
			<h1>Hello from React</h1>
		</div>;
	}
});

render(<App/>, document.getElementById('container'));