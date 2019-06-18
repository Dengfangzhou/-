$(function () {
	var size = null
	var productId = 0
	var number = 0
	// 获取地址栏上面的id
	var id = location.href.split('=')[1]
	$.ajax({
		type: "get",
		url: "/product/queryProductDetail",
		data: {
			id: id
		},
		dataType: "json",
		success: function (res) {
			console.log(res);
			productId = res.productId
			number = res.num
			var html = template('tempInfo', res)

			$('#detailsBox').html(html)
			var gallery = mui('.mui-slider');
			gallery.slider();
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
			mui('.mui-numbox').numbox().setOption('max', res.num)
		}

	});
	$('#detailsBox').on('tap', '.size span', function () {
		$(this).addClass('active').siblings('span').removeClass('active')
		size = $(this).html()
		console.log(size);

	})

	// 点击添加商品添加到购物车
	$('#detailsBox').on('tap', '#joinBuy', function () {
		var joinBuy = document.querySelector('#joinBuy')
		if (!size) {
			mui.alert('请选择尺码')
			return
		}
		$.ajax({
			type: "post",
			url: "/cart/addCart",
			data: {
				productId: productId,
				num: number,
				size: size
			},
			dataType: "json",
			success: function (res) {
				if (res.success) {
					mui.confirm('加入成功是否是否跳转到购物车页面', function (e) {
						if (e.index == 1) {
							location.href = 'cart.html'
						} else {
							mui.swipeoutClose(joinBuy)
						}
					})
				}
			}
		});
	})
})