window.onload = function() {
    fetch("https://ai.xn--soora-pta.com/clear_text")
    .then(response => response.json())
    .then(data => {
        console.log("clear_text data:", data);
    })
    .catch(error => {
        console.log("Error en clear_text:", error);
    });
}

function getRecipes() {
    let ingredients = document.getElementById("ingredients").value;
    document.querySelector('section .inputs input[type="submit"]').value = "Generando...";
    document.querySelector('section .inputs input[type="submit"]').disabled = true;
    document.querySelector('section .inputs .material-icons-outlined').style.opacity = '1';
    document.querySelector('section .inputs .material-icons-outlined').style.animation = "in-out 1s linear infinite";

    fetch("https://ai.xn--soora-pta.com/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                "ingredients": ingredients
                })
            })
    .then(response => response.json())
    .then(data => {
        document.querySelector('section .inputs input[type="submit"]').disabled = false;
        document.querySelector('section .inputs .material-icons-outlined').style.opacity = '0';
        document.querySelector('section .inputs .material-icons-outlined').style.animation = "none";
        document.querySelector('section .inputs input[type="submit"]').value = "Más recetas";
        const section = document.createElement('section');
        const h1 = document.createElement('h1');
        const ul = document.createElement('ul');
        ul.classList.add('receivedData');
        h1.textContent = "¿Qué puedes preparar con estos ingredientes?";
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('elementHide');
        const code = document.createElement('code');
        code.textContent = data[1];
        innerDiv.appendChild(code);
        ul.appendChild(innerDiv);
        section.appendChild(h1);
        section.appendChild(ul);
        document.getElementsByTagName('body')[0].appendChild(section);
        })
    .catch(error => {
        console.log(error);
        document.querySelector('section .inputs input[type="submit"]').disabled = false;
        document.querySelector('section .inputs .material-icons-outlined').style.opacity = '0';
        document.querySelector('section .inputs .material-icons-outlined').style.animation = "none";
        document.querySelector('section .inputs input[type="submit"]').value = "Volver a intentar";
        });
}

const inputIngredients = document.getElementById("ingredients");
const buttonIngredients = document.getElementById("sendInput");

inputIngredients.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        buttonIngredients.click();
    }
});