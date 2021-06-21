let energySlider = document.getElementById('sliderEnergy');
let valenceSlider = document.getElementById('sliderValence');
let danceabilitySlider = document.getElementById('sliderDanceability');
let modeSwitch = document.getElementById('switchMode');
let changed = false;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const energy = urlParams.get('energy')
const valence = urlParams.get('valence')
const danceability = urlParams.get('danceability')
const mode = urlParams.get('mode')
const link = urlParams.get('link')


var ctx = document.getElementById('radarChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Danceability', 'Energy', 'Valence'],
        datasets: [{    //anche più di un dataset, potremmo fare 1 grafico per il primo beat e 1 grafico per quello modificato
            label: 'New features values',
            data: [danceability*100, energy*100, valence*100,],
            backgroundColor: [
                'rgba(248, 104, 235, 0.2)',
            ],
            borderColor: [
                '#f300ef',
            ],
            borderWidth: 1
        },
        {    //second dataset
            label: 'Previous features values',
            data: [danceability*100, energy*100, valence*100,],
            backgroundColor: [
                'rgba(224, 251, 255, 0.7)',
            ],
            borderColor: [
                '#16fef1',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                grid: {
                    color: '#949494'
                },
                angleLines: {
                    color: '#bcbcbc'
                }, 
                ticks:{
                    display: false,
                    backgroundColor:'black',
                    font:{
                        size:15
                    }
                },
                pointLabels: {
                    color: '#bcbcbc',
                    font:{
                        size: 20
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 16
                    },
                    color: '#bcbcbc'
                }
            }
        }
    }
});

energySlider.value = (energy*100).toString()
valenceSlider.value = (valence*100).toString()
danceabilitySlider.value = (danceability*100).toString()
modeSwitch.checked = (mode=="1") ? true : false

if(!modeSwitch.checked){
    document.getElementsByClassName("modeText")[0].style.transform="translateX(40px)";
    document.getElementsByClassName("modeText")[0].innerHTML="Minor"
}
else{
    document.getElementsByClassName("modeText")[0].style.transform="translateX(0px)";
    document.getElementsByClassName("modeText")[0].innerHTML="Major"
}


energySlider.onchange  = (e)=>{
    if(!changed)
        changed = true;
    myChart.data.datasets[0].data[1] = e.target.value;
    myChart.update();
};
valenceSlider.onchange  = (e)=>{
    if(!changed)
        changed = true;
    myChart.data.datasets[0].data[2] = e.target.value;
    myChart.update();
};
danceabilitySlider.onchange  = (e)=>{
    if(!changed)
        changed = true;
    myChart.data.datasets[0].data[0] = e.target.value;
    myChart.update();
};
modeSwitch.onchange = (e)=>{
    if(!e.target.checked){
        document.getElementsByClassName("modeText")[0].style.transform="translateX(40px)";
        document.getElementsByClassName("modeText")[0].innerHTML="Minor"
    }
    else{
        document.getElementsByClassName("modeText")[0].style.transform="translateX(0px)";
        document.getElementsByClassName("modeText")[0].innerHTML="Major"
    }
        
};


document.getElementById("continueButton").onclick = ()=>{
    document.getElementById("rescan").click()
}

document.getElementById("spotifyPlayer").src = link;