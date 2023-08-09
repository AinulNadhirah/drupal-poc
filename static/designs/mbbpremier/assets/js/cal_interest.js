
/***********************/
// Base interest 
/***********************/
var cutOffRate1 = 3000;
var cutOffRate2 = 47000;
var cutOffRate3 = 50000;
var interestRate1 = 0.0015;
var interestRate2 = 0.0025;
var interestRate3 = 0.0025;


/***********************/
// Bonus interest 
/***********************/

var intPrd1 = 0.008;
var intPrd2 = 0.015;
var intPrd3 = 0.0325;
var intPrd4 = 0.04;
var intPrd5 = 0.01;
var intPrd6 = 0.015;
var intPrd7 = 0.0375;
var intPrd8 = 0.045; 
var intPrd9 = 0.015;
var intPrd10 = 0.02;
var intPrd11 = 0.04;
var intPrd12 = 0.0775; 
var prdCutOff1 = 150000.01;
var prdCutOff2 = 150000;
var prdCutOff3 = 175000;
var prdCutOff4 = 175000.01;
var prdCutOff5 = 200000;
var prdCutOff6 = 200000.01;
var prdCutOff7 = 25000

/**********************************/
// initialize the global variables
/**********************************/
var baseInt;
var bonusInt;
var aBalanceVal;
var aProductsVal;
 var bonusIntAmt;
var removeDecimal = false;
var dolSymbol = 'S$';
var restrictTo = 2;


    
$("[data-slider]")
    .each(function () {
        var input = $(this);
        $("<span>")
        .addClass("output")
        .insertAfter($(this));
    })
    .bind("slider:ready slider:changed", function (event, data) {
        var eVaLue = data.value.toFixed(0);
        eVaLue = eVaLue.replace(/[^0-9]+/g, '');

        $(this)
        .nextAll(".output:first")
            .html(dolSymbol + eVaLue);
        calculateInterest(); //call function to calculate Interest
    });

$('#Products').click(function () {   
    calculateInterest(); //call function to calculate Interest
});

function CustomDecmialPoints(num, val) {
    if (num != Math.floor(num)) {
        var eVal1 = num.toString().split('.');
        if (eVal1[1].length > 1) {
            num = num.toFixed(val);
        }
       
    }
    return num;
}
function addCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}








function calculateInterest() {     
   aBalanceVal = $('#acc_bal').val();
    //$('#slide_value').text(addCommas(aBalanceVal));
    $('#slide_value').text(addCommas(aBalanceVal));

    /*** Calculate base interest - start ***/

    if (aBalanceVal < cutOffRate1) {
        baseInt = aBalanceVal * (interestRate1);
        //alert(baseInt);
    } else if (aBalanceVal <= cutOffRate3) {
        var cVal1 = cutOffRate1 * (interestRate1);
        var cVal2 = (aBalanceVal - cutOffRate1) * (interestRate2);
        baseInt = (+cVal1) + (+cVal2);
    } else if (aBalanceVal > cutOffRate3) {
        var cVal1 = cutOffRate1 * (interestRate1);
        var cVal2 = (cutOffRate2) * (interestRate2);
        var cVal3 = (aBalanceVal - cutOffRate3) * (interestRate3);
        baseInt = (+cVal1) + (+cVal2) + (+cVal3);
    }    

    if (removeDecimal) {        
        var eVal = baseInt.toString().split('.');
        baseInt = eVal[0];        
    }


    /*** Calculate base interest - end ***/

    /*** Calculate Bonus interest - start ***/

    aProductsVal = $('input[name=products]:checked').val();


    if (typeof aProductsVal !== 'undefined' && aProductsVal !== '' && aProductsVal !== null) {


        if (aProductsVal.toLowerCase() == 'product1' && aBalanceVal < prdCutOff1  ) {

            aProductsVal = intPrd1;
           

        } else if (aProductsVal.toLowerCase() == 'product2' && aBalanceVal < prdCutOff1) {

            aProductsVal = intPrd2;
           
        } else if (aProductsVal.toLowerCase() == 'product3' && aBalanceVal < prdCutOff1) {

            aProductsVal = intPrd3;
        } else if (aProductsVal.toLowerCase() == 'product4' && aBalanceVal < prdCutOff1)  {

            aProductsVal = intPrd4;
               
        } else if (aProductsVal.toLowerCase() == 'product1' && aBalanceVal > prdCutOff2 && aBalanceVal < prdCutOff4) {

            aProductsVal = intPrd1;
			var cVal4 = intPrd5;
		
           

        } else if (aProductsVal.toLowerCase() == 'product2' && aBalanceVal > prdCutOff2 && aBalanceVal < prdCutOff4) {
            aProductsVal = intPrd2;
			var cVal4 = intPrd6;
		
           
        } else if (aProductsVal.toLowerCase() == 'product3' && aBalanceVal > prdCutOff2 && aBalanceVal < prdCutOff4) {
            aProductsVal = intPrd3;
			var cVal4 = intPrd7;
		
			
        } else if (aProductsVal.toLowerCase() == 'product4' && aBalanceVal > prdCutOff2 && aBalanceVal < prdCutOff4)  {
            aProductsVal = intPrd4;
			var cVal4 = intPrd8;
	
               
		
		} else if (aProductsVal.toLowerCase() == 'product1' && aBalanceVal > prdCutOff4) {

            aProductsVal = intPrd1;
			var cVal4 = intPrd5;
			var cVal5 = intPrd9;
           

        } else if (aProductsVal.toLowerCase() == 'product2' && aBalanceVal > prdCutOff4) {
            aProductsVal = intPrd2;
			var cVal4 = intPrd6;
			var cVal5 = intPrd10;
           
        } else if (aProductsVal.toLowerCase() == 'product3' && aBalanceVal > prdCutOff4) {
            aProductsVal = intPrd3;
			var cVal4 = intPrd7;
			var cVal5 = intPrd11;
			
        } else if (aProductsVal.toLowerCase() == 'product4' && aBalanceVal > prdCutOff4)  {
            aProductsVal = intPrd4;
			var cVal4 = intPrd8;
			var cVal5 = intPrd12;
               
        }
		
		
		else {

            aProductsVal = intPrd1;
        }

        if (aBalanceVal < prdCutOff1) {

            bonusInt = aBalanceVal * aProductsVal;

        } 
		else if (aBalanceVal > prdCutOff1 && aBalanceVal < prdCutOff4) {

            var cVal6  = prdCutOff2 * (aProductsVal);
			var cVal7  = (aBalanceVal - prdCutOff2) * (+cVal4);
			bonusInt = (+cVal6) + (+cVal7) 

        } 
		
		else {

            var cVal8  = prdCutOff2 * (aProductsVal);
			var cVal9  = prdCutOff7 * (+cVal4);
			var cVal10  = (aBalanceVal - prdCutOff3) * (+cVal5);
			bonusInt = (+cVal8) + (+cVal9) + (+cVal10) 
        }       

        if (removeDecimal) {

            var eVal1 = bonusInt.toString().split('.');
            bonusInt = eVal1[0];
        }
    } else {

        aProductsVal = 0;
        bonusInt = aProductsVal;
    }

    /*** Calculate Bonus interest - end ***/

   //Calculate total interest
    var totalInt = (+baseInt) + (+bonusInt);
    
    //round off the values to respective decimal points  
    if (!removeDecimal) {

        baseInt = CustomDecmialPoints(baseInt, restrictTo);
        bonusInt = CustomDecmialPoints(bonusInt, restrictTo);
        totalInt = CustomDecmialPoints(totalInt, restrictTo);
    }
   //console.log(bonusInt);
    //bonusIntAmt = bonusInt.toFixed(2);
    bonusIntAmt = parseFloat(bonusInt).toFixed(2);

    //add dollar symbol
    baseInt = dolSymbol + baseInt;
    bonusInt1 = dolSymbol + bonusIntAmt;
    totalInt = dolSymbol + totalInt;

    //Append the values to html
    $('#base_int span').text(baseInt);
    $('#bonus_int span').text(bonusInt1);
    $('#total_int span').text(totalInt);
}



