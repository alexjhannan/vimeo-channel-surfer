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
	loadApi(url) {
		xhr.getJSON(url, (err, data) => {
			console.log(data);
			if (err){
				return this.setState({
					loaded: false
				});
			}
			this.setState({
				loaded: true,
				list: data
			});
		})
	},
	loadVideos(channel) {
		var url = 'http://vimeo.com/api/v2/channel/' + channel + '/videos.json';
		this.loadApi(url);
	},
	render() {
		if (!this.state.loaded){
			this.loadVideos('staffpicks');
			return <div>
				<Header handleSubmit={this.loadVideos} />
				<h3>Loading...</h3>
			</div>
		}
		return <div>
			<Header handleSubmit={this.loadVideos} />
			<VideoList list={this.state.list} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));