document.addEventListener("DOMContentLoaded", function() {
    
    var commentForm = document.getElementById("recipeCommentForm");

    if (commentForm !== null) {
        commentForm.addEventListener("submit", function(event) {
            event.preventDefault();

            var commentText = document.getElementById("recipeCommentText").value;
            var currentPageTitle = document.title;

            var newComment = {
                name: "Anonymous User",
                email: "none@gmail.com", 
                subject: currentPageTitle + " Recipe Feedback", 
                description: commentText,
                date: new Date().toLocaleDateString()
            };

            var storedComments = localStorage.getItem("lutongBicolComments");
            var savedComments;

            if (storedComments === null) {
                savedComments = [];
            } else {
                savedComments = JSON.parse(storedComments);
            }

            savedComments.push(newComment);
            localStorage.setItem("lutongBicolComments", JSON.stringify(savedComments));

            document.getElementById("recipeCommentText").value = "";

            alert("Comment submitted successfully!");
        });
    }
});