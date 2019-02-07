// * Objective 1 Set focus on the first text field * //
$('#name').focus();

// * Objective 2 ”Job Role” section of the form * //    
    // = other-title entered into HTML and hiddle unless Other is selected
    $('#other-title').hide();

    $('div #title').on('change', function() {
        const value = $(this).val();
        if(value === 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });

// * Objective 3 ”T-Shirt Info” section of the form * //
// Shirt color
const $tshirtColor = $("#colors-js-puns");
const $jsPuns = $("#color option:contains('Puns')");
const $heart = $("#color option:contains('(I')");

$tshirtColor.hide();

const dropDownBox = ($optionOne, $optionTwo) => {
    $tshirtColor.show();
    $optionOne.hide();
    $optionTwo.show();
    $optionTwo.first().attr('selected', 'selected');
    $optionOne.first().attr('selected',false);
};

$('#design').on('change', function() {
    const color = $(this).val();
    if(color === 'js puns') {
        dropDownBox($heart, $jsPuns);
    } else if (color === 'heart js') {
        dropDownBox($jsPuns, $heart);
    } else if (color === 'select theme') {
        $('#colors-js-puns').hide();
    }
});

// * Objective 4 ”Register for Activities” section of the form * //

// Activity var
const $activity = $('.activites');
const $activityInput = $('.activities input');
let total = 0;

// fuctions for avaliable/ not avaliable

const activityNotAvailabile = (activity) => {
    const $notAvailability = $(`input[name=${activity}]`);
    $notAvailability.prop('disabled', true);
    $notAvailability.parent().css({'text-decoration': 'line-through', 'color': '#D2D2D2'})
}

const activityAvailabile = (activity) => {
    const $activityAvailable = $(`input[name=${activity}]`);
    $activityAvailable.prop('disabled', false);
    $activityAvailable.parent().css({'text-decoration': 'none', 'color': '#000'});
}

$activityInput.on('change', function(e){
    const cost = (parseInt($(this).parent().text().slice(-3)));
    if(this.checked){
        total += cost;
        switch(this.name){
            case "js-frameworks":
            activityNotAvailabile("express");
                break;
            case "js-libs":
            activityNotAvailabile("node");
                break;
            case "express":
            activityNotAvailabile("js-frameworks");
                break;
            case "node":
            activityNotAvailabile("js-libs");
                break;
        }
    } else {
        total -= cost;
        switch (this.name) {
            case "js-frameworks":
            activityAvailabile("express");
                break;
            case "js-libs":
            activityAvailabile("node");
                break;
            case "express":
            activityAvailabile("js-frameworks");
                break;
            case "node":
            activityAvailabile("js-libs");
                break;

        }
    }
    const $totalPrint = $('<h3 class="total">Your Registration Total: $'+ total +'</h3>');
    // Remove legacy total
    if($('.total').length) {
        $('.total').remove();
    }
    // Append the total
    $('.activities').append($totalPrint);
});


// * Objective 5 Payment Info section of the form * //
// hide select payment method option from the dropdown since credit card is the default option
$('#payment option[value="select_method"]').hide();
$('#payment option[value="credit card"]').attr('selected', '');

// adding ID's paypal and bitcoin to respective divs
const paypal = $('#credit-card').next();
const bitcoin = $('#credit-card').next().next();

// also hide the Paypal and Bitcoin payment options since Credit card is the default selection.
// also create variable with function that will display the selected option and hide the rest
paypal.hide();
bitcoin.hide();

const newPayment = function(paymentSelected) {
    $('#credit-card').hide();
    $(paypal).hide();
    $(bitcoin).hide();
    $(paymentSelected).show();
  }

// function with switch statement to display the correct info based on user selection
  $('#payment').on('change', function() {
    switch ($('#payment').val()) {
      case 'credit card':
        newPayment($('#credit-card'));
        break;
      case 'paypal':
        newPayment(paypal);
        break;
      case 'bitcoin':
        newPayment(bitcoin);
        break;
    }
  });


// * Objective 6 Form validation and messages * //

// name and email validation
function name() {
    let nameVal = /[a-z]+/i.test($('#name').val()); 
    if (nameVal) {
        $('#name').css('border', '2px solid green');
        $('#name').prev().text("Name:").show();
        $('#name').prev().css('color', 'black');
        return true;
    } else {
        $('#name').css('border', '2px solid red');
        $('#name').attr('placeholder', "Please enter your name.");
        $('#name').prev().text("Name: \(Name must be entered\)").show();
        $('#name').prev().css('color', 'red');
        return false;
    }
}
$('#name').on('input', name);

function email() {
	let emailVal = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val());
	if (emailVal) {
        $('#mail').css('border', '2px solid green');
        $('#mail').prev().text("Email:").show();
        $('#mail').prev().css('color', 'black');
        return true;
    } else {
        $('#mail').css('border', '2px solid red');
        $('#mail').attr('placeholder', "Please enter a valid email address.")
        $('#mail').prev().text("Email: \(Email must be entered in the correct format\)").show();
        $('#mail').prev().css('color', 'red');
        return false;
    }
}
$('#mail').on('input', email);


// require at least one checkbox to be checked
function oneCheck () {
    if ($('input:checkbox:checked').length > 0) {
        $('.activities legend').css('color', 'black');
        $('.activities legend').text('Register for Activities');
        return true;
    } else {
        $('.activities legend').css('color', 'red');
        $('.activities legend').text('Register for Activities - please select at least 1 activity from the list');
        return false;
    }
}
$('.activities').change(oneCheck);


// Credit card: make sure each option in credit card is entered or selected

// cc number
function ccNumber () {
    if ($('#payment option:selected').val() === 'credit card') {
        let ccVal = /^\d{13,16}$/.test($('#cc-num').val());
        if (ccVal === false) {
            $('#cc-num').prev().css('color', 'red').css('font-size', '.8em');
            $('#cc-num').prev().text("Card Number: - Please enter a credit card number that is between 13 and 16 digits long").show();
            if ($('#cc-num').val() === '') {
                $('#cc-num').prev().text("Card Number: - Please enter your card number").show();
            }
            return false;
        } else {
            $('#cc-num').prev().text('Card Number:');
            $('#cc-num').prev().css('color', 'black').css('font-size', 'initial');
            return true;
        }
    }
}
$('#cc-num').on('input', ccNumber);

// zip code
function zipCode () {
    let needZip = /^\d{5}$/.test($('#zip').val());
    if (needZip === false) {
        $('#zip').prev().css('color', 'red').css('font-size', '.8em');
        $('#zip').prev().text("Zip Code: - Your zip code must be 5 digits long.").show();
        if ($('#zip').val() === '') {
            $('#zip').prev().text("Zip Code: - Please enter your zip code").show();
        } 
        return false;
    } else {
        $('#zip').prev().text('Zip Code:');
        $('#zip').prev().css('color', 'black').css('font-size', 'initial');
        return true;
    }
}
$('#zip').on('input', zipCode);

// cvv code 
function cvvCode () {
    let needCVV = /^\d{3}$/.test($('#cvv').val());
    if (needCVV === false) {
        $('#cvv').prev().css('color', 'red').css('font-size', '.8em');
        $('#cvv').prev().text("CVV: - Your CVV should be 3 digits long.").show();
        if ($('#cvv').val() === '') {
            $('#cvv').prev().text("CVV: - Please enter your credit card security code.").show();
        } 
        return false;
    } else {
        $('#cvv').prev().text('CVV:');
        $('#cvv').prev().css('color', 'black').css('font-size', 'initial');
        return true;
    }
}
$('#cvv').on('input', cvvCode);


// form validation at submission ************************************************************************

$('form').on('submit', function(event) {
    let result = true;
    result = result && name();
    result = result && email();
    result = result && oneCheck();
    if($('#payment option:selected').val() === 'credit card') {
        result = result && ccNumber();
        result = result && zipCode();
        result = result && cvvCode();
    }

    if (!result) {
        event.preventDefault();
        $('#name').focus();
        alert('Please complete the form completely and correctly.');
    }
});