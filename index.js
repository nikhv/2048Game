document.addEventListener('DOMContentLoaded',()=>{
    const container=document.querySelector('.container')
    const score=document.getElementById('score')
    const result=document.getElementById('result')
    const width=4;
    let squares=[];
    let sco=0;
    //createing a playing board

    function createBoard(){
        for(let i=0;i<width*width;i++){
            square=document.createElement('div')
            square.innerHTML=0
            container.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()
    
    //Generate a random number for starting of game at start
    function generate(){
        let randm=Math.floor(Math.random()*(width*width))
        
        if(squares[randm].innerHTML==0){ // it will only place two it innerHTMl is zero else other condition will invoke
            squares[randm].innerHTML=2;
            checkforgameover();
        }else
            generate();
    } 
   
    //swipe right;

    function movetoright(){
        for(let i=0;i<width*width;i++){
            if(i%4===0){
                let totalOne= squares[i].innerHTML;
                let totalTwo=squares[i+1].innerHTML;
                let totalThree=squares[i+2].innerHTML;
                let totalFour=squares[i+3].innerHTML;
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                
                let filteredRow=row.filter(num=>num)
               
                let missing=4 -filteredRow.length;
                let zeros=Array(missing).fill(0);
                
                let newRow=zeros.concat(filteredRow);
                
                squares[i].innerHTML=newRow[0];
                squares[i+1].innerHTML=newRow[1];
                squares[i+2].innerHTML=newRow[2];
                squares[i+3].innerHTML=newRow[3]; 
            }
        }
    }
    function movetoleft(){
        for(let i=0;i<width*width;i++){
            if(i%4===0){
                let totalOne= squares[i].innerHTML;
                let totalTwo=squares[i+1].innerHTML;
                let totalThree=squares[i+2].innerHTML;
                let totalFour=squares[i+3].innerHTML;
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                
                let filteredRow=row.filter(num=>num)
                
                let missing=4 -filteredRow.length;
                let zeros=Array(missing).fill(0);
                
                let newRow=filteredRow.concat(zeros);
                
                squares[i].innerHTML=newRow[0];
                squares[i+1].innerHTML=newRow[1];
                squares[i+2].innerHTML=newRow[2];
                squares[i+3].innerHTML=newRow[3]; 
            }
        }
    }
    //swipe down function()
    function movetodown(){
        for(let i=0;i<4;i++){
            let totalOne=squares[i].innerHTML;
            let totalTwo=squares[i+(width)].innerHTML;
            let totalThree=squares[i+(width*2)].innerHTML;
            let totalFour=squares[i+(width*3)].innerHTML;
            let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

            let filteredColumn=column.filter(num=>num);
            let missing=4-filteredColumn.length;
            let zeros=Array(missing).fill(0);
            let newColumn=zeros.concat(filteredColumn);

            squares[i].innerHTML=newColumn[0]
            squares[i+width].innerHTML=newColumn[1]
            squares[i+width*2].innerHTML=newColumn[2]
            squares[i+width*3].innerHTML=newColumn[3]

            
        }
    }
    function movetoup(){
        for(let i=0;i<4;i++){
            let totalOne=squares[i].innerHTML;
            let totalTwo=squares[i+(width)].innerHTML;
            let totalThree=squares[i+(width*2)].innerHTML;
            let totalFour=squares[i+(width*3)].innerHTML;
            let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

            let filteredColumn=column.filter(num=>num);
            let missing=4-filteredColumn.length;
            let zeros=Array(missing).fill(0);
            let newColumn=filteredColumn.concat(zeros);

            squares[i].innerHTML=newColumn[0]
            squares[i+width].innerHTML=newColumn[1]
            squares[i+width*2].innerHTML=newColumn[2]
            squares[i+width*3].innerHTML=newColumn[3]
        }
    } 
    function combineRow(){
          for(let i=0;i<15;i++){
                if(squares[i].innerHTML===squares[i+1].innerHTML){
                let combineTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML=combineTotal;
                squares[i+1].innerHTML=0;
                sco+=combineTotal;
                score.innerHTML=sco;
            }
          }
          checkforWin();
    }
    function combineColumn(){
          for(let i=0;i<12;i++){
                if(squares[i].innerHTML===squares[i+width].innerHTML){
                let combineTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML=combineTotal;
                squares[i+width].innerHTML=0;
                sco+=combineTotal;
                score.innerHTML=sco;
            }
          }
          checkforWin();
    }
    function control(e){
        
        if(e.keyCode===39){
            keyright();
        }else if(e.keyCode===37){
            keyleft(); 
        }else if(e.keyCode===38){
            keyup();
        }else if(e.keyCode===40){
            keydown();
        }
    }
    
    document.addEventListener('keyup',control);
    function keyright(){
        movetoright();
        combineRow();
        movetoright();
        generate();
    }
    function keyleft(){
        movetoleft();
        combineRow();
        movetoleft();
        generate();
    }
    function keydown(){
        movetodown();
        combineColumn();
        movetodown();
        generate();
    }
    function keyup(){
        movetoup();
        combineColumn();
        movetoup();
        generate();
    }
    //  check for number 2048 in the square to win

    function checkforWin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML==2048){
               result.innerHTML='You Win!';
               document.removeEventListener('keyup',control)
            }
        }
    }

    function checkforgameover(){
        let zeros=0;
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML==0){
                zeros++;
            }
        }
        if(zeros===0){
            result.innerHTML='You lose!';
            document.removeEventListener('keyup',control)
           
        }
    }
})