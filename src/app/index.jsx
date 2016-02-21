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
	loadApi(url, channel) {
		xhr.getJSON(url, (err, data) => {
			console.log(data);
			if (err){
				return this.setState({
					error: 'That channel does not exist.'
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
	loadVideos(channel) {
		var url = 'http://vimeo.com/api/v2/channel/' + channel + '/videos.json';
		this.loadApi(url, channel);
	},
	render() {
		console.log(this.state);
		if (this.state.error){
			return <div>
				<Header handleSubmit={this.loadVideos} />
				<h3>{this.state.error}</h3>
			</div>
		}
		if (!this.state.loaded){
			return <div>
				<Header handleSubmit={this.loadVideos} />
				<h3>Enter a channel name.</h3>
			</div>
		}
		return <div>
			<Header handleSubmit={this.loadVideos} />
			<VideoList list={this.state.list} channel={this.state.channel} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));