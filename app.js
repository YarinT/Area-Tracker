const callsignsText = document.querySelectorAll('#callsign');
const altsText = document.querySelectorAll('#alt');
const statusEl = document.getElementById("status");
const faqEl = document.getElementsByClassName("faq")
let lastUpdated;



function updateData() {
    statusEl.textContent = "מתחבר לשרת...";

    fetch('http://149.106.233.180/skyaware/data/aircraft.json')
    .then((response) => {
        if(response.ok) {
            lastUpdated = new Date().toLocaleTimeString();
            statusEl.textContent = `מחובר לשרת. עודכן בשעה ${lastUpdated}`;
            statusEl.style.backgroundColor = "var(--connected)"
            return response.json();
        }else{
            statusEl.textContent = "Error:" + response.status;
        }
    })
    .then((data) => handleData(data))
    .catch((error) => {
        statusEl.textContent = "אין חיבור לשרת. המידע לא עדכני!";
        statusEl.style.backgroundColor = "var(--notclear)"
    });
}

updateData();
setInterval(updateData, 30000);
//Mode S callsign problems fixing...
function GetRegNumber(rawreg) {
    rawreg = rawreg.replace(/\s/g, ""); // Remove any whitespace characters from rawreg
    if(rawreg === "4XCD0")
    {
        return "4X-CDO"
    }
    else if(rawreg === "CGB")
    {
        return "4X-CGB";
    }
    else if(rawreg.includes("4X"))
    {
        return "4X-" + rawreg.substring(2);
    }
    const dashCountries = ["C", "D", "EC", "F", "G", "HA", "HB", "I", "LX", "LY", "OE", "OH", "OK", "OM", "OO", "OY", "PH", "SP", "SU", "TC", "UR", "VT", "VH", "VN", "VQ", "YR", "YU", "4X", "9M", "RP", "HS", "XY"];
    for (let i = 0; i < dashCountries.length; i++) {
      const country = dashCountries[i];
      if (rawreg.toUpperCase().startsWith(country)) {
        return country + "-" + rawreg.substring(country.length);
      }}
    return rawreg;
}


function handleData(data) {
    console.log(statusEl.textContent)

    // create a set of all the squawk codes in the data
    let squawkCodes = new Set();
    data.aircraft.forEach(element => {
        squawkCodes.add(element.squawk);
    });

    // check each area to see if the corresponding squawk code is still present
    for (let i = 0; i < 6; i++) {
        let squawkCode;
        if (i == 0) {
            squawkCode = 5103;
        } else if (i == 1) {
            squawkCode = 5102;
        } else if (i == 2) {
            squawkCode = 5105;
        } else if (i == 3) {
            squawkCode = 5111;
        } else if (i == 4) {
            squawkCode = 5112;
        } else if (i == 5) {
            squawkCode = 5113;
        }

        // if the squawk code is not present, clear the area
        if (!squawkCodes.has(squawkCode)) {
            callsignsText[i].textContent = `האזור פנוי!`;
            altsText[i].textContent = ``
            callsignsText[i].parentElement.classList.remove('not-clear');
            callsignsText[i].parentElement.classList.add('clear');
            callsignsText[i].parentElement.parentElement.style.backgroundImage = '';
        }
    }
    
    data.aircraft.forEach(element => {

        if (element.squawk == 5103) {

            callsignsText[0].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[0].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[0].parentElement.classList.remove('clear');
            if(element.flight != undefined) 
            fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
            response.json().then((data)=>{
                if(data.image != undefined) {
                    callsignsText[0].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
                    callsignsText[0].parentElement.classList.add('not-clear');}
                else callsignsText[0].parentElement.classList.add('not-clear');
            })
            })

        } else if (element.squawk == 5102) {
            callsignsText[1].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[1].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[1].parentElement.classList.remove('clear');
            if(element.flight != undefined) 
            fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
            response.json().then((data)=>{
                if(data.image != undefined) {
                    callsignsText[1].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
                    callsignsText[1].parentElement.classList.add('not-clear');}
                else callsignsText[1].parentElement.classList.add('not-clear');
            })
            })

        } else if (element.squawk == 5105) {
            callsignsText[2].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[2].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[2].parentElement.classList.remove('clear');
            if(element.flight != undefined) 
            fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
            response.json().then((data)=>{
                if(data.image != undefined) {
                    callsignsText[2].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
                    callsignsText[2].parentElement.classList.add('not-clear');}
                else callsignsText[2].parentElement.classList.add('not-clear');
            })
            })

        } else if (element.squawk == 5111) {
            callsignsText[3].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[3].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[3].parentElement.classList.remove('clear');
            if(element.flight != undefined) 
            fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
            response.json().then((data)=>{
                if(data.image != undefined) {
                    callsignsText[3].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
                    callsignsText[3].parentElement.classList.add('not-clear');}
                else callsignsText[3].parentElement.classList.add('not-clear');
            })
            })

        } else if (element.squawk == 5112) {
            callsignsText[4].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[4].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[4].parentElement.classList.remove('clear');
            if(element.flight != undefined) 
            fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
            response.json().then((data)=>{
                if(data.image != undefined) {
                    callsignsText[4].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
                    callsignsText[4].parentElement.classList.add('not-clear');}
                else callsignsText[4].parentElement.classList.add('not-clear');
            })
            })

        } else if (element.squawk == 5113) {
            callsignsText[5].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[5].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[5].parentElement.classList.remove('clear');
            if(element.flight != undefined) 
            fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
            response.json().then((data)=>{
                if(data.image != undefined) {
                    callsignsText[5].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
                    callsignsText[5].parentElement.classList.add('not-clear');}
                else callsignsText[5].parentElement.classList.add('not-clear');
            })
            })
        }
    });
}