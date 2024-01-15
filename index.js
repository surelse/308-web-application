console.log("This is a web application");
// import * as Carousel from "./Carousel.js";


//app div element
const app = document.getElementById('app')
// The breed selection input element.
const breedsEl = document.getElementById("breeds");
// The information section div element.
const info = document.getElementById("info");



// Step 0: Store your API key here for reference and easy access.
const API_KEY =
    "live_h8q6xCKbg5zncX3Ai9hiI52rN1JIN3bdTusfQADVzkrVQMOKYP4KJtTMY86uBpDI";


//cat api breeds
const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
});

let requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

let breeds = [];

async function breedsFetching(){
    await fetch("https://api.thecatapi.com/v1/breeds", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result) {
            result.forEach((breed) => {
                breeds.push(breed)
                const option = document.createElement("option");
                option.setAttribute("value", breed.id);
                option.textContent = breed.name;
                breedsEl.appendChild(option);
            });
        }
    })
    .catch(error => console.log('error', error));
}
breedsFetching();

//check breeds arr:
console.log('breeds Arr: ', breeds)

//generating cats imgs by breed
breedsEl.addEventListener('change', (event) => {
    // console.log(event.target.value)
    const breedId = event.target.value;
    const breedObj = breeds.find((b)=>b.id === breedId);
    console.log(`breed with id: ${breedId} > `,breedObj);
    if(!breedObj){
        info.textContent = "breed not found"
    }
    else {
        catURL = breedObj.image.url;
        const cat = document.createElement("img")
        cat.setAttribute("src",catURL,"alt","cat")
        cat.style.width = "60%";
        app.textContent= '';
        app.appendChild(cat);

        info.innerHTML = `<h1>${breedObj.name}</h1>
            <p>intro: ${breedObj.description} </p>`

    }
})