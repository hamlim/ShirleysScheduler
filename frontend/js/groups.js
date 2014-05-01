$(document).ready(function(){
	var obj = localStorage.getItem('groups');
	if (obj == null || typeof obj == 'undefined') {window.location.replace( 'index.html' );}
	else {
		var groups = JSON.parse(obj);
		var gid = groups["Groupid"];
		var name = groups["Groupname"];
		
	}
});