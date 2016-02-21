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
	loadApi() {
		xhr.getJSON(targetUrl, (err, data) => {
			console.log(data);
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
			return <div>
				<Header />
				<h3>Loading...</h3>
			</div>
		}
		return <div>
			<Header />
			<VideoList list={this.state.list} />
		</div>;
	}
});

render(<App/>, document.getElementById('container'));