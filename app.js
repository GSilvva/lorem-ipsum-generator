const
    form = document.querySelector('form'),
    inputWords = document.getElementById('words'),
    inputParagraphs = document.getElementById('paragraphs'),
    personalizado = document.getElementById('personalizar'),
    textoContainer = document.querySelector('.texto'),
    copy = document.querySelector('.copy');

function getTexts () {

    let paragraphs = inputParagraphs.value;
    let words = inputWords.value;
    let url = `https://alexnormand-dino-ipsum.p.rapidapi.com/?format=json&words=${words}&paragraphs=${paragraphs}`;
    const headers =   {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c408d7fb5dmsh2c48969faaa0713p19eb1fjsn68ab2d93bf32",
            "x-rapidapi-host": "alexnormand-dino-ipsum.p.rapidapi.com"
        }
    };

    fetch(url, headers)
        .then(response => {
            
            return response.json();

        })
        .then(data => {

            render(data);

        })
        .catch(err => {
            console.error(err);
        });

    // inputParagraphs.value = "";
    // inputWords.value = "";
}

function render(texto) {

    let html = texto.map(sentences => {
        return `<p>${sentences}</p><br>`;
    }).join(" ");
    let formatHTML = html.replace(/[","]+/g, " ");

    // textoContainer.innerHTML = textoContainer.innerHTML += formatHTML;
    textoContainer.innerHTML = formatHTML;

}

form.addEventListener("submit", (el) => {
    el.preventDefault();
    
    getTexts();
});
