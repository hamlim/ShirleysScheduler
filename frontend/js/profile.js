$(document).ready(function(){
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
		
	// populate fields via jQuery accessing JSON data
	$("#user-name2").text(apime["Person"].username);
	$("#user-full-name").text(apime["Person"].name);
	$("#user-email-address").text(apime["Person"].email);
	$("#user-alias-address").text(apime["Person"].aliasemail);
	$("#user-date-joined").text(new Date(apime["Person"].datejoined * 1000));
	$("#user-image").html('<img src="'+apime["Person"].profileimg+'" width="125px" />');
	$("#user-google-profile").text(apime["Person"].googlelink);
	$("#cmt_edit_323").text(apime["Person"].description);
	
	// need to do groups

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
		var value = $(obj).val();
		var id = $(obj).attr("id");
		var tid = id.replace("cmt_tedit_", "cmt_edit_");
		var input = $('<p />', { 'id': tid, 'class': 'cmtedit', 'html': value });
		// uncomment when the time comes
		apime["Person"]["description"] = value;
		localStorage.setItem("apime", JSON.stringify(apime));
		//now we need to push the new value to the server
		//for the api call we need the userid first:
		
		var uid = apime["Person"]["userid"];
		//now we can make the post request
		
		$.ajax({
			url: "/api/"+uid+"/settings",
			type: "POST",
			data: value,
			success: function(e){
				console.log("Success!");
			},
			error: function(xhr, e){
				console.log("Error!");
				alert("Error updating values, please try again, or email us: hamlim@outlook.com");
			}
		});
		
		$(obj).parent().append(input);
		$(obj).remove();
		
		$(".cmtedit").on('click', function (e) {
			TBox(this);
		});
	}
	
	console.log(apime.length);
	//for (var i = 0; i < apime["Groups"].length; i++) {
//		$("#list-groups").append('<a href="#" class="list-group-item">AAA</a>');
		//$("#list-groups").append('<a href="#" class="list-group-item">' + i + '</a>');
	//}
		
	// need to add function to add/remove groups

	// should be able to change description
	// and add / remove groups
	
	//The file has just loaded in/is loading in 
	//we need to call in the JS from the local storage DB
	
	
	
		
	
	// need to add function to update description
	
});
