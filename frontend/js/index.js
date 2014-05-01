$(document).ready(function(){
	//need to handle onclick and do the following:
	//	change window location to dashboard.html
	//  make a call to the api and retrieve the data from /api/me
	//  store the data in local storage
	//-------------------------------------
	//for TESTING only:
	var data = apime;
	var group = groups;
	localStorage.setItem("groups", JSON.stringify(group));
	localStorage.setItem("apime", JSON.stringify(data));
	// Now all pages should get the data added to local storage
	//test local storage
	var obj = localStorage.getItem("apime");
	var dat = JSON.parse(obj);
//	console.log(dat["Person"]["name"]);

	//-------------------------------------
	var login = $("#google-login");
	login.on("click", function(){
		//the user clicked login
		//ajax call to /auth/login
		$.ajax({
			url: "https://shirleys-scheduler.com/auth/login",
			type: "GET",
			success: function(toke){
				console.log("it worked");
				// now we have an invalid token
				// token is stored in data
				localStorage.setItem("token", toke["token"]);
				window.location.replace("https://shirleys-scheduler.com/auth/login_validate?token="+toke['token']);
			},
			error: function(xhr, status, error){
				console.log("AJAX error: " + error);

			}
		})
	});
	//-------------------------------------
});