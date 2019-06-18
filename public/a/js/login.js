$.ajax({
	type: "get",
	url: "/employee/checkRootLogin",
	async: false,
	success: function (res) {
		if (res.success) {
			location.href = 'user.html'
		}
	}
});


$(function () {

	$('.login-form').on('submit', function () {
		var userName = $('#userName').val()
		var passWord = $('#passWord').val()

		$.ajax({
			type: "post",
			url: "/employee/employeeLogin",
			data: {
				username: userName,
				password: passWord
			},
			beforeSend: function () {
				if (userName.trim() == '') {
					alert('请输入用户名')
					return false
				}
				if (passWord.trim() == '') {
					alert('请输入密码')
					return false

				}
			},
			dataType: "json",
			success: function (res) {

				if (res.success) {
					location.href = "user.html"
				} else {
					alert("用户名不存在")
				}

			}
		});
		event.preventDefault()
	})
})