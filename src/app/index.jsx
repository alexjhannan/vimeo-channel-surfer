import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/VideoList.js';
import Header from './components/Header.js';
import xhr from './lib/xhr.js';

var App = React.createClass({
	getInitialState() {
		return {
			loaded: false
		}
	},
	getData(url, channel) {
		this.setState({
			loaded: false
		});
		xhr.getJSON(url, (err, data) => {
			if (err){		// if error is received
				return this.setState({
					error: 'That channel doesn\'t exist.'
				});
			}
			console.log(data);
			// when called with a category, parse the resulting object
			if (!data.length){
				var channels = data.data;
				var randomIndex = Math.round(Math.random()*channels.length);
				channel = channels[randomIndex].link.split('/').splice(-1).toString();
				return this.loadChannel(channel);
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
		var url = 'https://api.vimeo.com/categories/' + category + '/channels?access_token=b372ff92a3caec7b11604f51bad16fc7';
		this.getData(url);
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
				<h3>Loading...</h3>
			</div>
		}
		return <div>
			<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} />
			<VideoList list={this.state.list} channel={this.state.channel} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));