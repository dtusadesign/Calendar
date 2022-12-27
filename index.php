<!DOCTYPE html>
<html>
<head>
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Calendar</title>
<link rel="stylesheet" href="css/bootstrap.css"> 
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div id="app"></div>
    <script src="js/jquery-3.5.1.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/script.js"></script>
        <style>
         #script-warning {
    display: none;
    background: #eee;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    color: red;
  }

  #loading {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .eventListing {
      margin-bottom: 7% !important;
      display: flex;
      justify-content: center;
      font-size: 70%;
  }
  
  .displayedEvents {
    display: flex;
    justify-content: left;
    margin: 0.5% 0 0.5% 0;
    font-weight: bold;
  }
  
    </style>
    <script>
/*----------------------------------------------------------------------------*/

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("end").setAttribute("min", today);
/*----------------------------------------------------------------------------*/

/* function send_to_php() {
                        $.ajax({
                            url: 'php/tested.php',
                            type: 'POST',               
                            // Form data
                            data: function(){
                                var data = new FormData();
                                data.append('eventText', $("#eventTxt").val());
                                data.append('eventDate', $("#eventDate").val());
                                data.append('eventEnd', $("#eventEnd").val());
                                
                                return data;
                            }(),
                            success: function (data) {
                                var obj = JSON.parse(data);
                                $("#eventText").val( obj.result ); 
                                $("#eventDate").val( obj.result ); 
                                $("#eventDate").val( obj.result );
                            },
                            error: function (data) {
                                console.log(data);
                            },
                            complete: function () {                 

                            },
                            cache: false,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            processData: true
                        });
                }

  function send_to_php() {
                        $.ajax({
                            url: 'js_php.php',
                            type: 'POST',               
                            // Form data
                            data: function(){
                                var data = new FormData();
                                data.append('test', $("#test").val() );     
                                return data;
                            }(),
                            success: function (data) {
                                var obj = JSON.parse(data);
                                $("#test").val( obj.result );                   
                            },
                            error: function (data) {
                                console.log(data);
                            },
                            complete: function () {                 

                            },
                            cache: false,
                            contentType: false,
                            processData: false
                        });
                } 
                
                
    //FILE: js_php.php

    $test = $_POST["test"];
    $test = "456";

    $arrResult = array(     
        'result' => $test
    );          

    print json_encode($arrResult);
    die();
?>
                
                */


</script>
<?php require('php/tested.php') ?>
</body>

</html>
