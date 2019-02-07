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

$(tshirtColor).hide();

const dropDownBox = ($optionOne, $optionTwo) => {
    $tshirtColor.show();
    $optionOne.hide();
    $optionTwo.show();
    $optionTwo.first().attr('selected', 'selected');
    $optionOne.first().attr('selected',false);
};

// * Objective 4 ”Register for Activities” section of the form * //


// * Objective 5 Payment Info section of the form * //


// * Objective 6 Form validation and messages * //