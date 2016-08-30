console.log('nail.js import ok');




var access_token = '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb';
var hashtag = 'nail';
var count = 4;
$.ajax({   
     type: 'GET',
     dataType: 'jsonp',
     // url: 'https://api.instagram.com/v1/tags/search?q=k3&access_token=' + access_token, 
     url: 'https://api.instagram.com/v1/tags/'+hashtag+'/media/recent',
     data: {access_token: access_token, count: count},
     success: function(result){
        console.log(result);
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


 