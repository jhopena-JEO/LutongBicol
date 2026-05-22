document.addEventListener("DOMContentLoaded", function () {
    
    var commentForm = document.getElementById("commentForm");
    var commentsContainer = document.getElementById("commentsDisplayContainer");

    displayComments();

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var nameValue = document.getElementById("commentName").value;
        var emailValue = document.getElementById("commentEmail").value;
        var subjectValue = document.getElementById("commentSubject").value;
        var descValue = document.getElementById("commentDesc").value;

        var newComment = {
            name: nameValue,
            email: emailValue,
            subject: subjectValue,
            description: descValue,
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

        commentForm.reset();

        displayComments();
    });

    function displayComments() {
        var storedComments = localStorage.getItem("lutongBicolComments");
        var savedComments;

        if (storedComments === null) {
            savedComments = [];
        } else {
            savedComments = JSON.parse(storedComments);
        }

        commentsContainer.innerHTML = "";

        if (savedComments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments-msg">No messages or suggestions yet.</p>';
            return;
        }

        for (var i = savedComments.length - 1; i >= 0; i--) {
            
            var commentBox = document.createElement("div");
            commentBox.className = "comment-card";

            commentBox.innerHTML = 
                "<h4><strong>Subject:</strong> " + savedComments[i].subject + "</h4>" +
                "<p class='comment-meta'>" +
                    "By: <strong>" + savedComments[i].name + "</strong> (" + savedComments[i].email + ") • <small>" + savedComments[i].date + "</small>" +
                "</p>" +
                "<p class='comment-body'>" + savedComments[i].description + "</p>";

            commentsContainer.appendChild(commentBox);
        }
    }
});

document.getElementById("clearCommentsBtn").addEventListener("click", function () {
    localStorage.removeItem("lutongBicolComments");
    location.reload();
});