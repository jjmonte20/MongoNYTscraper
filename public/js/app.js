/* global bootbox */
$(document).ready(function() {
    console.log("ready");
    // Setting a reference to the article-container div where all the dynamic content will go
    // Adding event listeners to any dynamically generated "save article"
    // and "scrape new article" buttons
    var articleContainer = $(".article-container");
    $(".save").on("click", handleArticleSave);
    $(".scrape").on("click", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);

    function handleArticleScrape() {
        // function will scrape new articles
        $.get("/api/scrape").then(function() {
            // once the data is scraped, page should reload with the new articles
            window.location.reload();
        });
    }

    function handleArticleClear() {
        // function will clear all of the articles
        $.get("/api/clear").then(function() {
            // once the data is cleared, page should reload and empty the container of the article container
            window.location.reload();
            $(".article-container").empty();
        });
    }

    function handleArticleSave() {
        console.log($(this).data("id") + " works");
        // need to make sure that the values are inserted correctly
        var id = $(this).data("id");
        var editArticle = {
            // will need to get this article's values
            _id: id,
            title: $('#p' + id + '').text().trim(),
            link: $('#a' + id + '').attr("href"),
            saved: true
        }
        console.log(editArticle);
        updateArtcicle(editArticle);
    }

    function updateArtcicle(edit) {
        $.ajax({
            method: "PUT",
            url: "/api/articles/" + edit._id,
            data: edit
        }).then(function(data) {
            console.log(data + "moving to saved");
            $("#article" + editArticle._id + "").remove();
            window.location.reload();
        });
    }
// ===========================
});
