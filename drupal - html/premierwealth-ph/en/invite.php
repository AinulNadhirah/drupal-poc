<html>
<head>
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="slider/css/owl.carousel.css">
<link rel="stylesheet" href="slider/css/owl.theme.default.css">
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script src="slider/owl.carousel.js" ></script>
<script src="js/bootstrap.js" ></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
.table th, .table td {
     padding-bottom: 0.5rem; 
     padding-top: 0.5rem; 
}
.parallax1 { 

background: rgb(249,0,193);
background: linear-gradient(90deg, rgba(249,0,193,1) 0%, rgba(143,198,254,1) 100%);
    /* Set a specific height */
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.parallax2 { 
    /* The image used */
    background-image: url("img/corporate.jpg");
    /* Set a specific height */
    height: 100px; 
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.fixed-banner{
max-width:500px;
margin:auto;
color:#FFF;
text-align:center;	
padding-top:75px;

}
#navbarColor01{
    background-color: #ffcf01 !important;
}
.navbar-light .navbar-nav .show>.nav-link{
color:#fff;
} 
.head{
color:#000;
}
.sky{
background-color:#d5f1fc;
}
h1{
text-transform:none;
}
body{
font-family:'Lato';
color:#000;
}
.w-40{
width:40%;
}
.white{
background-color:#fff;
padding:30px;
-webkit-box-shadow: 0px 0px 30px 5px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 30px 5px rgba(0,0,0,0.75);
box-shadow: 0px 0px 30px 5px rgba(0,0,0,0.75);}

table tr td{
color:#000;
}
strong {
font-weight:900;
}
</style>
	</head>
<body>

<nav class="navbar navbar-light fixed-top navbar-expand-lg opaque-navbar">
  <img id="logo" src="logo-maybank-phi.png" class="" height="30" alt="" style="margin-right:20px;">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      
</ul>
	 </form>
 
    </ul>
  </div>
</nav>

<script>
/*
  **********************************************************
  * OPAQUE NAVBAR SCRIPT
  **********************************************************
*/
  // Toggle tranparent navbar when the user scrolls the page
$(window).scroll(function() {
    if($(this).scrollTop() > 50)  /*height in pixels when the navbar becomes non opaque*/ 
    {
        $('.opaque-navbar').addClass('opaque');
		$('#logo').removeClass('d-none');
		
		console.log("added");
    } else {
        $('.opaque-navbar').removeClass('opaque');
			
    }
});
</script>
<div class="w-100" style="height:60px;"></div>
        <div class="parallax1 head"  style="padding-bottom:50px; min-height:100%;">
		<div class="container">
		<div class="row">
	<div class="col-lg-12">
		<div class="white" style="min-height:400px; text-align:center;">
		<img id="logo" src="logo-maybank-premier.png" class="" height="50" alt="" style="margin-right:20px;">
		<br />
		<br />
		<div id="valid">
		<?php 

		$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"localhost/maybank/api/premier/".$_GET['code']);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$server_output = json_decode(curl_exec ($ch),true);
curl_close ($ch);
		if($server_output['status']==0){
			?>
		<h3>Your invite code is valid</h3>
		<div>Welcome to Premier, <?php echo $server_output['name']; ?>!</div>
		</div>
			
			<?php
		}else if($server_output['status']==101){
			?>
		<div id="invalid">
		<h3>Your invite code is invalid</h3>
		<div>You have an invalid code.</div>
		</div>
			
			<?php
		}else if($server_output['status']==1){
			?>
		<div id="duplicate">
		<h3>Your invite code is already used up</h3>
		<div>Sorry <?php echo $server_output['name']; ?>. Your code has already been used up. </div>
		</div>
			
			<?php
		} 
		?>
		
		
		
		
		</div>		
		</div>
		</div>
		</div>		
		</div> 
		
		
<script>

function submitDetails(){
if(document.getElementById("cif").value==""){
document.getElementById("cif").focus();
}else{

	document.getElementById("carddelivery").innerHTML="";
document.getElementById("name").value="";
	document.getElementById("account").value="";
	document.getElementById("cardno").value="";
	document.getElementById("cif_date").value="";
	document.getElementById("account_date").value="";
	document.getElementById("type").value="";


$.ajax({
  type: "POST",
  url: "/maybank/api/callcenter/"+document.getElementById("cif").value,
  data: {},
  cache: false,
  success: function(data){
    obj=JSON.parse(data);
	console.log(obj);
	if(obj.status==101){
	document.getElementById("name").value="";
	document.getElementById("account").value="";
	document.getElementById("cardno").value="";
	document.getElementById("cif_date").value="";
	document.getElementById("account_date").value="";
	document.getElementById("type").value="";

	alert("CIF Not Found");
	}else{
	document.getElementById("name").value=obj.name;
	document.getElementById("account").value=obj.account;
	document.getElementById("cardno").value=obj.cardnumber;
	document.getElementById("cif_date").value=obj.cif_date;
	document.getElementById("account_date").value=obj.account_date;
	document.getElementById("type").value=obj.isave_type;
		document.getElementById("cardstats").style.display="none";	

	if(obj.cardabest!=null){
	document.getElementById("cardstats").style.display="";	
	delivdeets="";
	var status = "not found";
	if(obj.card_abest.status=="DEL"){
	status="Delivered";
	delivdeets="Received by: "+obj.card_abest.receive_by+"<br />Received On: "+obj.card_abest.receive_date;
	}else if(obj.card_abest.status=="RTS"){
	status="Returned to Maybank";
	delivdeets="Reason: "+obj.card_abest.return_reason+"";
	
	}else{
	status="Dispatched/For Delivery"
	}
	
	document.getElementById("carddelivery").innerHTML="Name:"+obj.card_abest.name+"<br />"+"Status : "+status+"<br />"+delivdeets;
	
	}
	if(obj.card_rts!=null){
		document.getElementById("cardstats").style.display="";	
	document.getElementById("carddelivery").innerHTML+="<br />RTS to Branch<br />Delivered via "+obj.card_rts.delivered+" to "+obj.card_rts.branch+" on "+obj.card_rts.release_date;

	}
	
	
	}
  }
});


}

}
$(document).ready(function(){
  jQuery(".owl-carousel").owlCarousel({
    loop:true,
    margin:0,
	autoplay:true,
	responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:1,
            nav:false,
            loop:true
        }
    }
});
});
</script>

</body>
</html>