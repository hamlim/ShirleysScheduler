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
	var aliasem = $("#alias-email");
	var nick = $("#nickname");
	var phonenum = $("#phone-number");
  // ajax request for #alias-email
	function alias(){
		var email = aliasem.val();
		//email is the input email
		//we need to ajax it to the server
		alert(email);
	};
	//ajax request for #nickname
	function name(){
		var name = nick.value;
		//we need to ajax this data to the server
		
	};
	//ajax request for #phone-number
	function phone(){
		var num = phonenum.value;
		//ajax this to the server
		
	};
});