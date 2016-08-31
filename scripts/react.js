var Content = React.createClass({
	getInitialState: function(){
		return {data: []}
	},
	componentDidMount: function(){
	    var access_token = '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb';
	    var count = 4;
    	var url= 'https://api.instagram.com/v1/tags/nail/media/recent',

	    $.ajax({   
	        type: 'GET',
	        dataType: 'jsonp',
	        url: url,
	        data: {access_token: access_token, count: count},
	        success: function(result){
	    		var html = '';
	    		$.each(result.data, function(i, value){
	    			html += '<li><img src="'+ value.images.thumbnail.url + '"></li>';
	    		});
	        	$('ul#images').append(html);
	        },
	        error:function(jqXHR, textStatus, error){
	            console.error("message:"+jqXHR.responseText);
	        }
	     }
	    );
	}
	render: function(){
		return (
			<div className="content">
				<h2 className="title"> 최신네일 ㅋㅋ </h2>
				<ImageList data={this.state.data} />
			</div>
		);
	}
});

var ImageList = React.createClass({
	render: function(){
		var ImageNode = this.props.data.map(function(image){
			return <Image key={image.name} name={image.name} />
		});
		return (
			<ul className="images">
				{ImageNode}
			</ul>
		);
	}
});

var Image = React.createClass({
	render: function(){
		return (
			<li className="image">{this.props.name}</li>
		);
	}
});

ReactDOM.render(
	<Content url={url} />,
	document.getElementById('content')
)