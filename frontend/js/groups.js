$(document).ready(function(){
	var obj = localStorage.getItem('groups');
	if (obj == null || typeof obj == 'undefined') {window.location.replace( 'index.html' );}
	else {
	var apime = JSON.parse(obj);
});