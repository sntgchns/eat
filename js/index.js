function getRecipes() {
    let ingredients = document.getElementById("ingredients").value;
    fetch("ai.soñora.com/clear_text");
    fetch("ai.soñora.com/recipes", {
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
        console.log(data);
        const section = document.createElement('section');
        const h1 = document.createElement('h1');
        const ul = document.createElement('ul');
        ul.classList.add('receivedData');
        h1.textContent = "Estas son las recetas que puedes hacer con los ingredientes que tienes disponibles";
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('elementHide');
        const code = document.createElement('code');
        code.textContent = data[1];
        innerDiv.appendChild(code);
        ul.appendChild(innerDiv);
        section.appendChild(h1);
        section.appendChild(ul);
        document.getElementsByTagName('body')[0].appendChild(section);
        document.querySelector('section .inputs input[type="submit"]').value = "Más recetas";
        })
    .catch(error => {
        console.log(error);
        });
    }