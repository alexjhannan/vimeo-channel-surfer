import React from 'react';
import {render} from 'react-dom';

var VideoList = React.createClass({
	propTypes: {
		list: React.PropTypes.array
	},
	render() {
		var videos = this.props.list.map(el => {
			return <li key={el.name}>
				{el.name}
			</li>
		});
		return <ul>
			{videos}
		</ul>;
	}
});

module.exports = VideoList;