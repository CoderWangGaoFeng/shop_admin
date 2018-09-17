function login(){
	var userName = $("#userName").val();	
	var password = $("#password").val();
	if(userName == null || userName.trim() == "" || userName == undefined){
		alert("用户名不能为空");
		return false;
	}
	if(password == null || password.trim() == "" || password == undefined){
		alert("密码不能为空");
		return false;
	}
	$.ajax({
		url:path+"/account",
		type:"post",
		dataType:"json",
		data:{
			"userName":userName,
			"password":password
		},
		success:function(data){
			if(data.status == "SUCCESS"){
				localStorage.setItem("token",data.data.token);
				localStorage.setItem("id",data.data.accountId);
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