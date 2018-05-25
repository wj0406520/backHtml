$(function(){
	$("body").on('click','#cover .close i',function(){
		hideCover();
	})

	$('input[type="submit"]').click(function(){
		var re = true;
		var form = $(this).parents('form');
		var form_data = new FormData(form[0]);
		var form_url = $(this).parents('form').attr('action');
		var form_name = $(this).parents('form').attr('name');
		if(!form_url){
			showError("没填action");
			return false;
		}

		form.find('input[handle]').each(function(){
			var handle = $(this).attr('handle');
			var value = $(this).val();
			var name = $(this).attr('target');
			if(!error.check(handle,value)){
				re = false;
				showError(error.get(name));
				return false;
			}
		})
		if(!re){
			return false;
		}
		// console.log($(this).parents('form').serializeArray());
		if(ajax.success[form_name]){
			ajax.run = ajax.success[form_name];
		}
        ajax.sent({
            url:form_url,
            data:form_data,
        });
		return false;
	})

	$('input[type="file"]').change(function(){
		$(".label.file-name").show().text($(this).val().split("\\").pop());
	})

});


function redirect(redirect){
	if(self==parent){
		window.location.href = redirect;
	}else{
		parent.window.location.href = redirect;
	}
}
function ajaxHideCover(){
	if(self==parent){
		hideCover();
	}else{
		parent.hideCover();
	}
}

function showCover(that){
	var url = $(that).attr('data-url');
	if($("#cover").length==0){
		setCoverHtml();
	}
	$("#cover iframe").attr('src',url);
	$("#cover").show();
	$("#cover .load").show();

	$("#cover iframe")[0].onload = function(){
		$("#cover .main-cover").show();
		$("#cover .load").hide();
	};
/*
	setTimeout(function(){
		$("#cover .main-cover").show();
		$("#cover .load").hide();
	},100);
*/
}
function setCoverHtml(){
    var html = '<div id="cover">\
				    <div class="main-cover">\
				        <div class="close"><i class="icon-font">&#xe024;</i></div>\
				        <div class="content-cover"><iframe name="info" src=""></iframe></div>\
				    </div>\
				    <div class="load"></div>\
				</div>';
	$("body").prepend(html);
}

function hideCover(){
	$("#cover").hide();
	$("#cover .load").hide();
	$("#cover .main-cover").hide();
}

function showError(str){
	$(".error-info").text(str).show();
	setTimeout(function(){
		$(".error-info").hide();
	},2000);
}
