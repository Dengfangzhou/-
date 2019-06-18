$(function () {

	$('#login-btn').on('click', function () {
		var username = $('#username').val()
		var password = $('#password').val()
		$.ajax({
			type: "post",
			url: "/user/login",
			data: {
				username,
				password
			},
			beforeSend: function () {
				if (username.trim() == '') {
					mui.toast('请输入用户名')
					return false
				}
				if (password.trim() == '') {
					mui.toast('请输入密码')
					return false
				}
			},
			dataType: "json",
			success: function (res) {
				if (res.success) {
					mui.toast('登陆成功')
					setTimeout(function () {
						location.href = "user.html"
					}, 2000);
				} else {
					mui.toast('密码错误')

				}

			}
		});

	})

})