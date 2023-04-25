const url = 'https://chatgpt-api7.p.rapidapi.com/ask';
let options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
		'X-RapidAPI-Key': 'cfc127c726msh48ad856ce75b474p14e4d9jsnb9fd891c8a7b',
		'X-RapidAPI-Host': 'chatgpt-api7.p.rapidapi.com'
    },
    body: JSON.stringify({
		query: 'Hello!'
	})
};

let gpt = {
    fetchAnswer : function(question){
        options.body = JSON.stringify({query: question});
        fetch(url, options)
        .then((response) => response.json())
        .then((data) => this.displayAnswer(data));
    },
    displayAnswer : function(data){
        const message = data.response;
        document.querySelector(".answer").innerText = message;
        document.querySelector(".answer").classList.remove("loading");
        if(document.querySelector(".loader")){
            document.querySelector(".loader").remove();
        }
    },
    search: function () {
        this.fetchAnswer(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    gpt.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        gpt.search();
    }
})

gpt.fetchAnswer("Hello!")


