var ctx = document.getElementById('radarChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Energy', 'Valence', 'Danceability','Mode'],
        datasets: [{    //anche più di un dataset, potremmo fare 1 grafico per il primo beat e 1 grafico per quello modificato
            label: 'Pervious features values',
            data: [12, 19, 30, 25],
            backgroundColor: [
                'rgba(248, 104, 235, 0.2)',
            ],
            borderColor: [
                '#f300ef',
            ],
            borderWidth: 1
        },
        {    //second dataset
            label: 'New features values',
            data: [85,24,73,52],
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
                    color: '#949494'
                }, 
                ticks:{
                    display: false,
                    backgroundColor:'black',
                    font:{
                        size:15
                    }
                },
                pointLabels: {
                    color: '#949494',
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
                        size: 17
                    }
                }
            }
        }
    }
});