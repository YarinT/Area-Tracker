const callsignsText = document.querySelectorAll('#callsign');
const altsText = document.querySelectorAll('#alt');

// window.setTimeout(function () {
//     window.location.reload();
// }, 30000);

fetch('http://172.27.88.73:8080/dump1090-fa/data/aircraft.json')
    .then((response) => response.json())
    .then((data) => handleData(data));


function handleData(data) {
    console.table(data);
}