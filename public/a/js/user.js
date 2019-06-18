$(function () {
	$.ajax({
		type: "get",
		url: "/user/queryUser",
		data: {
			page: 1,
			pageSize: 10
		},
		dataType: "json",
		success: function (res) {
			console.log(res);
			var html = template('userTemp', res)
			$('#userBox').append(html);
		}
	});

	$('#userBox').on('click', '.userBtn', function () {
		var isDelete = $(this).attr('data-isDelete')
		var id = $(this).attr('data-id')
		$.ajax({
			type: "post",
			url: "/user/updateUser",
			data: {
				id: id,
				isDelete: isDelete
			},
			dataType: "json",
			success: function (res) {
				console.log(isDelete);
				if (res.success) {

					location.reload()
				}
			}
		});
	})

})