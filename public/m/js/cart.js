$(function () {

	$.ajax({
		type: "get",
		url: "/cart/queryCart",
		success: function (res) {
			console.log(res);
			
		}
	});


})