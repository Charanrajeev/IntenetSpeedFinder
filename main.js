const button = document.querySelector('.button')
 const size = 1574894 * 8;
 const count = 100;
 
 let testArray = [];
 let progress = document.querySelector('.progress')
 let speedTxt = document.querySelector('.speed-text')

function loadImage(){
    return new Promise((resolve,reject) => {
        let image = new Image()
        image.src = "./mypic.jpg?" + parseInt(Math.random() * 10000)//this is only for casche problem
        let starttime = Date.now();
        image.onload = function(){
            let endtime = Date.now();
          resolve(endtime-starttime)
        }
        image.onerror = function(err){
            reject(error)
        }
    })
    
}
async function getLoadSpeed()
{
    let loadTime = await loadImage();
    if(loadTime<1) loadTime=1
    let speed_bps = size/loadTime
    let speed_kbps = speed_bps/1024
    return speed_kbps
}
function getAvgSpeed()
{
    let sum = testArray.reduce((a,b) => a+b , 0)
    return sum / testArray.length;
}
button.addEventListener('click',async function(){
    for(let i = 0;i<count;i++){
        let speed = await getLoadSpeed();
        testArray.push(speed);
        progress.style.width = (((i+1)/count) * 100) + '%'
        speedTxt.innerText = getAvgSpeed().toFixed(2) + ' kbps'

    }
    console.log(getAvgSpeed())
    
})
