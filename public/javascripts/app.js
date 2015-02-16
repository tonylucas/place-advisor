$(document).ready(function () {
    $("#updateReview").on('click', function (target) {
        var reviewId = $(target.currentTarget).attr("data-id");
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/reviews/" + reviewId,
            data: $('#edit-form').serialize(),
            success: function (data, textStatus, jqXHR) {
                window.location.replace("/reviews");
            }
        });
    });
    
    $(".removeReview").on('click', function (target) {
        var reviewId = $(target.currentTarget).attr("data-id");
        console.log(reviewId);
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/reviews/" + reviewId,
            success: function (data, textStatus, jqXHR) {
                window.location.replace("/reviews");
            }
        });
    });
    
    
    $("#createReview").on('click', function (target) {
        $.ajax({
            type: "POST",
            data: $('#edit-form').serialize(),
            url: "http://localhost:3000/reviews/",
            success: function (data, textStatus, jqXHR) {
                window.location.replace("/reviews");
            }
        });
    });
});