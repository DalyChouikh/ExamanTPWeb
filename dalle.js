const currentLocation = location.href;
const navLinks = document.querySelectorAll("nav ul li a");
const menuLength = navLinks.length
for (let i = 0; i < menuLength; i++) {
  if (navLinks[i].href === currentLocation) {
    navLinks[i].className = "active";
  }
}

const url = 'https://api.openai.com/v1/images/generations';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({
        prompt: 'Elephant',
        n: 2,
        size: '256x256'
    })
};

let gpt = {
    fetchAnswer: async function (question) {
        options.body = JSON.stringify({
            prompt: question,
            n: 2,
            size: '256x256'
        });
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        this.displayAnswer(result);
    },
    displayAnswer: function (data) {
        const first = data.data[0].url;
        const second = data.data[1].url;
        document.querySelector(".answer").innerHTML = `<img src="${first}" alt="First image" /><img src="${second}" alt="Second image" />`;
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




