document.getElementById('makepayment').addEventListener("click", makepayment)
function makepayment(key, email, amount, ref, callback) {
	var amount = document.getElementById('select').value * 100
	var firstname = document.getElementById('firstname').value
	var surname = document.getElementById('surname').value
	var email = document.getElementById('email').value
	var phone = document.getElementById('phone').value
	var fullname = surname + " " + firstname

	var handler = PaystackPop.setup({
		key: 'pk_test_0927814c7edbb6dad98c75ef6d4cd0f774bd47c1', // This is your public key only! 
		email: email, // Customers email
		amount: amount, // The amount charged, I like big money lol
		name: fullname,
		phone:phone,
		ref:''+Math.floor((Math.random() * 1000000000) + 1), // Generate a random reference number and put here",
		metadata: { // More custom information about the transaction
		 custom_fields: [
			{
				phone:phone,
				firstname:firstname,
				surname:surname
			}
		 ]
		},
		callback: callback || function(response){
		  let div = document.getElementById('res')
		  div.innerHTML = "This was the json response reference </br />" + response.reference;
		}
		// ,
		// onClose: function(){
		//   alert('window closed');
		// }
	});
	// Payment Request Just Fired  
	handler.openIframe(); 
}
let dom = document.getElementsByTagName("button")[0];
dom.addEventListener("click", function() {
	makepayment("pk_test_0927814c7edbb6dad98c75ef6d4cd0f774bd47c1") // edit this and input your public key .. This is mine, please pay in ony big money lol
});