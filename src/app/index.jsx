import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/VideoList.js';
import Header from './components/Header.js';
import xhr from './lib/xhr.js';

var App = React.createClass({
	getInitialState() {
		return {
			init: true
		}
	},
	getData(url, channel) {
		this.setState({
			loaded: false,
			init: false
		});
		xhr.getJSON(url, (err, data) => {
			if (err){		// if error is received
				return this.setState({
					error: true
				});
			}
			console.log(data);
			if (data.length === 0){		// catches edge case where an array is returned, but the array is empty
				return this.setState({
					error: true
				});
			}
			// when called with a category, data will be an object, not an array
			// parse the resulting object to find a random channel and recurse
			if (!data.length){
				var channels = data.data;
				var randomIndex = Math.round(Math.random()*channels.length);
				channel = channels[randomIndex];
				if (!channel.link) {	// handles edge case where a random channel element doesn't have a link
					this.setState({
						error: true
					})
				}
				channel = channel.link.split('/').splice(-1).toString(); // rip the channel name off of the provided link
				return this.loadChannel(channel);	// recurse to load that channel
			} else {
				// if data received is a channel, set the state to hold a list of its videos
				this.setState({
					loaded: true,
					list: data,
					channel,
					error: null
				});
			}
		})
	},
	loadChannel(channel) {	// load a specific channel (from search bar input)
		var url = 'http://vimeo.com/api/v2/channel/' + channel + '/videos.json';
		this.getData(url, channel);
	},
	loadRandom(category){	// load a random channel (from a category button)
		var url = 'https://api.vimeo.com/categories/' + category + '/channels?access_token=b372ff92a3caec7b11604f51bad16fc7';
		this.getData(url);
	},
	render() {
		console.log(this.state);

		var result = [];	// holds all elements to be rendered (allows for conditional pushing)
		
		result.push(<Header key="header" handleSubmit={this.loadChannel} handleClick={this.loadRandom} />);

		// result always has the header (above), but the next elements are chosen by this conditional tree
		// note that each element has a unique key, necessary for React's virtual DOM to work properly
		if(this.state.init){
			result.push(<h3 style={styles.text} key="init">Enter a channel name in the search bar, or click on a button to find a random channel.</h3>);
		} else if (this.state.error){
			result.push(<h3 style={styles.text} key="error">pshbzztpshbzzt ---STATIC--- pshbzztpshbzzt</h3>);
			result.push(<p style={styles.text} key="error2">That channel was not found. I'm sorry, Dave.</p>);
		} else if (!this.state.loaded){
			result.push(<h3 style={styles.text} key="loading">Loading...</h3>);
		} else {
			result.push(<VideoList key="videolist" list={this.state.list} channel={this.state.channel} />);
		}

		// state-dependent result is rendered out here
		return <div>
			{result}
		</div>;
	}
});

var styles = {};

styles.text = {
	textAlign: 'center'
}

render(<App/>, document.getElementById('container'));