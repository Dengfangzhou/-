$(function () {

	var picker = new mui.PopPicker({
		layer: 3
	})
	picker.setData(cityData)

	$('#formBox').on('tap', '#selectCity', function () {
		picker.show(function (selectItems) {
			console.log(selectItems[0].text);
			console.log(selectItems[1].text);
			console.log(selectItems[2].text);
			$('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
		})
	})





	var data = JSON.parse(localStorage.getItem('editAddRess'))
	var id = data.id
	var html = template('temoInfo', data)

	$('#formBox').html(html)
	console.log(html);
	$('#addAddRessBtn').on('tap', function () {
		var recipients = $('#addRessName').val()
		var postCode = $('#postcode').val()
		var address = $('#selectCity').val()
		var addressDetail = $('#addRess').val()
		$.ajax({
			type: "post",
			url: "/address/updateAddress",
			data: {
				id: id,
				address: address,
				addressDetail: addressDetail,
				recipients: recipients,
				postcode: postCode

			},
			dataType: "json",
			success: function (res) {
				console.log(res);

				if (res.success) {
					location.href = 'address.html'
				}
			}
		});
	})
})