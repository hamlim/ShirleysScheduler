$(document).ready(function(){
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
	console.log(apime);
	if ( apime == null || apime == 'undefined') {
		window.location.replace( 'index.html' );
	} else {
		// Main code belongs within here..
		//we want to create pointers to the things we will want to change
		var titleelem = $('title');
		var meetingnameelem = $('#meeting-name');
		var meetingtimeelem = $('#meeting-time');
		var peoplegoingelem = $('#p-going');
		var peoplenotgoingelem = $('#not-p-going');
		var meetinglocationelem = $('#meeting-location');
		var groupnameelem = $("#group-name");
		var documentlistelem = $("#document-list");
		// the three following selctors are used for the three different API's
		var trelloTreeHead = $("#todo-list");
		var evernoteTreeHead = $("#meeting-notes");
		var googleDriveTreeHead = $("#documents");
		
	}
});