var Content = React.createClass({
    loadCommentsFromServer: function(){
        var access_token = '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb';
        var count = 4;

        var tags =['nail', 'k3', '친구들','에스컬레이터','데일리'];
        var random = Math.floor(Math.random()/2 * 10);
        var tag = tags[random];
        var url= 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent';

        $.ajax({   
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            data: {access_token: access_token, count: count},
            success: function(data){
                this.setState({data: data.data});
            }.bind(this),
            error:function(xhr, status, err){
                console.error('message:'+xhr.responseText);
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return {data: []}
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },
    render: function(){
        return (
            <div className="content">
                <h2 className="title"> 인스타그램 랜덤 사진! </h2>
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

ReactDOM.render(
    <Content pollInterval={3000} />,
    document.getElementById('content')
)