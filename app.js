const callsignsText = document.querySelectorAll('#callsign');
const altsText = document.querySelectorAll('#alt');
const statusEl = document.getElementById("status");
const faqEl = document.getElementsByClassName("faq")
let lastUpdated;

function updateData() {
    //statusEl.textContent = "מתחבר לשרת...";

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
    else if(rawreg == "4XDA0")
    {
        return rawreg = "4X-DAO"
    }
    else if(rawreg === "CGB")
    {
        return "4X-CGB";
    }
    else if(rawreg.includes("4X"))
    {
        return "4X-" + rawreg.substring(2);
    }
    // else if(rawreg == "7395???")   for future refrence :)
    // {
    //     return "4X???";
    // }
    const dashCountries = ["C", "D", "EC", "F", "G", "HA", "HB", "I", "LX", "LY", "OE", "OH", "OK", "OM", "OO", "OY", "PH", "SP", "SU", "TC", "UR", "VT", "VH", "VN", "VQ", "YR", "YU", "9M", "RP", "HS", "XY"];
    for (let i = 0; i < dashCountries.length; i++) {
      const country = dashCountries[i];
      if (rawreg.toUpperCase().startsWith(country)) {
        return country + "-" + rawreg.substring(country.length);
      }}
    return rawreg;
}

//Main Update Function
function updateArea(AreaNO,element)
{
    altsText[AreaNO].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
    if (callsignsText[AreaNO].textContent != `בשימוש ע"י: ${element.flight}`){
    callsignsText[AreaNO].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
    if(element.flight != undefined) 
    fetch(`https://imagescraper.yarintw.com/?reg=${GetRegNumber(element.flight)}`).then((response)=>{
    response.json().then((data)=>{
        if(data.image != undefined) {
            callsignsText[AreaNO].parentElement.parentElement.style.backgroundImage = `url("${data.image}")`;
            callsignsText[AreaNO].parentElement.classList.remove('clear');
            callsignsText[AreaNO].parentElement.classList.add('not-clear');
            callsignsText[AreaNO].parentElement.style.color = "white";}
        else 
            {
            callsignsText[AreaNO].parentElement.classList.remove('clear');
            callsignsText[AreaNO].parentElement.classList.add('not-clear');
            callsignsText[AreaNO].parentElement.style.color = "white"
            }
    })
    })
    else
    {
    callsignsText[AreaNO].parentElement.classList.remove('clear');
    callsignsText[AreaNO].parentElement.classList.add('not-clear');
    callsignsText[AreaNO].parentElement.style.color = "white";
    }
    }
}
function handleData(data) {
    // create a set of all the squawk codes in the data
    let squawkCodes = new Set();
    data.aircraft.forEach(element => {
        squawkCodes.add(element.squawk);
    });

    // check each area to see if the corresponding squawk code is still present
    for (let i = 0; i < 6; i++) {
        let squawkCode;
        if (i == 0) {
            squawkCode = "5103";
        } else if (i == 1) {
            squawkCode = "5102";
        } else if (i == 2) {
            squawkCode = "5105";
        } else if (i == 3) {
            squawkCode = "5111";
        } else if (i == 4) {
            squawkCode = "5112";
        } else if (i == 5) {
            squawkCode = "5113";
        }

        // if the squawk code is not present, clear the area
        if (!squawkCodes.has(squawkCode))
        {
            callsignsText[i].textContent = `האזור פנוי!`;
            altsText[i].textContent = ``
            callsignsText[i].parentElement.classList.remove('not-clear');
            callsignsText[i].parentElement.classList.add('clear');
            callsignsText[i].parentElement.style.color = "black";
            callsignsText[i].parentElement.parentElement.style.backgroundImage = '';
        }}
    
    data.aircraft.forEach(element => {
        //if(element.flight !== undefined)
        switch(element.squawk){
            case "5103":
                updateArea(0,element);
                break;
            case "5102":
                updateArea(1,element);
                break;
            case "5105":
                updateArea(2,element);
                break;
            case "5111":
                updateArea(3,element);
                break;
            case "5112":
                updateArea(4,element);
                break;
            case "5113":
                updateArea(5,element);
                break;
        }
    });
}