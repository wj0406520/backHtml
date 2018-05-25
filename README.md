### 后台界面
___


### 目录结构
___

	|-- css     css目录
	|-- js      js目录
		|-- common.js                  基础js
		|-- foundation-datepicker.js   时间选择器js
		|-- main.js                    跟html有关的操作
	|-- images  图片目录
	|-- fonts   图标目录


### js类
___

#### common.js

* `error` 验证数据正确性

	error.check(`type`,`str`)
	`type` [ phone | require | int | email ]


* `ajax`  对jquery的ajax重写

```
	ajax.close     是否在提交代码之后关闭遮盖层 默认false
	ajax.data      提交到ajax中的data
	ajax.success   提交到成功之后success中（多个from时受name属性影响）
	ajax.run       提交到成功之后success中（一个form时可使用）
```

#### main.js

1.
> * 绑定关闭遮盖层的事件

2.
> * 绑定所有提交按钮
> * 完成自动验证
> * 自动提交功能
> * 自动处理部分返回值

3.
> * 上传文件的事件

### html类
___

#### 表单

```
    <form action="index.php" name="login">
        <ul class="admin_items">
            <li>
                <input type="text" handle="require" target="姓名" name="username" value="" id="user" size="40" class="admin_input_style" placeholder="用户名："/>
            </li>
            <li>
                <input type="password" handle="require" target="哈哈" name="pwd" value="" id="pwd" size="40" class="admin_input_style"   placeholder="密码："/>
            </li>
            <li>
                <input type="submit" tabindex="3" value="提交" class="btn btn-primary" />
            </li>
        </ul>
    </form>
```


```
    ajax.success.login = function(data){
        console.log(33);
    }
```

form 上面的**`name`**在多个form表单提交的时候会有用到



```
	<input type="text" handle="require" target="姓名" name="username" class="admin_input_style" />
```

input 上面的**`handle`**在自动验证的时候
使用类型是**`error`**上面的**`type`**
input 上面的**`target`**在自动验证的时候
弹出错误提示中使用


```
    <a class=btn_addPic href="javascript:void(0);">
        <span><i class="icon-font">&#xe026;</i> 添加图片</span>
        <input class="filePrew" title="支持jpg、jpeg、gif、png格式" type="file" size="3" name="pic">
    </a>
    <span class="label badge-color0 file-name"></span>
```

上传图片的html

```
	<input handle='require' target="时间" type="text" class="common-text select_time1">

	<script charset="utf-8" src="js/foundation-datepicker.js"></script>
	<link rel="stylesheet" type="text/css" href="css/foundation-datepicker.css"/>
	<script>
	$('.select_time1').fdatepicker({
	  format: 'yyyy-mm-dd hh:ii',
	  // pickTime: true,
	});
	</script>
```

时间选择器所需要的html，js和css

```
	<a href="javascript:void(0);" onclick="showCover(this)" data-url='info.html?id=1' >修改</a>
```

**`a`** 把**`data-url`**的链接 显示在遮盖层



