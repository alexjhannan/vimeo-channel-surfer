import React from 'react';
import {render} from 'react-dom';

var categories = ['animation', 'art', 'cameratechniques', 'comedy', 'documentary', 'experimental', 'fashion', 'food', 'instructionals', 'music', 'narrative', 'personal', 'journalism', 'sports', 'talks', 'travel'];

var Header = React.createClass({
	propTypes: {
		handleSubmit: React.PropTypes.func,
		handleClick: React.PropTypes.func
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
		var buttons = categories.map(el => <button style={styles.btn} key={el} onClick={this.onClick.bind(null, el)}>{el}</button>);
		return <div>
			<h1 style={styles.header}>Vimeo Channel Surfer</h1>
			<h4 style={styles.warning}>(content may be NSFW)</h4>
			<div style={styles.btnBox}>{buttons}</div>
			<form onSubmit={this.onSubmit}>
				<input style={styles.search} ref="input" type="text" placeholder="search for channel by name"/>
			</form>
		</div>
	}
});

// styles are built into the component, here
var styles = {};

styles.header = {
	textAlign: 'center',
	fontFamily: 'Inconsolata'
};

// when extended this kind of style, it needs to be copied as a new object
// otherwise both variables will refer to the same object
styles.warning = JSON.parse(JSON.stringify(styles.header));

styles.warning.fontSize = '.75em';
styles.warning.margin = '-20px 0 10px';

styles.btnBox = {
	width: '100%',
	textAlign: 'center'
};

styles.btn = {
	border: '1px solid #111', 
	borderRadius: '5px',
	width: '150px',
	height: '30px',
	cursor: 'pointer',
	fontFamily: 'Inconsolata',
	margin: '2px',
	backgroundColor: '#222',
	color: '#d9d9d9'
};

styles.search = {
	width: '300px',
	textAlign: 'center',
	margin: '0 auto',
	display: 'block',
	marginTop: '20px',
	height: '20px',
	padding: '5px',
	border: '2px solid black',
	borderRadius: '5px'
};

module.exports = Header;