$(document).ready(function () {
    $('.js-select').on('change', function () {
        var url = $(this).val();
        if (url) {
            window.location = url;
        }
        return false;
    });
});
