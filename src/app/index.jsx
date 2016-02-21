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
			// when called with a category, parse the resulting object
			if (!data.length){
				var channels = data.data;
				var randomIndex = Math.round(Math.random()*channels.length);
				channel = channels[randomIndex];
				if (!channel.link) {
					this.setState({
						error: true
					})
				}
				channel = channel.link.split('/').splice(-1).toString();
				return this.loadChannel(channel);
			} else {
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

		if(this.state.init){
			return <div>
				<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} />
				<h3>Enter a channel name in the search bar, or click on a button to find a random channel.</h3>
			</div>
		}
		if (this.state.error){
			return <div>
				<Header handleSubmit={this.loadChannel} handleClick={this.loadRandom} />
				<h3>pshbzztpshbzzt ---STATIC--- pshbzztpshbzzt</h3>
				<p>That channel was not found. I'm sorry, Dave.</p>
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