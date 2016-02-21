import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/VideoList.js';
import Header from './components/Header.js';
import xhr from './lib/xhr.js';

var targetUrl = 'http://vimeo.com/api/v2/channel/staffpicks/videos.json';

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
					error: 'Woops, your developer forgot to authenticate.'
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
		var url = 'https://api.vimeo.com/categories/comedy/channels?page=1&per_page=20';
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
				<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} />
				<h3>Enter a channel name.</h3>
			</div>
		}
		return <div>
			<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} />
			<VideoList list={this.state.list} channel={this.state.channel} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));