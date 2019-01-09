// // global
// $(document).ready(function(){
//     // make a reference to what will be the container of the saved articles
//     var articleContainer = $(".article-container");
//     // now let's add event listeners at the top
//     // this will then reference to the defined functions below
//     // keep in mind this is what we'll be naming the buttons later
//     $(document).on("click", ".btn.delete", HandleArticleDelete);
//     $(document).on("click", ".btn.notes", HandleArticleNotes);
//     $(document).on("click", ".btn.note-save", HandleNoteSave);
//     $(document).on("click", ".btn.note-delete", handleNoteDelete);
//     $(".clear").on("click", handleArticleClear);
// // bottom of the document
// });
$(document).ready(function() {
    console.log("ready");

// here I would make a function that will populate the notes in the modal
    $(".openNotes").on("click", handlePopulateNotes);

    $(".noteSave").on("submit", function(event) {
        event.preventDefault();
        var note = $("#exampleFormControlTextarea1").val();
        console.log(note);
        var thisId = $(this).attr("id");
        $.ajax({
                method: "POST",
                url: "/api/addnote/" + thisId,
                data: {
                    body: note
                }
            })
            // Once done let's empty the note box and populate the value
            .then(function(result) {
                console.log(result);
                $(".noteBody").empty();
                // handlePopulateNotes();
            })
        });

    function handlePopulateNotes() {
        // in this function all I am doing is getting the note for a specific article id
        console.log($(this).attr("data-id"));
    }

});