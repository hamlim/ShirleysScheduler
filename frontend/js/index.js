$(document).ready(function(){
	//need to handle onclick and do the following:
	//	change window location to dashboard.html
	//  make a call to the api and retrieve the data from /api/me
	//  store the data in local storage
	//-------------------------------------
	localStorage.clear();
	// We clear the local storage so that the user will have to login again
	// This is simply so we don't worry about non-up-to-date information

	//-------------------------------------
	var login = $("#google-login");
	login.on("click", function(){
		//the user clicked login
		//ajax call to /auth/login
		var drequest = $.ajax({
			url: "https://shirleys-scheduler.com/auth/login", //this will go to Albert's API
			type: "GET",
			dataType: "JSON" //this is important or else we won't be able to read in token
		});
		drequest.done(function(toke){
			// now we have an invalid token
			// token is stored in data
			//toke is the name of the JSON storing the token association
			localStorage.setItem("token", JSON.stringify(toke)); //we commit this to local storage
			document.cookie = "token="+toke["token"];
			console.log(toke); //for some error checking
			window.location.replace("https://shirleys-scheduler.com/auth/login_validate?token="+toke["token"]); // now we pass that token on to be validated by the server
		});
		drequest.fail(function(xhr, status, error){
			console.log("AJAX error: " + error);
			console.log("status: " + status);

		});
	});
	//-------------------------------------
});