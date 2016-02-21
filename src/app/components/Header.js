import React from 'react';
import {render} from 'react-dom';

var Header = React.createClass({
	propTypes: {
		handleSubmit: React.PropTypes.func
	},
	onSubmit(e, data) {
		e.preventDefault();		// prevent default form action
		this.props.handleSubmit( this.refs.input.value);		// redirect data to the parent component's function, passed in as a prop
		this.refs.input.value = '';
	},
	render() {
		return <div>
			<h1>Vimeo Channel Surfer</h1>
			<form onSubmit={this.onSubmit}>
				<input ref="input" type="text" placeholder="Search for channel..."/>
			</form>
		</div>
	}
});

module.exports = Header;