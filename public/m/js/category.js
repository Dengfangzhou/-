$(function () {
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true,
		startY: 0, //初始化时滚动至y
		indicators: true, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	});
	// 页面加载 获取一级分类页面
	$.ajax({
		type: 'get',
		url: '/category/queryTopCategory',
		dataType: 'json',
		success: function (res) {
			var html = template("firstCategory", res)
			$('#firstList').html(html)
			// 获取第一个的数据
			var id = res.rows[0].id
			getData(id)
			$('#firstList').find('li').eq(0).addClass('active')


		}
	})


// 二级分类页面
	$('#firstList').on('click', 'li', function () {
		var id = $(this).attr('data-id')
		$(this).addClass('active').siblings().removeClass('active')

		getData(id)

	})

	function getData(id) {
		$.ajax({
			type: "get",
			url: "/category/querySecondCategory",
			data: {
				'id': id
			},
			dataType: "json",
			success: function (res) {
				var html = template("secondList", res)
				$('#secondListCategory').html(html)
			}
		});
	}

})