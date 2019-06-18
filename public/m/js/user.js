var userInfo = null

$.ajax({
	type: "get",
	url: "/user/queryUserMessage",
	async: false,
	success: function (res) {
			userInfo = res
		console.log(res);
		if (res.error && res.error == 400) {
			location.href = "login.html"

		}
	}
});

$(function () {
	$('.logOut').on('click', function () {
		$.ajax({
			type: "get",
			url: "/user/logout",
			success: function (res) {
			
				if (res.success) {
					mui.toast('正在退出登录')
					setTimeout(function () {
						location.href = "index.html"
					}, 1000)
				}
			}
		});
	})

	var html = template('tempId', userInfo)
	$('#uesrInfoBox').html(html)
	console.log(html);
	
})