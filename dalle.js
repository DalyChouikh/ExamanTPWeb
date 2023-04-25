const url = 'https://openai80.p.rapidapi.com/images/generations';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'cfc127c726msh48ad856ce75b474p14e4d9jsnb9fd891c8a7b',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
    },
    body: JSON.stringify({
        prompt: 'A cute baby sea otter',
        n: 2,
        size: '256x256'
    })
};

let gpt = {
    fetchAnswer: function (question) {
        options.body = JSON.stringify({
            prompt: question,
            n: 2,
            size: '256x256'
        });
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => this.displayAnswer(data));
    },
    displayAnswer: function (data) {
        console.log(data);
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




