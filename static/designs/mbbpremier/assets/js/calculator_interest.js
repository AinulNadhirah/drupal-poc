
/***********************/
// Base interest
/***********************/
var cutOffRate1 = 3000;
var cutOffRate2 = 47000;
var cutOffRate3 = 50000;
var interestRate1 = 0.0015;
var interestRate2 = 0.0025;
var interestRate3 = 0.0025;
//var interestRate4 = 0.0025;

/***********************/
// Bonus interest
/***********************/

var intPrd1 = 0.002;//0.002;
var intPrd2 = 0.008;//0.008;
var intPrd3 = 0.03;//0.03;
var intPrd4 = 0.035;//0.035;
var prdCutOff1 = 150000.01;
var prdCutOff2 = 150000;

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

$( document ).ready(function() {
    calculateInterest();
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


function calculateInterest()
 {

    aBalanceVal = $('#acc_bal').val();

    //$('#slide_value').text(addCommas(aBalanceVal));
    $('#slide_value').text(addCommas(aBalanceVal));

    /*** Calculate base interest - start ***/

    var baseInt1 = 0;
    var baseInt2 = 0;
    var baseInt3 = 0;

    if(aBalanceVal >= cutOffRate1) {
      baseInt1 = (cutOffRate1 * interestRate1);
    } else {
      baseInt1 = (aBalanceVal * interestRate1);
    }

    var balRat2 = aBalanceVal - cutOffRate1;
    if(balRat2 >= cutOffRate2) {
      baseInt2 = (cutOffRate2 * interestRate2);
    } else if (balRat2 > 0) {
      baseInt2 = (balRat2 * interestRate2);
    } else {
      baseInt2 = 0;
    }

    if(aBalanceVal > cutOffRate3) {
      baseInt3 = (aBalanceVal-cutOffRate3) * interestRate3;
    }  else {
      baseInt3 = 0;
    }

    baseInt = (baseInt1 + baseInt2 + baseInt3)/12;

    if (removeDecimal) {
        var eVal = baseInt.toString().split('.');
        baseInt = eVal[0];
    }

    /*** Calculate base interest - end ***/

    /*** Calculate Bonus interest - start ***/

    aProductsVal = $('input[name=products]:checked').val();


    if (typeof aProductsVal !== 'undefined' && aProductsVal !== '' && aProductsVal !== null) {

        if (aProductsVal.toLowerCase() == 'product1') {

            aProductsVal = intPrd1;


        } else if (aProductsVal.toLowerCase() == 'product2') {

            aProductsVal = intPrd2;

        } else if (aProductsVal.toLowerCase() == 'product3') {

            aProductsVal = intPrd3;
        } else if (aProductsVal.toLowerCase() == 'product4') {

            aProductsVal = intPrd4;

        } else {

            aProductsVal = intPrd1;
        }

        if (aBalanceVal < prdCutOff1) {

            bonusInt = aBalanceVal * aProductsVal/12;

        } else {

            bonusInt = prdCutOff2 *  aProductsVal/12;
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
