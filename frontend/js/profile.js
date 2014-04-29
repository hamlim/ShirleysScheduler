$(document).ready(function(){
	$(".cmtedit").on('click', function (e) {
		TBox(this);
	});
	
	$("#user-profile-description").on('blur', 'input', function(e) {
		RBox(this);
	});
	function TBox(obj) {
		var id = $(obj).attr("id");
		var tid = id.replace("cmt_edit_", "cmt_tedit_");
		var input = $('<input />', { 'type': 'text', 'name': 'n' + tid, 'id': tid, 'class': 'text_box', 'value': $(obj).html() });
		$(obj).parent().append(input);
		$(obj).remove();
		input.focus();
	}
	function RBox(obj) {
		var id = $(obj).attr("id");
		var tid = id.replace("cmt_tedit_", "cmt_edit_");
		var input = $('<p />', { 'id': tid, 'class': 'cmtedit', 'html': $(obj).val() });
		// uncomment when the time comes
		// apime["Person"].description = $(obj).val();
		$(obj).parent().append(input);
		$(obj).remove();
		
		$(".cmtedit").on('click', function (e) {
			TBox(this);
		});
	}
	// need to add function to add/remove groups

	// should be able to change description
	// and add / remove groups
	
	//The file has just loaded in/is loading in 
	//we need to call in the JS from the local storage DB
	
	/*
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
	console.log(apime); //apime stores all the data from the database
		
	// populate fields via jQuery accessing JSON data
	$("#user-name").text(apime["Person"].username);
	$("#user-full-name").text(apime["Person"].name);
	$("#user-email-address").text(apime["Person"].email);
	$("#user-alias-address").text(apime["Person"].aliasemail);
	$("#user-date-joined").text(new Date(apime["Person"].datejoined * 1000));
	$("#user-image").text(apime["Person"].profileimg);
	$("#user-google-profile").text(apime["Person"].googlelink);
	$("#user-profile-description").text(apime["Person"].description);
	
	// need to do groups
	for (int i = 0; i < apime["Groups"].length; i++) {
		$("#list-groups").append('<a href="#" class="list-group-item active">' + apime["Groups"][i].groupname + '</a>');
	}
		
	
	// need to add function to update description
	*/
});
