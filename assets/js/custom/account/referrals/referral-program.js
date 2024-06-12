"use strict";

// Class definition
var KTAccountReferralsReferralProgram = function () {
    // Private functions

    var initReferralProgrammClipboard = function() {
        var button = document.querySelector('#kt_referral_program_link_copy_btn');
        var input = document.querySelector('#kt_referral_link_input');
        var clipboard = new ClipboardJS(button);

        clipboard.on('primary', function(e) {
            var buttonCaption = button.innerHTML;
            //Add bgcolor
            input.classList.add('bg-primary');
            input.classList.add('text-inverse-primary');

            button.innerHTML = 'Copied!';

            setTimeout(function() {
                button.innerHTML = buttonCaption;

                // Remove bgcolor
                input.classList.remove('bg-primary'); 
                input.classList.remove('text-inverse-primary'); 
            }, 3000);  // 3seconds

            e.clearSelection();
        });
    }

    // Public methods
    return {
        init: function () {
            initReferralProgrammClipboard();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTAccountReferralsReferralProgram.init();
});
