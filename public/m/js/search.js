$(function () {
	var keyArr = JSON.parse(localStorage.getItem("key") || '[]')
	if (keyArr.length > 0) {
		// var html = "";
		// for (var i = 0; i < keyArr.length; i++) {

		// 	html += '	<li class="mui-table-view-cell">' + keyArr[i] + '</li>'
		// }

		// keyArr.forEach(function (value) {
		// 	html += "	<li class='mui-table-view-cell'>" + value + "</li>"

		// })
		var html = template('ltInfo', {
			"data": keyArr
		})
		$('#ltHistory').html(html)

	}


	$('#search-btn').on('tap', function () {
		// 获取到用户输入的值
		var keyVal = $(this).siblings('input').val()
		if (keyVal.trim().length == 0) {
			return mui.alert('请输入关键字')
		}

		keyArr.push(keyVal)
		localStorage.setItem('key', JSON.stringify(keyArr))

		location.href = "search-result.html?key=" + keyVal
		$('#ltSearch').val('')
	})

	$('#ltRemove').on('click', function () {
		mui.confirm('确定要删除吗', function (bool) {
			// 确定的话bool.index == 1 取消的话 bool.index==0
			if (bool.index == 1) {
				localStorage.removeItem('key')
				$('#ltHistory').html('')
			}
		})

	})

})