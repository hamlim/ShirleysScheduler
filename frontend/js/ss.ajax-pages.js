

$(function(){

	// Navigate to login page
    $('#login').click(function() {

    	// Temp redirect until user authentication w/ database occurs
    	window.location='login.html';


    	/*// Security validation for logging in
    	$.ajax({

    		// Put database connection stuff in here---python file?
    		type: 'post',
    		url: '<verify-credentials-here>.py',
    		data: {'login-name':'user', 'login-pass':'pass'},
    		dataType: 'script',
    		async: false,
    		success: function(response) {
    			// Is response string valid JSON object?
    			if (response.type == 'Error') {
    				alert("Invalid login entry!");
    			}
    		},
    		error: function(xhr, err) {
    			alert("Error connecting to the server! Please try again!");
    		}
    	}
    	});
		//*/
    	

    });
	

    // PAGE MODULES
    // Add page within a page element
    $('#container left-box').load('calendar.html');

    // Add specific element from file into a page---e.g. calendar title
    $('#container left-box').load('calendar.html #title');



});