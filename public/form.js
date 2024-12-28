//!error : duplicate name of inputs thus doesn't work with dataform and json encoding

let form = document.querySelector("#form");

let countExperience = 0;
let countSkills = 0;
let pos = 0;
let section = ["Presentation","Experience","Skills","Contacts","form_img"];

let imgForm = document.getElementById("form_img");
let imgInput = document.getElementById("input_img");

imgForm.addEventListener("change", (data) => {
    
    const reader = new FileReader();

    reader.readAsDataURL(imgInput.files[0])

    reader.addEventListener("load",()=>{


        localStorage.setItem("img",reader.result);

    })

    localStorage.setItem("img",reader.result);
})




form.addEventListener("submit", e => saveDataJson(e));


function saveDataJson(e){

    localStorage.removeItem("jsonData");
    localStorage.removeItem("jsonDataFinal");
    localStorage.removeItem("img");
        
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    const jsonData = JSON.stringify(data);

    if(localStorage){
        localStorage.setItem("jsonData", jsonData); 
        buildData();
        return;
    }

    console.log("Local Storage not supported");

}


function generateArticleForm(){
    countExperience++;
    let count = countExperience; 
    let div = document.getElementById("Experience");

    let target = "article".concat(count).concat("_") ; 

    let titlelabel = document.createElement("label");
    titlelabel.setAttribute("for", target.concat("h2"));
    titlelabel.innerHTML = "Title";

    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", target.concat("h2"));
    title.setAttribute("id", "input_experience");
    title.setAttribute("class", "input");

    titlelabel.appendChild(title);
    

    let descriptionlabel = document.createElement("label");
    descriptionlabel.setAttribute("for", target.concat("p"));
    descriptionlabel.innerHTML = "Description";

    let description = document.createElement("textarea");
    description.setAttribute("name", target.concat("p"));
    description.setAttribute("id", "input_experience");
    description.setAttribute("class", "input");

    descriptionlabel.appendChild(description);

    let dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", target.concat("time"));
    dateLabel.innerHTML = "Date of start";

    let date = document.createElement("input");
    date.setAttribute("type", "text");
    date.setAttribute("name", target.concat("time"));
    date.setAttribute("placeholder","YYYY-YYYY")
    date.setAttribute("id", "input_experience");
    date.setAttribute("class", "input");

    dateLabel.appendChild(date);

    div.appendChild(titlelabel);
    div.appendChild(descriptionlabel);
    div.appendChild(dateLabel);

}

function generateSkills(){
    countSkills++;
    let count = countSkills;
    let div = document.getElementById("Skills");

    target = "skills".concat(count).concat("_") ;

    let skillLabel = document.createElement("label");
    skillLabel.setAttribute("for", target.concat("p"));
    skillLabel.innerHTML = "Skill";

    let skill = document.createElement("input");
    skill.setAttribute("type", "text");
    skill.setAttribute("name", target.concat("p"));
    skill.setAttribute("id", "input_skills");
    skill.setAttribute("class", "input");

    skillLabel.appendChild(skill);

    div.append(skillLabel);

}

function buildData(){
    let data = localStorage.getItem('jsonData');

    if(data === null){
        console.log("data not loaded yet <3");
        return;
    }

    let obj = JSON.parse(data);

    let output = {};


    setPresentation(output,obj);

    setExperience(output,obj);

    setSkills(output,obj);

    setContacts(output,obj);

    const jsonData = JSON.stringify(output);

    if(localStorage){
        localStorage.setItem("jsonDataFinal", jsonData); 
        return;
    }

    console.log(":/")

}

function setPresentation(output,data){
    let str = "Presentation_";
    output["Presentation"] = {};
    for(let key in data){
        if(key.startsWith(str)){

            if(key === "Presentation_img"){
                continue;
            }

            output["Presentation"][key.replace(str,"")] = data[key];

        }
    output["Presentation"]["img"] = "";
    }
}


function setExperience(output,data){
    
    countExperience--;

    let count = 0;

    output["Experience"] = {}
    
    output["Experience"]["article"] = [];
    

    while(count <= countExperience){
        
        let obj = {}

        obj["h2"] = data["article".concat(count+1).concat("_h2")];

        obj["p"] = data["article".concat(count+1).concat("_p")];

        obj["time"] = {
            "datetime" : "",
            "text" : data["article".concat(count+1).concat("_time")]
        }
        
        output["Experience"]["article"].push(obj);

        count++;
    }

}

function setSkills(output,data){

    countSkills--;

    let count = 0;

    output["Skills"] = {};

    output["Skills"]["p"] = [];

    while(count <= countSkills){


        output["Skills"]["p"].push(data["skills".concat(count+1).concat("_p")])

        count++;

    }

}

function setContacts(output,data){

    output["Contacts"] = {
        "p" : data["contacts_p"],
        "adress" : [
            {"p" : data["contacts_address"]}
        ]
    }

}

function generateNextSection(){
    pos++;
    
    if(pos === 1){
        generateArticleForm();
        document.getElementById("experience-button").style.display = "unset"
    }else{
        document.getElementById("experience-button").style.display = "none"
    }
    if(pos === 2){
        generateSkills();
        document.getElementById("skill-button").style.display = "unset"
    }else{
        document.getElementById("skill-button").style.display = "none"
    }
    if(pos == 4){ 
        document.getElementById("switch").style.display = "none";
        document.getElementById("submit").style.display = "unset";
    }
    let current = document.getElementById(section[pos-1]);
    let target = document.getElementById(section[pos]);

    current.style.display = "none";
    
    target.style.display = "flex";

    

}

