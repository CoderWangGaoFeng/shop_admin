$(function(){
	var token = localStorage.getItem("token");
	var accountId = localStorage.getItem("id");
	$.ajax({
		url:path+"/goodsTypes",
		type:"get",
		data:{
			token:token,
			accountId:accountId

		},
		async:true,
		dataType:"json",
		success:function(data){
			if(data.status == "SUCCESS"){
				var select = ""
				for(var i = 0 ;i < data.data.length ; i ++){
					select += "<option value="+data.data[i].id+">"+data.data[i].name+"</option>";
				}
				$("#form-field-select-1_type").append(select);
			}else if(data.status == "AUTH"){
				alert("请登录");
				window.location.href = "login.html";
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrow){
			alert("网络错误");
		}
	})
});

function addGoods(){
	$.ajax({
		url:path+"/account",
		type:"post",
		dataType:"json",
		data:{
			"userName":userName,
			"password":password
		},
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				window.location.href="index.html";
			}else{
				alert("网络错误");
			}
		},
		error:function(){
			alert("网络错误");
		}
	})
}
var flag = "goods";
function changeType(){
	if(flag == "goods"){
		$("#div_price").css('display','none'); 
		$("#div_menu").css('display','none'); 
		$("#div_pricture").css('display','none'); 
		$('#form-field-1_name').attr('placeholder',"请输入菜单名称");
		flag = "menu";
	}else{
		$("#div_price").css('display',''); 
		$("#div_menu").css('display',''); 
		$("#div_pricture").css('display',''); 
		$('#form-field-1_name').attr('placeholder',"请输入商品名称  例如：荔枝500g或荔枝1斤");
		flag = "goods";
	}
}

function subForm(){
	 // document.getElementById("addGoods").submit();
	 var form = new FormData(document.getElementById("addGoods"));
	 form.append("accountId",localStorage.getItem("id"));
	 form.append("token",localStorage.getItem("token"));
	// var formData = new FormData($( "#addGoods")[0]);  
     $.ajax({  
          url: path+"goods" ,  /*这是处理文件上传的servlet*/
          type: 'POST',  
          data: form,  
          async: false,  
          contentType: 'application/json',
          cache: false,  
          contentType: false,  
          processData: false,  
          success: function (data) {  
          	if(data.status == "SUCCESS"){
          		alert("新增成功");
          		document.getElementById("addGoods").reset();
          	}else{
          		alert("网络错误");
          	}
          },  
          error: function (returndata) {  
              alert("网络错误");
          }  
     }); 
}