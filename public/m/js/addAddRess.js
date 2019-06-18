$(function () {

	var picker = new mui.PopPicker({
		layer: 3
	})
	picker.setData(cityData)

	$('#selectCity').on('tap', function () {
		picker.show(function (selectItems) {
			console.log(selectItems[0].text);
			console.log(selectItems[1].text);
			console.log(selectItems[2].text);
			$('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
		})
	})
	$('#addAddRessBtn').on('tap', function () {
		var addRessName = $('#addRessName').val()
		var postcode = $('#postcode').val()
		var selectCity = $('#selectCity').val()
		var addRess = $('#addRess').val()
		$.ajax({
			type: "post",
			url: "/address/addAddress",
			beforeSend: function () {
				if(addRessName.trim()==''){
					mui.toast('收货人不能为空')
					return false
				}
				if(postcode.trim()==''){
					mui.toast('邮编不能为空')
					return false
				}
				if(selectCity.trim()==''){
					mui.toast('地址不能为空')
					return false
				}
				if(addRess.trim()==''){
					mui.toast('详细地址不能为空')
					return false
				}
			},
			data: {
				address: selectCity,
				addressDetail: addRess,
				recipients: addRessName,
				postcode: postcode
			},
			dataType: "json",
			success: function (res) {
				if(res.success){
					mui.toast('添加成功')
					setTimeout(function(){
						location.href = 'address.html'
					},2000)
				}
			}
		});

	})
})