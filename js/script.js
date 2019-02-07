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


// * Objective 6 Form validation and messages * //