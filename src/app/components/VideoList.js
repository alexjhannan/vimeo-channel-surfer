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
			// set default values for props that may be undefined
			video.stats_number_of_plays = video.stats_number_of_plays || 0;
			video.stats_number_of_comments = video.stats_number_of_comments || 0;
			video.stats_number_of_likes = video.stats_number_of_likes || 0;
			video.tags = video.tags || 'None';

			return (	// builds out a div for each video
				<div key={video.id} style={styles.listItem}>
					<h3 style={styles.text}>{video.title}</h3>
					<div style={styles.contentBox}>
						<a href={video.url}><img src={video.thumbnail_large} style={styles.image} /></a>
						<p style={styles.text}>{'Comments: ' + video.stats_number_of_comments} || {'Likes: ' + video.stats_number_of_likes} || {'Plays: ' + video.stats_number_of_plays} || {'Duration: ' + video.duration + ' seconds'}</p>
						<p style={styles.text}>{'Tags: ' + video.tags}</p>
						<p style={styles.text}>{'Uploaded: ' + video.upload_date}</p>
						<p style={styles.text}>Posted by:  <a style={styles.link} href={video.user_url} target='_blank'>{video.user_name}</a></p>
					</div>
				</div>
			);
			
		});
		return <div>
			<h3 style={styles.header} >tuned to: <em>{this.props.channel}</em></h3>
			{videos}
		</div>;
	}
});

// styles are built into the component, here
var styles = {};

styles.header = {
	textAlign: 'center',
	fontFamily: 'Inconsolata'
};

styles.listItem = {
	border: '2px solid black',
	borderRadius: '20px',
	padding: '0 20px 0',
	listStyle: 'none',
	marginTop: '20px',
	clear: 'both',
	backgroundColor: '#222',
	color: '#d9d9d9'
};

styles.contentBox = {
	width: '60%',
	margin: '0 auto'
};

styles.image = {
	width: '100%'
};

styles.text = {
	textAlign: 'center',
	fontFamily: 'Inconsolata'
};

styles.link = {
	color: '#cd5c5c'
}

module.exports = VideoList;