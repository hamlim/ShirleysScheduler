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

	$("#edit-description").on('click', function (e) {
		e.preventDefault();
		TBox(".cmtedit");
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
		
		apime["Person"]["description"] = value;
		localStorage.setItem("apime", JSON.stringify(apime));
		
		console.log(JSON.stringify(apime));
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
			e.preventDefault();
			TBox(this);
		});
	}
		
	for (var i = 0; i < apime["Groups"].length; i++) {
		var img = '<img class="deletegroup" src="images/icons/png/delete.png" width="15" id="'+i+'" />';
		$("#list-groups").append('<p class="list-group-item"><a href="#">'+img+'</a>'+ apime["Groups"][i].groupname+ '</p>');
	} 
	
	
	$(".deletegroup").click (function(name, e) {
		
		var x = "";
		var r=confirm("Do you really want to delete the group though?!");
		if (r==true) {
			x="OK group has been deleted!";
			var index = parseInt($(this).attr('id'));
			apime["Groups"].splice(index, 1);
			localStorage.setItem("apime", JSON.stringify(apime));
			
			console.log(JSON.stringify(apime));
			//now we need to push the new value to the server
			//for the api call we need the userid first:
			
			var uid = apime["Person"]["userid"];
			//now we can make the post request
			
			$.ajax({
				url: "/api/"+uid+"/settings",
				type: "POST",
				data: apime["Groups"],
				success: function(e){
					console.log("Success!");
				},
				error: function(xhr, e){
					console.log("Error!");
					alert("Error updating values, please try again, or email us: hamlim@outlook.com");
				}
		});
		}
		$("#notification").text(x);
	});
	
	$("#addgroupbtn").click (function(e) {
		e.preventDefault();
		$('#addgroup').show();
	});
	
	$("#submitgroup").click (function(e) {
		e.preventDefault();
		//alert("howdy");
		// Get invitees into an object
		var invitees = new Array();
		$("span.tag").each(function() {
			invitees.push($(this).text());
		});
	});
	
	function checkEmail(test) {
		var testthis = test.slice(-10);
		if (testthis == "@gmail.com") return true;
		else return false;
	}
	
  		// Adding invitees to meeting
  	$("#tags input").on("focusout", function() {    
		var txt= this.value.replace(/[^a-zA-Z0-9\.\@]/g,""); // Allowed characters list
		
		if(txt && checkEmail(txt)) {
				$(this).before("<span class='tag'>"+ txt +"</span>");
		}
  	    this.value="";
  	}).on('keyup',function( e ) {
		if(/(188|13)/.test(e.which)) { 
			$(this).focusout(); 
		} // On comma or enter
  	});

  	// Deleting invitees that were added
  	$("#tags").on("click",".tag",function(){
  	  if( confirm("Delete tag?") ) $(this).remove(); 
  	});
	
			
	// need to add function to add/remove groups
	
	//The file has just loaded in/is loading in 
	//we need to call in the JS from the local storage DB
		
	// need to add function to update description
	
});