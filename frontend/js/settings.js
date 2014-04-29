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
	
	//---------------------------------------------------------------------------
	//---------------------------------------------------------------------------
	//ajax request for #nickname
	//the first step is to handle click events on the buttons
	
	//---------------------------------------------------------------------------
	//---------------------------------------------------------------------------
	//ajax request for #phone-number
	//the first step is to handle click events on the buttons
	
	//---------------------------------------------------------------------------
});