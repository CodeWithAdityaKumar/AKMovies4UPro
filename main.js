let languageContents = document.querySelector(".languageContents .cards");
let highlightsContents = document.querySelector(".highlightsContents .cards");
let relatedContents = document.querySelector(".relatedContents .cards");
let allCards = document.querySelectorAll(".cards");


function playVideo(e) {
  let dataId = e.dataset.id;
  console.log(dataId)
  
  try {
    fetch("data.json")
      .then((e) => {
        return e.json()
      })
      .then((data) => {
        //console.log(data[1])
        
        let toSetData = data.filter((e)=>{
          return e.id == dataId;
        })
        
        document.querySelector(".videoDetails .title").innerHTML = toSetData[0].title;
        document.querySelector(".videoDetails .uploadDateTime .date .DTdata").innerHTML = toSetData[0].uploadDate.replaceAll("-", "/");
        
        document.querySelector("#frame").src = toSetData[0].videoURL;



        
        console.log(toSetData[0])
  
  
      })
  } catch (error) {
    console.log("something wrong")
  }
  
}



async function setData(file, container) {
  try{
    await fetch(file)
    .then((e)=>{
      return e.json()
    })
    .then((data)=>{
      //console.log(data[1])
      
      let html = "";
      
      data.forEach((e)=>{
        let card = `
        
            <div class="card" data-id="${e.id}" onclick="playVideo(this)">
      <div class="poster">
        <img src="${e.imageURL}" alt="" >
      </div>
      <div class="title">
        ${e.title}
      </div>
    </div>
        
        `
        
        html += card;
        
        
      })
      
      
      document.querySelector("." + container + " .cards").innerHTML = html;
      
    })
  } catch (error) {
    console.log("something wrong")
  }
}

setData("http://localhost:3000/", "languageContents")
setData("data.json", "highlightsContents")
setData("data.json", "relatedContents")