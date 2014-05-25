$(document).ready(function(){
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
	console.log(apime);
	if ( apime == null || apime == 'undefined') {
		window.location.replace( 'index.html' );
	} else {
		// Main code belongs within here..
		
	}
})