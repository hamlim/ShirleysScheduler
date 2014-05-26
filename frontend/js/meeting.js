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
		var dropboxTreeHead = $("#dropbox");
		
		
		// The following segment will tackle the Dropbox API
		//we want to allow users to share files: Chooser API
		// we want to save those files to local storage
		//   we want to save both the direct and indirect links
		//we want to allow users to save files: Saver API
		// we will pull the links from localStorage
		// CHOOSER API
		var options = {
			success: function(file){
				console.log(file.link);
				// Here we want to save the link to local storage
				var dropfiles = {
					"links": {
						"previewLink": file.link,
						"fileName": file.name
					}
				};
				localStorage.setItem('dropfiles', JSON.stringify(dropfiles));
			},
			cancel: function() {
				console.log("User cancled file upload");
			},
			linkType: "preview",
			multiselect: false,
			extensions: ['video','images', 'audio', 'documents', 'text'],
		};
		var button = Dropbox.createChooseButton(options);
		document.getElementById("#chooser").appendChild(button);
		
		// SAVER API
		var objstring = localStorage.getItem('dropfiles');
		var droplinkobj = JSON.parse(objstring);
		var droplink = 
		var saverLink = "<a class='dropbox-saver' href='"+
		
	}
});