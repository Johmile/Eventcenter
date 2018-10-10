$(document).ready(function(){
    $("#butts").click(function () {
          //var name = $('#').val(); // get the value of the input field
          var error0 = false;
         // if (name == "" || name == " ") {
              $('#main').show(1500);
              $('#main').delay(3000);
              $('#main').animate({
                  height: 'toggle'
              }, 700, function () {
                  // Animation complete.
              });
              error0 = true; // change the error state to true
          //}
          
          var name = $('#txtSmartCardNo').val(); // get the value of the input field
          var error1 = false;
          if (name == "" || name == " ") {
              $('#err-name').show(500);
              $('#err-name').delay(2000);
              $('#err-name').animate({
                  height: 'toggle'
              }, 500, function () {
                  // Animation complete.
              });
              error1 = true; // change the error state to true
          }
          
          var name = $('#txtSmartCardName').val(); // get the value of the input field
          var error2 = false;
          if (name == "" || name == " ") {
              $('#err-SName').show(500);
              $('#err-SName').delay(2000);
              $('#err-SName').animate({
                  height: 'toggle'
              }, 500, function () {
                  // Animation complete.
              });
              error2 = true; // change the error state to true
          }
          
          var name = $('#txtGSM').val(); // get the value of the input field
          var error3 = false;
          if (name == "" || name == " ") {
              $('#err-GSM').show(500);
              $('#err-GSM').delay(2000);
              $('#err-GSM').animate({
                  height: 'toggle'
              }, 500, function () {
                  // Animation complete.
              });
              error3 = true; // change the error state to true
          }
          
          var name = $('#txtSmartCardNo').val(); // get the value of the input field
          var error4 = false;
          if ((name.length != 11) && (name !="")) {
              $('#err-Card').show(500);
              $('#err-Card').delay(2000);
              $('#err-Card').animate({
                  height: 'toggle'
              }, 500, function () {
                  // Animation complete.
              });
              error4 = true; // change the error state to true
            }
            
          var name = $('#txtGSM').val(); // get the value of the input field
          var error5 = false;
          if ((name.length != 11) && (name !="")) {
              $('#err-GSM2').show(500);
              $('#err-GSM2').delay(2000);
              $('#err-GSM2').animate({
                  height: 'toggle'
              }, 500, function () {
                  // Animation complete.
              });
              error5 = true; // change the error state to true
            }
            
          if ((error0 == false) && (error1 == false) && (error2 == false) && (error3 == false) && (error4 == false) && (error5 == false)){
              if(document.getElementById("GType").value == "Nova"){
                  var amountX = 900; 
                  var SC = (amountX * 0.015) + 35;
                  var xTotal = amountX + SC;
                  $('div#divBauquet').text('Nova');
                  $('div#divAmount').text(amountX.toFixed(2));
                  $('div#divSC').text(SC.toFixed(2));
                  $('div#divTotal').text(xTotal.toFixed(2));
                  $(".divSCharge").show("slow");
              }
              
              if(document.getElementById("GType").value == "Basic"){
                  var amountX = 1300; 
                  var SC = (amountX * 0.015) + 35;
                  var xTotal = amountX + SC;
                  $('div#divBauquet').text('Basic');
                  $('div#divAmount').text(amountX.toFixed(2));
                  $('div#divSC').text(SC.toFixed(2));
                  $('div#divTotal').text(xTotal.toFixed(2));
                  $(".divSCharge").show("slow");
              }
              
              if(document.getElementById("GType").value == "Classic"){
                  var amountX = 2600; 
                  var SC = (amountX * 0.015) + 135;
                  var xTotal = amountX + SC;
                  $('div#divBauquet').text('Classic');
                  $('div#divAmount').text(amountX.toFixed(2));
                  $('div#divSC').text(SC.toFixed(2));
                  $('div#divTotal').text(xTotal.toFixed(2));
                  $(".divSCharge").show("slow");
              }
              
              if(document.getElementById("GType").value == "Unique"){
                  var amountX = 3800; 
                  var SC = (amountX * 0.015) + 135;
                  var xTotal = amountX + SC;
                  $('div#divBauquet').text('Unique');
                  $('div#divAmount').text(amountX.toFixed(2));
                  $('div#divSC').text(SC.toFixed(2));
                  $('div#divTotal').text(xTotal.toFixed(2));
                  $(".divSCharge").show("slow");
              }
              
              
              
              if(document.getElementById("GType").value == "Smart"){
                  var amountX = 1900; 
                  var SC = (amountX * 0.015) + 35;
                  var xTotal = amountX + SC;
                  $('div#divBauquet').text('Smart');
                  $('div#divAmount').text(amountX.toFixed(2));
                  $('div#divSC').text(SC.toFixed(2));
                  $('div#divTotal').text(xTotal.toFixed(2));
                  $(".divSCharge").show("slow");
              }
              
              if(document.getElementById("GType").value == "Super"){
                  var amountX = 3800; 
                  var SC = (amountX * 0.015) + 135;
                  var xTotal = amountX + SC;
                  $('div#divBauquet').text('Supper');
                  $('div#divAmount').text(amountX.toFixed(2));
                  $('div#divSC').text(SC.toFixed(2));
                  $('div#divTotal').text(xTotal.toFixed(2));
                  $(".divSCharge").show("slow");
              }
           }
          
      });
    
        $("#imgClose").click(function () {
        $(".divSCharge").hide("slow");					
      });
      
      $("#divMPayment").click(function () {
            $("#cmdMakePayment").click();					
      });
    
   });