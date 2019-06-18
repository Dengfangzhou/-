$(function () {
	$('#fileupload').fileupload({
		dataType: 'json',
		done: function (e, data) {
			console.log(data);
			
			var img = new Image()
			img.src = data.result.picAddr
			$('.help-block').append(img)
		}
	});
})