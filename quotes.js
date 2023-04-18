let quote = {
    fetchQuote: function () {
        fetch('https://api.quotable.io/random')
            .then((response) => response.json())
            .then((data) => this.displayQuote(data));
    },
    displayQuote: function (data) {
        let content = data.content;
        let author = data.author;
        document.querySelector(".quote").innerText = content + "\n-" + author;
        document.querySelector(".quote").classList.remove("loading");
        if(document.querySelector(".loader")){
            document.querySelector(".loader").remove();
        }
    },
    search: function () {
        this.fetchQuote();
    }
};


document.querySelector(".quote-button").addEventListener("click", function () {
    quote.search();
})

quote.search();