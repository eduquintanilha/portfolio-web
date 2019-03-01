/**
 * ==========================================
 *  Title:  Portfolio Web with HTML5 + CSS3 + JS Vanilla
 *  Author: Eduardo Quintanilha
 *  Date:   25 Feb 2019
 * ==========================================
 */

const URL_API = "https://portfolioapi--quintanilhaedu.repl.co/portfolio"

/* Get DOM object with 'theme' class for theme toggle */
const themeObjs = document.querySelectorAll('.theme');
/* Get theme toggler object */
const themeToggler = document.querySelector('#theme-toggle');

/* Get DOM objects for append text from JSON */
const skillsDiv = document.querySelector(".skills");
const worksList = document.querySelector(".experience");
const educationList = document.querySelector(".education");
const languagesList = document.querySelector(".languages");

/* Function for toggle black-theme on HTML */
function themeToggle(){
    for(let index=0; index < themeObjs.length; index++) {
        themeObjs[index].classList.toggle("black-theme");
    }
}
/* Event listener for click a theme toggler "Lamp" */
themeToggler.addEventListener('click', () => {
  themeToggle();  
});

/* Function for Fetch data from API */
async function fetchAPI(){
    try{
        const response = await fetch(URL_API);
        const data = response.json();
        return data;
    }catch(err){
        console.log(`Error on fetch API: ${err}`);
    }
}

/* Fetch API and append info on HTML */
fetchAPI()
    .then((resp) => {
        let works = resp.work;
        let educations = resp.education;
        let skills = resp.skills;
        let languages = resp.languages;

        /* Append Works/Professional Experiences section on HTML */
        for(let index=0; index < works.length; index++){
            let workData = works[index];       
            let newWork = `<li>
                            <h3 class="exp-company">${workData.company}</h3>
                            <div class="list-padding">
                                <span class="text-bold">Período: </span><span class="exp-period">${workData.startDate} até ${workData.endDate}</span>      
                            </div>
                            <div class="list-padding">
                                <span class="text-bold">Atribuições: </span><span class="exp-summary">${workData.summary.replace(/\+/g,'<br>')}</span>
                            </div>
                            <div class="list-padding">
                                <span class="text-bold">Cargo: </span><span class="exp-position">${workData.position}</span>
                            </div>
                        </li>`;
            worksList.innerHTML += newWork;            
        }
        /* Append Education section on HTML */
        for(let index=0; index < educations.length; index++) {
            let educationData = educations[index];
            let newEducation = `<li>
                            <h3>${educationData.institution}</h3>
                            <div class="list-padding">
                                <span class="text-bold">Período: </span><span>${educationData.startDate} até ${educationData.endDate}</span>      
                            </div>
                            <div class="list-padding">
                                <span class="text-bold">Curso: </span><span">${educationData.area}</span>
                            </div>
                        </li>`;
            educationList.innerHTML += newEducation;
        }
        /* Append Languages section on HTML */
        for(let index=0; index < languages.length; index++) {
            let languagesData = languages[index];
            let newLanguage = `<li>
                            <div class="list-padding">
                                <span class="text-bold">Idioma: </span><span>${languagesData.language}</span>      
                            </div>
                            <div class="list-padding">
                                <span class="text-bold">Fluência: </span><span">${languagesData.fluency}</span>
                            </div>
                        </li>`;
            languagesList.innerHTML += newLanguage;
        }
        /* Append Skills section on HTML */
        skills.forEach((skill, index) => {
            let newSkill = `<span class="skill">${skill}</span>`;
            skillsDiv.innerHTML += newSkill;
        });
    })
    .catch((err) => {
        console.log(`Error on get data: ${err}`);
    });


    