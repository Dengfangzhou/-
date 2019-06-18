$(function () {
	var page = 1
	var pageSize = 10
	var total = 0

	getData()
	$('#next').on('click', function () {
		page++
		if (page > total) {
			alert('已经是最后一页了')
			return
		}

		getData()
	})
	$('#prev').on('click', function () {
		page--
		if (page = 1) {
			page = 1
			alert('已经是第一页了')
			return
		}

		getData()
	})
	// 页面加载发送的ajax封装函数
	function getData() {
		$.ajax({
			type: "get",
			url: "/category/queryTopCategoryPaging",
			data: {
				page: page,
				pageSize
			},
			dataType: "json",
			success: function (res) {
				total = Math.ceil(res.total / pageSize)
				console.log(res);
				var html = template('categoryTemp', res)
				$('#tbody').html(html)
			}
		});
	}
	// 点击添加标题



	$('#categorySave').on('click', function () {
		var categoryName = $('#categoryName').val()

		$.ajax({
			type: "post",
			url: "/category/addTopCategory",
			data: {
				categoryName
			},
			beforeSend: function () {
				if (categoryName.trim() == '') {
					alert('分类名称不能为空')
					return false
				}
			},
			dataType: "json",
			success: function (res) {
				if (res.success) {
					location.reload()
				}

			}
		});


	})
})