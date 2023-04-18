let joke = {
    fetchJoke: function () {
        fetch('https://v2.jokeapi.dev/joke/Any?type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
            .then((response) => response.json())
            .then((data) => this.displayJoke(data));
    },
    displayJoke: function (data) {
        let joke = data.joke;
        document.querySelector(".joke").innerText = joke;
        document.querySelector(".joke").classList.remove("loading");
        if(document.querySelector(".loader")){
            document.querySelector(".loader").remove();
        }
    },
    search: function () {
        this.fetchJoke();
    }
};


document.querySelector(".joke-button").addEventListener("click", function () {
    joke.search();
})

joke.search();