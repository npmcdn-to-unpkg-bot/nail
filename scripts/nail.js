var Content = React.createClass({
    loadCommentsFromServer: function(){
        var access_token = '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb';
        var count = 4;

        $.ajax({   
            type: 'GET',
            dataType: 'jsonp',
            url: this.props.url,
            data: {access_token: access_token, count: count},
            success: function(data){
                this.setState({data: data.data});
            }.bind(this),
            error:function(xhr, status, err){
                console.error('message:'+xhr.responseText);
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return {data: []}
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
    },
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
        var ImageNode = this.props.data.map(function(result){
            return <Image key={result.id} src={result.images.thumbnail.url} />
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
            <li className="image"><img src={this.props.src} /></li>
        );
    }
});


var url= 'https://api.instagram.com/v1/tags/nail/media/recent';
ReactDOM.render(
    <Content url={url} />,
    document.getElementById('content')
)