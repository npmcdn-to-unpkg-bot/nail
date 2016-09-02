var Content = React.createClass({
    access_token: '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb',
    getTags: function(){
        var url= 'https://api.instagram.com/v1/users/self/media/recent';
        $.ajax({   
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            data: {access_token: this.access_token},
            success: function(result){
                var tags = [];
                result.data.map(function(data){
                    tags = tags.concat(data.tags);
                });
                this.setState({tags: tags});
                this.loadData();
            }.bind(this),
            error:function(xhr, status, err){
                console.error('message:' + xhr.responseText);
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    loadData: function(tag){
        var tags = this.state.tags;
        var random = Math.floor(Math.random() * tags.length);
        var tag = tag || tags[random];
        var url= 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent';
        $.ajax({   
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            data: {access_token: this.access_token},
            success: function(result){
                this.setState({data: result.data});
            }.bind(this),
            error:function(xhr, status, err){
                console.error('message:' + xhr.responseText);
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return ({tags:[], data: [], text: 'Random'});
    },
    componentDidMount: function(){
        this.getTags();
    },
    handlerCommentSubmit: function(data){
        this.setState({text: data.text});
        this.loadData(data.text);
    },
    render: function(){
        return (
            <div className="content">
                <Title> 인스타그램에서 태그로 **사진** 찾기!</Title>
                <Comment text={this.state.text} tags={this.state.tags} />
                <CommentForm onCommentSubmit={this.handlerCommentSubmit} />
                <ImageList data={this.state.data}/>
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

var Comment = React.createClass({
    rawMarkup: function(tagNode){
        if(tagNode.length === 0) return;
        var md = new Remarkable()
        var rawMarkup = md.render(tagNode);
        return ({__html: rawMarkup});
    },
    render: function(){
        var text = this.props.text;
        var tagNode = this.props.tags.map(function(data){
            return (text === data) ? '**'+data+'**' : data;
        });
        return (
            <div className="comment">
                My tags : <div className="my-tags" dangerouslySetInnerHTML={this.rawMarkup(tagNode.join(', '))} />
                <p>Search: {text}</p>
            </div>
        );
    }
});

var ImageList = React.createClass({
    render: function(){
        if(this.props.data.length === 0){
            return <div>No data..</div>
        }
        var ImageNode = this.props.data.map(function(result){
            return <li key={result.id}><img src={result.images.thumbnail.url} /></li>
        })
        return (
            <ul className="list-unstyled">
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
                <input type="text" placeholder="Tag..."  
                    value={this.state.text}
                    onChange={this.handlerTextChange} />
                <input type="submit" value="Search" />
            </form>
        );
    }
});

ReactDOM.render(
    <Content />,
    document.getElementById('content')
);