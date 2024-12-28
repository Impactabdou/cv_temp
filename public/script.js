

function generateNav() {
    const items = ["Presentation", "Experience", "Skills", "Contacts"];

    let header = document.getElementById("header");

    let nav = document.createElement("nav");

    items.forEach(element => {
        let a = document.createElement("a");
        a.setAttribute("href", "#".concat(element));
        a.setAttribute("class", "nav-a");
        a.innerHTML = element;
        nav.appendChild(a);
    })

    header.appendChild(nav);
}

function generateSection(data,choice) {

    let main = document.getElementById("main");

    for (const key in data) {

        let section = document.createElement("section");

        let h1 = document.createElement("h2");

        h1.innerHTML = key;

        section.appendChild(h1);

        section.setAttribute("id", key);

        section.setAttribute("class", key);

        addSectionComponenets(section, data[key], key);

        main.appendChild(section);
    }

}


function addSectionComponenets(section, data, mainKey) {

    for (const key in data) {

        let element = document.createElement(key);

        if (Array.isArray(data[key])) {

            for (const e in data[key]) {

                if (key === "article" || key === "addresse") {
                    element = generateArticle(data[key][e])
                    element.setAttribute("class", mainKey.concat("-").concat("article"))
                    section.appendChild(element);
                }

                if (key === "p") {
                    if (Array.isArray(data[key][e])) {
                        generateP(element, data[key][e], section)

                    }
                    else {
                        section.append(generateElement(mainKey, "p", data[key][e]))
                    }
                }
            }
        }
        else if (key === "img") {

            if(choice){
                element = setFigureComponenets(localStorage.getItem("img"), key, mainKey,choice);
            }else{
                element = setFigureComponenets(data, key, mainKey,choice);            
            }
        } else {
            element.setAttribute("class", mainKey.concat("-").concat(key));
            element.innerHTML = data[key];

        }

        section.appendChild(element);

    }


}

function generateArticle(data) {
    let element = document.createElement("article");
    for (const e in data) {
        let temp;
        if (e === "p" && Array.isArray(data[e])) {
            generateP(element, data[e], "article");
        }
        else if (e === "time") {
            temp = generateTime(data[e]);
            element.append(temp);
        }
        else {
            temp = document.createElement(e);
            temp.innerHTML = data[e];
            temp.setAttribute("class", "article-".concat(e))
            element.append(temp);
        }

    }
    return element;
}

function generateP(element, data, key) {

    for (const e in data) {
        let temp = document.createElement("p")
        temp.innerHTML = data[e]
        temp.setAttribute("class", key.concat("-").concat("p"))
        element.append(temp)
    }
}

function generateTime(data) {
    let temp = document.createElement("time");
    temp.setAttribute("datetime", data.datetime);
    temp.innerHTML = data.text;
    temp.setAttribute("class", "time")
    return temp;
}


function generateElement(key, tag, content) {

    let element = document.createElement(tag)

    element.innerHTML = content

    element.setAttribute("class", key.concat("-").concat(tag))

    return element;
}


function setFigureComponenets(data, key, mainKey,choice) {

    let element = document.createElement("figure");

    element.setAttribute("id", mainKey.concat("-picture"));

    element.setAttribute("aria-hidden", "true");

    let image = document.createElement(key);

    if(choice){
        image.setAttribute("src",data);
    }else{
        image.setAttribute("src", data[key]);
    }

    element.appendChild(image);

    return element;
}


let choice = true;

if(choice){
    
    const data = JSON.parse(localStorage.getItem("jsonDataFinal"))

    if(data === null){
        alert("no data");
    }

    generateSection(data,choice)

}else{
    fetch("./ressources/cv_templates/donals-trump.json")
    .then(response => response.json())
    .then(data => generateSection(data,choice))
    .catch(error => console.error(error))
}

generateNav();


