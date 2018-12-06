// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");


    // create an array of strings, each one related to a topic that interests me
    var cookieArr = ["Brown Butter", "Snickerdoodle", "Chocolate Chip", "Fortune Cookie", "Sugar Cookie", "Oreo", "Gingerbread Cookie", "Gingersnap Cookie", "Molasses Cookie", "Oatmeal Cookie"];
    // App will take in the topics in this array and create buttons in HTML(Which one is this?)
    function setDefaultButtons() {
        for (var i = 0; i < cookieArr.length; i++) {
            var arrBtn = $("<button>");
            arrBtn.addClass("btn btn-primary");
            // Pojo
            arrBtn.attr({ "type": "button", "cookie-type": cookieArr[i] });
            arrBtn.text(cookieArr[i]);
            $(".buttons").append(arrBtn);

        }
    }
    setDefaultButtons();
    // When buttons are clicked 10 static (non-animated buttons (Paused.html)) will display.
    $("button").on("click", function () {
        var cookieType = $(this).attr("cookie-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            cookieType + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var cookieDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var cookieImage = $("<img>");
                    cookieImage.addClass("gif");
                    cookieImage.attr({
                        'src': results[i].images.fixed_height_still.url,
                        'animated-gif': results[i].images.fixed_height.url,
                        'data-state': 'still',
                        'still-gif': results[i].images.fixed_height_still.url
                    })

                    cookieDiv.prepend(p);
                    cookieDiv.prepend(cookieImage);

                    $(".gif-go-here").prepend(cookieDiv);

                }
            });
    });
    //When user clicks a still image it will start to animate

   
    $(".gif-go-here").on("click",".gif", function () {
        console.log("click event");
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr('animated-gif'));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("still-gif"));
            $(this).attr("data-state", "still");
        }
    });
    // Under every GIF display rating (Giphy AIP)
    // DONE ABOVE
    // Add form to page that takes in User data and places it into your 'topics' array. Then make a function that makes a new button based on their input

    // ==== IMPORTANT ==== 

    // Create a ReadMe.md file for this project

    // Add this to your portfolio to get full credit on the project.

    //  -----  BONUS ROUND  ------

    // make it fully mobile responsive

    // allow additional GIFs to be added to the page. NOT override existing ones

    // List extra metadata. From API

    // Include 1 touch download button

    // Integrate this with additional AIP's (OMDB, Bands in Town).

    // Allow a 'favorites' option to a GIF

});