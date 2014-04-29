$(document).ready(function(){
	// should be able to change description
	// and add / remove groups
	
	//The file has just loaded in/is loading in 
	//we need to call in the JS from the local storage DB
	
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
	console.log(apime); //apime stores all the data from the database
		
	// populate fields via jQuery accessing JSON data
	$("#user-name").text(apime["Person"].username);
	$("#user-full-name").text(apime["Person"].name);
	$("#user-email-address").text(apime["Person"].email);
	$("#user-alias-address").text(apime["Person"].aliasemail);
	$("#user-date-joined").text(apime["Person"].datejoined * 1000);
	$("#user-image").text(apime["Person"].profileimg);
	$("#user-google-profile").text(apime["Person"].googlelink);
	$("#user-profile-description").text(apime["Person"].description);
	
	// need to do groups
	
});
