import React from 'react';
import {render} from 'react-dom';

var VideoList = React.createClass({
	propTypes: {
		list: React.PropTypes.array,
		channel: React.PropTypes.string
	},
	render() {
		if (this.props.list.length === 0){
			return <h3>Channel <em>{this.props.channel}</em> appears to be empty...</h3>
		}

		var videos = this.props.list.map(video => {		// parses the given video list out into UI components
			// set default values for some props
			video.stats_number_of_plays = video.stats_number_of_plays || 0;
			video.stats_number_of_comments = video.stats_number_of_comments || 0;
			video.stats_number_of_likes = video.stats_number_of_likes || 0;
			video.tags = video.tags || 'None';

			return (
				<li key={video.id} style={styles.listItem}>
					<img src={video.thumbnail_medium} style={styles.thumbnail} />
					<h3>{video.title}</h3>
					<p>{'Comments: ' + video.stats_number_of_comments}</p>
					<p>{'Likes: ' + video.stats_number_of_likes}</p>
					<p>{'Plays: ' + video.stats_number_of_plays}</p>
					<p>{'Duration: ' + video.duration + ' seconds'}</p>
					<p>{'Tags: ' + video.tags}</p>
					<p>{'Uploaded: ' + video.upload_date}</p>
					<a href={video.url}>Link</a>
					<p>Posted By:  <a href={video.user_url} target='_blank'><img src={video.user_portrait_small}></img>{video.user_name}</a></p>
				</li>
			);
			
		});
		return <div>
			<h3>Currently tuned to: <em>{this.props.channel}</em></h3>
			<ul>
				{videos}
			</ul>
		</div>;
	}
});

// styles are built into the component, here
var styles = {};

styles.listItem = {
	border: '2px solid black',
	borderRadius: '20px',
	padding: '20px',
	listStyle: 'none',
	marginTop: '20px',
	clear: 'both'
}

styles.thumbnail = {
	width: '200px',
	float: 'right'
}

module.exports = VideoList;