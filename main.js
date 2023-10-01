let blockContainers=document.querySelector(".memory-game-blocks");
let stp=document.querySelectorAll(".game-block");
let player=document.getElementById("player");
window.onload=function(){
    
        player.innerHTML=`Player  ${window.localStorage.getItem("name")} made ${window.localStorage.getItem("tries")} wrong tries`;
        setTimeout(() => {
            window.localStorage.clear();
        }, 2000);
    
}
function myStopFunction() {
    clearInterval(finish);
  }

let time=10;
document.querySelector(".control-buttons span").onclick=function(){
    let yourName=prompt("whats is your name?");
    if(yourName==null || yourName==""){
        document.querySelector(".name span").innerHTML="Unknown";
        window.localStorage.setItem("name",document.querySelector(".name span").innerHTML);
      let stop=  setInterval(function()  {
            document.getElementById("time").innerHTML=`Timer :${time} sec`;
            if(time===0){
                
                player.innerHTML=`Player  ${document.querySelector(".name span").innerHTML} made ${window.localStorage.getItem("tries")} wrong tries`;
            //    document.getElementById("game").pause();
                setTimeout(() => {
                    document.getElementById("lose").play();
                }, 700);
                
                stp.forEach(item=>{
                    item.classList.add("has-stoped");

                })
                clearInterval(stop);
                document.getElementById("finish").style.visibility="visible";
               
                
            }
            time--;
          
           
           
        }, 1000);
        player.innerHTML=`Welcome ${document.querySelector(".name span").innerHTML}`;

        
        // document.getElementById("game").play();
    }else{
        document.querySelector(".name span").innerHTML=yourName;
        window.localStorage.setItem("name",yourName);
       
        let finish =  setInterval(function()  {
            document.getElementById("time").innerHTML=`Timer :${time} sec`;
            if(time===0){
                player.innerHTML=`Player  ${document.querySelector(".name span").innerHTML} made ${window.localStorage.getItem("tries")} wrong try`;
                // document.getElementById("game").pause();
                setTimeout(() => {
                    document.getElementById("lose").play();
                }, 700);
                
                stp.forEach(item=>{
                    item.classList.add("has-stoped")
                })
                clearInterval(finish);
                document.getElementById("finish").style.visibility="visible";
                
            
           
           }
            time--; 
          
           
            
        }, 1000);
        player.innerHTML=`Welcome ${document.querySelector(".name span").innerHTML}`;

        // document.getElementById("game").play();
    }
    document.querySelector(".control-buttons").remove();
};
let duration=1000;

let blocks=Array.from(blockContainers.children);
console.log(blocks);
let orderRange=Array.from(Array(blocks.length).keys());
blocks.forEach((block,index)=>{
block.style.order=orderRange[index];
shuffle(orderRange);

block.addEventListener("click",function(){
    flipBlock(block);
    

})
});

function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped");
    let allFlippedBlocks=blocks.filter(flippedBlock=>flippedBlock.classList.contains("is-flipped"));
    if(allFlippedBlocks.length===2){
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
   
    
};


function stopClicking(){
    blockContainers.classList.add("no-clicking");
    setTimeout(()=>{
        blockContainers.classList.remove("no-clicking");
    
},duration);
}
function checkMatchedBlocks(firstBlock,secondBlock){
    let tries=document.querySelector(".tries span");
    if(firstBlock.dataset.technology===secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();
    }else{
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        setTimeout(()=>{
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration);
        document.getElementById("failure").play();
        
    }
    window.localStorage.setItem("tries",tries.innerHTML);
}
function  shuffle(array){
    let current=array.length,
    temp,
    random;
    while(current>0){
        random=Math.floor(Math.random()*current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array;

}
