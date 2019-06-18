$(function () {


	var page = 1
	var pageSize = 10
	var total = 0

	getData()
	$('#nextBtn').on('click', function () {
		page++
		if (page > total) {
			alert('已经是最后一页了')
			return
		}

		getData()
	})
	$('#prevBtn').on('click', function () {
		page--
		if (page = 1) {
			page = 1
			alert('已经是第一页了')
			return
		}

		getData()
	})

	function getData() {
		$.ajax({
			type: "get",
			url: " /category/querySecondCategoryPaging",
			data: {
				page: page,
				pageSize: pageSize
			},
			dataType: "json",
			success: function (res) {
				console.log(res);
				total = Math.ceil(res.total / pageSize)
				var html = template('secondTemp', res)
				$("#tbody").html(html)
			}
		});
	}


	//获取一级分类中的数据 
	$.ajax({
		type: "get",
		url: "/category/queryTopCategoryPaging",
		data: {
			page: 1,
			pageSize: 100
		},
		dataType: "json",
		success: function (res) {
			console.log(res);

			var html = template('categoryFirst', res)
			$('#categoryList').html(html)
		}
	})
	var brandLogo = ""
	console.log(brandLogo);

	$('#fileUpload').fileupload({
		dataType: 'json',
		done: function (e, data) {
			console.log(data.result.picAddr);
			$('.img-thumbnail').attr('src', data.result.picAddr)
			brandLogo = data.result.picAddr
		}
	})
	$('#save').on('click', function () {
		var brandName = $('#cateName').val()
		var categoryId = $('#categoryList').val()


		$.ajax({
			type: "post",
			url: "/category/addSecondCategory",
			data: {
				brandName: brandName,
				categoryId: categoryId,
				brandLogo: brandLogo,
				hot: 0
			},
			dataType: "json",
			beforeSend: function () {
				if (brandName.trim() == '') {
					alert("不能为空")
					return false
				}

				if (brandLogo.trim() == '') {
					alert("不能为空")
					return false
				}
			},
			success: function (res) {
				if (res.success) {
					location.reload()
				}
			}
		});
	})
})