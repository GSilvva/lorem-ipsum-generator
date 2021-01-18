const
    form = document.querySelector('form'),
    inputWords = document.getElementById('words'),
    inputParagraphs = document.getElementById('paragraphs'),
    personalizado = document.getElementById('personalizar'),
    textoContainer = document.querySelector('.texto'),
    copyBtn = document.querySelector('.copy');

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
        .then(response => { return response.json(); })
        .then(data => {
            
            if(paragraphs === 0 || paragraphs === "") {
                alert("Digite a quantidade de parágrafos!");
            } else {
                render(data);
            }
        })
        .catch(err => { console.error(err); });

    inputParagraphs.value = "";
    inputWords.value = "";
};

function render(texto) {

    let html = texto.map(sentence => {
        return `<p class="par">${sentence}</p><br>`;
    }).join(" ");
    let formatHTML = html.replace(/[","]+/g, " ");

    // textoContainer.innerHTML = textoContainer.innerHTML += formatHTML;
    textoContainer.innerHTML = formatHTML;

};

function copiaTexto() {

    let paragraphs = textoContainer.getElementsByClassName("par");
    let arrayParagraphs = Array.from(paragraphs);

    const inputFake = document.createElement("input");
    inputFake.type = "text";
    textoContainer.appendChild(inputFake);

    let textos = arrayParagraphs.map(text => {
        return text.textContent;
    }).join("");

    inputFake.value = textos;

    inputFake.select();
    document.execCommand("copy");

    textoContainer.removeChild(inputFake);

    copyBtn.classList.add("copiado");

    if(copyBtn.classList.contains("copiado")) {
        copyBtn.innerHTML = `
            Texto copiado!
            <i class="fas fa-check-circle"></i>
        `;
    } else {
        copyBtn.innerHTML = `
            Copie o texto!
            <i class="far fa-clipboard"></i>
        `;
    }
};

form.addEventListener("submit", (el) => {
    el.preventDefault();
    
    getTexts();
});

copyBtn.addEventListener("click", copiaTexto);