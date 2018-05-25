$(function(){

	/**
	 * [绑定关闭遮盖层的事件]
	 */
	$("body").on('click','#cover .close i',function(){
		hideCover();
	})

	/**
	 * [
	 * 	1.绑定所有提交按钮
	 * 	2.完成自动验证
	 * 	3.自动提交功能
	 * 	4.自动处理部分返回值
	 * ]
	 */
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

	/**
	 * [上传文件的事件]
	 */
	$('input[type="file"]').change(function(){
		$(".label.file-name").show().text($(this).val().split("\\").pop());
	})

});


/**
 * [redirect 跳转界面]
 * @param  {[type]} redirect [跳转路径]
 */
function redirect(redirect){
	if(self==parent){
		window.location.href = redirect;
	}else{
		parent.window.location.href = redirect;
	}
}

/**
 * [ajaxHideCover ajax隐藏遮盖层]
 */
function ajaxHideCover(){
	if(self==parent){
		hideCover();
	}else{
		parent.hideCover();
	}
}

/**
 * [showCover 显示遮盖层，iframe]
 * @param  {[type]} that [点击元素]
 * @return {[type]}      [description]
 */
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
}

/**
 * [setCoverHtml 设置遮盖层，不能直接加载，这样会在页面中多增iframe]
 */
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

/**
 * [hideCover 隐藏遮盖层]
 */
function hideCover(){
	$("#cover").hide();
	$("#cover .load").hide();
	$("#cover .main-cover").hide();
}

/**
 * [showError 显示错误]
 * @param  {[type]} str [错误的内容]
 */
function showError(str){
	$(".error-info").text(str).show();
	setTimeout(function(){
		$(".error-info").hide();
	},2000);
}
