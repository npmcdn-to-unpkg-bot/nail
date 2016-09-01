var Content = React.createClass({
    loadData: function(){
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
                console.error('message:' + xhr.responseText);
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return ({data: []});
    },
    componentDidMount: function(){
        this.loadData();
        // setInterval(this.loadData, this.props.pollInterval)
    },
    handlerCommentSubmit: function(comment){
        console.log(comment);
    },
    render: function(){
        return (
            <div className="content">
                <Title> 랜덤 *사진!* </Title>
                <ImageList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handlerCommentSubmit}/>
            </div>
        );
    }
});

var Title = React.createClass({
    rawMarkup: function(){
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString())
        return ({__html: rawMarkup});
    },
    render: function(){
        return (
            <h2 dangerouslySetInnerHTML={this.rawMarkup()} />
        );
    }
});

var ImageList = React.createClass({
    render: function(){
        var ImageNode = this.props.data.map(function(result){
            return <li key={result.id}><img src={result.images.thumbnail.url} /></li>
        })
        return (
            <ul className="images">
                {ImageNode}
            </ul>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function(){
        return ({text: ''});
    },
    handlerTextChange: function(e){
        this.setState({text: e.target.value});
    },
    handlerSubmit: function(e){
        e.preventDefault();
        var text = this.state.text.trim();
        if(!text){
            return;
        }
        this.props.onCommentSubmit({text: text});
        this.setState({text: ''});
    },
    render: function(){
        return (
            <form className="commentForm" onSubmit={this.handlerSubmit}>
                <input type="text" placeholder="text..." 
                    onChange={this.handlerTextChange} />
                <input type="submit" value="Send" />
            </form>
        );
    }
});

ReactDOM.render(
    <Content pollInterval={3000}/>,
    document.getElementById('content')
);