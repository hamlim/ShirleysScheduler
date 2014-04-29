$(document).ready(function(){
	//we need to pull in the data from the input fields and then on a button/enter ajax the data to the server
	/* 
		ID's we need to watch:
			#alias-email
				user enters an alias email 
			#nickname
				user enters a username/name
			#phone-number
				user enters a phone Number
				
			All of these values are additional things that can be stored in with the Person section of the api/me return values
	*/
	//create pointers to each element we want to track
	
	var aliasem = $("#alias-email");
	var aliasbtn = $("#email-btn");
	var nick = $("#nickname");
	var nickbtn = $("#name-btn");
	var phonenum = $("#phone-number");
	var phonebtn = $("#phone-btn");
	//---------------------------------------------------------------------------
  // ajax request for #alias-email
	//the first step is to handle click events on the buttons
	aliasbtn.on("click", function(){
		//need to check if there is input
		var val = aliasem.val();
		if (val != null || val != ""){
			console.log(val);
			//now we need to push this data to the server and update the local storage
			//first the local storage
			var obj = localStorage.getItem("apime");
			var me = JSON.parse(obj);
			me["Person"]["aliasemail"] = val;
			localStorage.setItem("apime", JSON.stringify(me));
			//now we need to push the new value to the server
			//for the api call we need the userid first:
			var uid = me["Person"]["userid"];
			//now we can make the post request
			$.ajax({
				url: "/api/"+uid+"/settings",
				type: "POST",
				data: JSON.parse(val),
				success: function(e){
					console.log("Success!");
				},
				error: function(xhr, e){
					console.log("Error!");
					alert("Error updating values, please try again, or email us: hamlim@outlook.com");
				}
			});
		} else {
			// TODO: handle no input in form field
			
		};
	});
	//---------------------------------------------------------------------------
	//---------------------------------------------------------------------------
	//ajax request for #nickname
	//the first step is to handle click events on the buttons
	nickbtn.on("click", function(){
		//need to check for input
		var val = nick.val();
		if (val != null || val != ""){
			console.log(val);
			//now we need to push this data to the server and update the local storage
			//first the local storage
			var obj = localStorage.getItem("apime");
			var me = JSON.parse(obj);
			me["Person"]["username"] = val;
			localStorage.setItem("apime", JSON.stringify(me));
			//now we need to push the new value to the server
			//for the api call we need the userid first:
			var uid = me["Person"]["userid"];
			//now we can make the post request
			$.ajax({
				url: "/api/"+uid+"/settings",
				type: "POST",
				data: JSON.parse(val),
				success: function(e){
					console.log("Success!");
				},
				error: function(xhr, e){
					console.log("Error!");
					alert("Error updating values, please try again, or email us: hamlim@outlook.com");
				}
			});
		} else {
			// TODO: handle no input in form field
			
		};
	});
	//---------------------------------------------------------------------------
	//---------------------------------------------------------------------------
	//ajax request for #phone-number
	//the first step is to handle click events on the buttons
	phonebtn.on("click", function(){
		//need to check for true input:
		var val  = phonenum.val();
		if (val != null || val != ""){
			console.log(val);
			//now we need to push this data to the server and update the local storage
			//first the local storage
			var obj = localStorage.getItem("apime");
			var me = JSON.parse(obj);
			me["Person"]["phonenumber"] = val;
			localStorage.setItem("apime", JSON.stringify(me));
			//now we need to push the new value to the server
			//for the api call we need the userid first:
			var uid = me["Person"]["userid"];
			//now we can make the post request
			$.ajax({
				url: "/api/"+uid+"/settings",
				type: "POST",
				data: JSON.parse(val),
				success: function(e){
					console.log("Success!");
				},
				error: function(xhr, e){
					console.log("Error!");
					alert("Error updating values, please try again, or email us: hamlim@outlook.com");
				}
			});
		} else {
			// TODO: handle no input in form field
			
		};
	});
	//---------------------------------------------------------------------------
});