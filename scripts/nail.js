console.log('nail.js import ok');




var access_token = '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb';
$.ajax({   
     type: "GET",
     url: "https://api.instagram.com/v1/tags/nail/media/recent?access_token=" + access_token, 
     dataType: "jsonp",
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