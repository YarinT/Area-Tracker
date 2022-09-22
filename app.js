const callsignsText = document.querySelectorAll('#callsign');
const altsText = document.querySelectorAll('#alt');

window.setTimeout(function () {
    window.location.reload();
}, 30000);

fetch('http://149.106.233.180/skyaware/data/aircraft.json')
    .then((response) => response.json())
    .then((data) => handleData(data));


function handleData(data) {
    data.aircraft.forEach(element => {
        if (element.squawk == 5103) {
            callsignsText[0].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[0].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[0].parentElement.classList.remove('clear');
            callsignsText[0].parentElement.classList.add('not-clear');
        } else if (element.squawk == 5102) {
            callsignsText[1].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[1].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[1].parentElement.classList.remove('clear');
            callsignsText[1].parentElement.classList.add('not-clear');
        } else if (element.squawk == 5105) {
            callsignsText[2].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[2].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[2].parentElement.classList.remove('clear');
            callsignsText[2].parentElement.classList.add('not-clear');
        } else if (element.squawk == 5111) {
            callsignsText[3].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[3].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[3].parentElement.classList.remove('clear');
            callsignsText[3].parentElement.classList.add('not-clear');
        } else if (element.squawk == 5112) {
            callsignsText[4].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[4].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[4].parentElement.classList.remove('clear');
            callsignsText[4].parentElement.classList.add('not-clear');
        } else if (element.squawk == 5113) {
            callsignsText[5].textContent = `בשימוש ע"י: ${element.flight == undefined ? 'לא זמין' : element.flight}`
            altsText[5].textContent = `גובה נוכחי: ${element.alt_baro} רגל`
            callsignsText[5].parentElement.classList.remove('clear');
            callsignsText[5].parentElement.classList.add('not-clear');
        }
    });
}