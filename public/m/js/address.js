$(function () {
	//  页面加载发送ajax请求获取收货地址信息
	var addRessEdit = null
	$.ajax({
		type: "get",
		url: "/address/queryAddress",
		success: function (res) {
			console.log(res);
			addRessEdit = res
			var html = template('addRessId', {
				data: res
			})
			$('#addRessBox').html(html)
		}
	});
	$('#addRessBox').on('tap', '.addRessDle', function () {
		var id = $(this).parent().data('id')
		var li = this.parentNode.parentNode
		console.log(li);

		mui.confirm('确定要删除?', '确定要删除?', function (e) {
			if (e.index == 1) {
				$.ajax({
					type: "post",
					url: "/address/deleteAddress",
					data: {
						id: id
					},
					dataType: "json",
					success: function (res) {
						if (res.success) {
							// location.reload()
							li.parentNode.removeChild(li);
						}
					}
				});
			} else {
				mui.swipeoutClose(li)
			}
		})

	})
	$('#addRessBox').on('tap', '.editBtn', function () {
		var id = $(this).parent().data('id')
		for (var i = 0; i < addRessEdit.length; i++) {
			if (addRessEdit[i].id == id) {
				localStorage.setItem('editAddRess', JSON.stringify(addRessEdit[i]))
				break
			}
		}
		location.href = 'editAddRess.html'

	})
})