import React from 'react';
import {render} from 'react-dom';

var categories = ['animation', 'art', 'cameratechniques', 'comedy', 'documentary', 'experimental', 'fashion', 'food', 'instructionals', 'music', 'narrative', 'personal', 'journalism', 'sports', 'talks', 'travel'];

var Header = React.createClass({
	propTypes: {
		handleSubmit: React.PropTypes.func,
		handleClick: React.PropTypes.func,
		authUrl: React.PropTypes.string
	},
	onSubmit(event) {
		event.preventDefault();		// prevent default form action
		this.props.handleSubmit(this.refs.input.value);		// redirect data to the parent component's function, passed in as a prop
		this.refs.input.value = '';		// reset input
	},
	onClick(category) {
		this.props.handleClick(category);
	},
	onAuth() {
		this.props.handleAuth();
	},
	render() {
		var buttons = categories.map(el => <button key={el} onClick={this.onClick.bind(null, el)}>{el}</button>);
		return <div>
			<h1>Vimeo Channel Surfer</h1>
			<a href={this.props.authUrl}>Authorize to use Advanced Features</a>
			{buttons}
			<form onSubmit={this.onSubmit}>
				<input ref="input" type="text" placeholder="Search for channel..."/>
			</form>
		</div>
	}
});

module.exports = Header;