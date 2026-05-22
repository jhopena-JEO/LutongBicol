var recipes = [
    { name: "Kinalas", url: "FeaturedPage.html" },
    { name: "Bicol Express", url: "RecipePage.html#bicol-express" },
    { name: "Pinangat", url: "RecipePage.html#Pinangat" },
    { name: "Sili Ice Cream", url: "RecipePage.html#Sili-Ice-Cream" },
    { name: "Pili Nut Brittle", url: "RecipePage.html#Pili-Nut-Brittle" },
    { name: "Halo-halo", url: "RecipePage.html#Halo-Halo" }
];

var searchInput = document.getElementById('searchInput');
var dropdown = document.getElementById('dropdown');

searchInput.addEventListener('input', function() {
    var query = this.value.toLowerCase().trim();
    dropdown.innerHTML = ''; 

    if (query === '') {
        dropdown.style.display = 'none';
        return;
    }

    var matchFound = false;

    for (var i = 0; i < recipes.length; i++) {
        var recipeName = recipes[i].name.toLowerCase();
        
        if (recipeName.indexOf(query) !== -1) {
            var item = document.createElement('a');
            item.href = recipes[i].url;
            item.textContent = recipes[i].name;
            item.className = 'dropdown-item';
            
            dropdown.appendChild(item);
            matchFound = true;
        }
    }

    if (matchFound === true) {
        dropdown.style.display = 'block';
    } else {
        var noResult = document.createElement('div');
        noResult.textContent = 'No recipes found';
        noResult.style.padding = '10px';
        noResult.style.color = '#888';
        
        dropdown.appendChild(noResult);
        dropdown.style.display = 'block';
    }
});

document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

var contactForm = document.getElementById('contactForm');

if (contactForm !== null) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.querySelector('input[type="text"]').value;
        var email = document.querySelector('input[type="email"]').value;
        var message = document.querySelector('textarea').value;

        var storedMessages = localStorage.getItem('messages');
        var messages;

        if (storedMessages === null) {
            messages = [];
        } else {
            messages = JSON.parse(storedMessages);
        }

        var newMsg = {
            name: name,
            email: email,
            message: message
        };

        messages.push(newMsg);
        localStorage.setItem('messages', JSON.stringify(messages));
        
        alert('Message Sent Successfully!');
        contactForm.reset();
    });
}

var messagesContainer = document.getElementById('messagesContainer');

if (messagesContainer !== null) {
    var storedMessages = localStorage.getItem('messages');
    var messages;

    if (storedMessages === null) {
        messages = [];
    } else {
        messages = JSON.parse(storedMessages);
    }

    for (var j = 0; j < messages.length; j++) {
        var msgCard = document.createElement('div');
        msgCard.className = 'message-card';

        msgCard.innerHTML = 
            "<h3>" + messages[j].name + "</h3>" +
            "<p><strong>Email:</strong> " + messages[j].email + "</p>" +
            "<p>" + messages[j].message + "</p>";

        messagesContainer.appendChild(msgCard);
    }
}