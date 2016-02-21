import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/VideoList.js';
import xhr from './lib/xhr.js';

var targetUrl = 'http://vimeo.com/api/v2/channel/staffpicks/videos.json';

var App = React.createClass({
	getInitialState() {
		return {
			loaded: false
		}
	},
	loadApi() {
		xhr.getJSON(targetUrl, (err, data) => {
			if (err){
				return console.log(err);
			}
			this.setState({
				loaded: true,
				list: data
			});
		})
	},
	render() {
		if (!this.state.loaded){
			this.loadApi();
			return <div>Loading</div>
		}
		return <div>
			<h1>Vimeo Channel Listing</h1>
			<VideoList list={this.state.list} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));