import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/VideoList.js';
import Header from './components/Header.js';
import xhr from './lib/xhr.js';

// set base URL for authentication
var authUrl = 'https://api.vimeo.com/oauth/authorize';
authUrl += '?response_type=code';
authUrl += '&client_id=9765dae2612e07ec845492c2a95459d2fdb54a87';
authUrl += '&redirect_uri=http://localhost:3000/';
authUrl += '&scope=interact';
authUrl += '&state=12345'

var App = React.createClass({
	getInitialState() {
		return {
			loaded: false
		}
	},
	getData(url, channel) {
		xhr.getJSON(url, (err, data) => {
			console.log(data);
			if (data.error){
				return this.setState({
					error: 'Woops, you haven\'t authenticated yet.'
				});
			}
			if (err){
				return this.setState({
					error: 'That channel doesn\'t exist.'
				});
			}
			this.setState({
				loaded: true,
				list: data,
				channel,
				error: null
			});
		})
	},
	loadChannel(channel) {	// load a specific channel (from search bar input)
		var url = 'http://vimeo.com/api/v2/channel/' + channel + '/videos.json';
		this.getData(url, channel);
	},
	loadRandom(category){	// load a random channel (from a category button)
		console.log('loading random');
		var url = 'https://api.vimeo.com/categories/comedy/channels';
		this.getData(url, category);
	},
	render() {
		console.log(this.state);
		if (this.state.error){
			return <div>
				<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} />
				<h3>{this.state.error}</h3>
			</div>
		}
		if (!this.state.loaded){
			return <div>
				<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} authUrl={authUrl} />
				<h3>Enter a channel name.</h3>
			</div>
		}
		return <div>
			<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} authUrl={authUrl} />
			<VideoList list={this.state.list} channel={this.state.channel} authUrl={authUrl} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));