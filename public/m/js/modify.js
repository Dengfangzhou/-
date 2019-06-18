$(function () {

	// 注册点击事件 修改密码
	$('#modifyBtn').on('tap', function () {

		// 获取表单信息
		var originPass = $('#originPass').val()
		var newPass = $('#newPass').val()
		var confirmPass = $('#confirmPass').val()
		var vCode = $('#vCode').val()

		$.ajax({
			type: "post",
			url: "/user/updatePassword",
			beforeSend: function () {
				if (originPass.trim() == '') {
					mui.toast('原密码不能为空')
					return false
				}
				if (confirmPass != newPass) {
					mui.toast('两次新密码不一样')
					return false
				}
				if (vCode.trim() == '') {
					mui.toast('验证码不能为空')
					return false

				}
			},
			data: {
				oldPassword: originPass,
				newPassword: newPass,
				vCode: vCode
			},
			dataType: "json",
			success: function (res) {
				if (res.success) {
					mui.toast('修改成功')
					setTimeout(function () {
						location.href = "login.html"
					}, 2000)
				}
			}
		});
	})
	// 点击过去验证码
	$('.getCode').on('click', function () {

		$.ajax({
			type: "get",
			url: "/user/vCodeForUpdatePassword",
			success: function (res) {
				console.log(res.vCode);

			}
		});
	})
})