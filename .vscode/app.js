const apiKey = ab06cf297e8f65ab0d86ffab4a9e88b4;
const inputVal = Warsaw;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

class Data {
    async getData(){
        fetch(url)
        .then(response => response.json())
        console.log(response)
        .then(data => {
            
        
        })
        .catch(() => {
          alert("invalid location");
        });
    }
};


document.addEventListener('DOMContentLoaded' , () => {
    const data = new Data()
})