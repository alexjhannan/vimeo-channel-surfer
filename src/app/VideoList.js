import React from 'react';
import {render} from 'react-dom';

var list = <li>thing</li>;

var VideoList = React.createClass({
	render() {
		return <ul>
			{list}
		</ul>;
	}
});

module.exports = VideoList;