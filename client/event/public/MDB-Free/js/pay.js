function PayStack() {
    var handler = PaystackPop.setup({
		key: 'pk_test_69501c921529b50eabeb948397b310888b56fc08',
      email: 'customer@email.com',
      amount: xTotal,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: document.getElementById("txtSmartCardName").value,
                variable_name: document.getElementById("txtSmartCardName").value,
                value: document.getElementById("txtGSM").value
            }
         ]
      },
      callback: function(response){
		  document.getElementById("RefNum").value = response.reference;
		  $("#cmdPaymentSuccessful").click();
      },
      onClose: function(){
          alert('Transaction closed');
      }
    });
    handler.openIframe();
}