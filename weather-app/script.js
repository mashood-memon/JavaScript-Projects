const wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
infoText = inputPart.querySelector('.info-text'),
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button'),
weatherImg = document.querySelector(".weather-part img"),
backBtn = document.querySelector("header i");

const apiKey = "733d9b972eec62a0761d911e9cf2089d"
let api;

locationBtn.addEventListener('click',()=>{
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
   }
   else{
    alert("Your Browser Doesn't Support Geolocation API")
   }
})

function onSuccess(position){
    console.log(position);
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();

}
function onError(error){
    infoText.innerHTML = error.message;
    infoText.classList.add('error')
    console.log(error);
}

inputField.addEventListener('keyup',e=>{
    if(e.key==='Enter'&& inputField.value!=''){
        e.preventDefault();
        requestApi(inputField.value)

    }
})

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData()
}

function weatherDetails(info){
    infoText.classList.replace("pending", "error")
    if(info.cod==='404'){
        infoText.innerHTML = info.message
    }
    else{
        const city = info.name
        const country = info.sys.country
        const {feels_like, humidity, temp} = info.main
        const {description, id} = info.weather[0]

        if(id==800){
            weatherImg.src = 'images/clear.svg'
        }
        else if(id>=200 && id<=232){
            weatherImg.src = 'images/storm.svg'
        }
        else if((id>=500 && id<=531) || (id>=300 && id<=321)){
            weatherImg.src = 'images/rain.svg'
        }
        else if(id>=600 && id<=622){
            weatherImg.src = 'images/snow.svg'
        }
        else if(id>=801 && id<=804){
            weatherImg.src = 'images/cloud.svg'
        }
        else if(id>=701 && id<=781){
            weatherImg.src = 'images/haze.svg'
        }


        wrapper.querySelector('.location span').innerHTML = `${city} ${country}`;
        wrapper.querySelector('.weather-update').innerHTML = description;
        wrapper.querySelector('.temperature .num').innerHTML = Math.floor(temp);
        wrapper.querySelector('.feels .temperature .num').innerHTML = Math.floor(feels_like);
        wrapper.querySelector('.humidity .num').innerHTML = `${humidity}%`

        infoText.classList.remove("pending", "error")
        wrapper.classList.add('active')
        inputPart.classList.add('display-none')
        console.log(info);

    }
    
}
function fetchData(){
    infoText.innerHTML ="Getting Weather Details..."
    infoText.classList.add("pending")

    fetch(api)
        .then(res => res.json())
        .then(data => {
            // console.log('API Response:', data);
            weatherDetails(data)
        })
        .catch(error => {
            console.error('API Error:', error);
        });
}

backBtn.addEventListener("click",()=>{
    wrapper.classList.remove('active')
    inputPart.classList.remove('display-none')
    inputField.value=''

})




