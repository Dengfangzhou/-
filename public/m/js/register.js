$(function () {
	$('.getCode').on('tap', function () {
		$.ajax({
			type: "get",
			url: "/user/vCode",
			dataType: "json",
			success: function (res) {
				console.log(res.vCode)
			}
		});

	})

	$('#registerBtn').on('click', function () {
		var username = $('[name="username"]').val()
		var mobile = $('[name="mobile"]').val()
		var password = $('[name="password"]').val()
		var againpass = $('[name="againpass"]').val()
		var vCode = $('[name="vCode"]').val()
		$.ajax({
			type: "POST",
			url: "/user/register",
			beforeSend: function () {
				if (username.trim() == '') {
					mui.toast('请输入用户名')
					return false
				}
				var reg = /^1\d{10}$/
				if (!reg.test(mobile)) {
					mui.toast('请输入正确的手机号')
					return false
				}
				if (password.trim() == '') {
					mui.toast('请设置密码')
					return false
				}
				if (password != againpass) {
					mui.toast('两次输入的密码不正确')
					return false
				}

				if (vCode.trim() == '') {
					mui.toast('验证码不能为空')
					return false
				}
			},
			data: {
				username: username,
				mobile: mobile,
				password: password,
				vCode: vCode
			},
			dataType: "josn",
			success: function (res) {
				mui.alert('注册成功')
				setTimeout(function () {
					location.href = "login.html"
				}, 2000)
			}
		});

	})

})