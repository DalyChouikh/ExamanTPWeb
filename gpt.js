const currentLocation = location.href;
const navLinks = document.querySelectorAll("nav ul li a");
const menuLength = navLinks.length
for (let i = 0; i < menuLength; i++) {
  if (navLinks[i].href === currentLocation) {
    navLinks[i].className = "active";
  }
}

const url = 'https://api.openai.com/v1/chat/completions';
let options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: "Hello!"
        }]
	})
};

let gpt = {
    fetchAnswer: async function (question) {
        tokens = 4096 - (question.length / 4 + question.length % 4);
        options.body = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: question
            }]
        });
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        this.displayAnswer(result);
    },
    displayAnswer: function (data) {
        const message = data.choices[0].message.content;
        document.querySelector(".answer").innerText = message;
        document.querySelector(".answer").classList.remove("loading");
        if (document.querySelector(".loader")) {
            document.querySelector(".loader").remove();
        }
    },
    search: function () {
        this.fetchAnswer(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    gpt.search();
    //add div with class loader to .card
    const loader = document.createElement("div");
    loader.classList.add("loader");
    document.querySelector(".card").appendChild(loader);
    //add class loading to .answer
    document.querySelector(".answer").classList.add("loading");
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        gpt.search();
        //add div with class loader to .card
        const loader = document.createElement("div");
        loader.classList.add("loader");
        document.querySelector(".card").appendChild(loader);
        //add class loading to .answer
        document.querySelector(".answer").classList.add("loading");
    }
})

gpt.fetchAnswer("Hello!")


