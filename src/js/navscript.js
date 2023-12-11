let pressTimer, link, options;

link = document.querySelectorAll('.nav-btn-lt');

options = () => {

  return {
    open:() =>{
      let ul = document.querySelector('.nav-pane ul');
      ul.classList.add('open');
    },
    close: ()=>{
      let ul = document.querySelector('.nav-pane ul');
      setTimeout(() => { ul.classList.remove('open');  }, 5000);
    }
  }

}

function handleLongPress(e) {
    options().open()
}

function pressDown(e){
  e.preventDefault()
    counter = 0;
    interval = setInterval(() => {
      counter++
      if(counter > 20){
        clearInterval(interval);
        pressTimer = setTimeout(handleLongPress);
      }
    } );  
}

function pressRelease(e){
    if(counter < 20) {
      clearInterval(interval)
      window.location.href = e.target.getAttribute('href');

      counter = 0;
    }else{
      options().close();
    }
    clearTimeout(pressTimer);  
}

link.forEach(element => {
   
    let counter = 0, interval;

    //handler mouse events
    element.addEventListener('click', (e) => e.preventDefault())

    element.addEventListener('mousedown', (e) => pressDown(e));

    element.addEventListener('mouseup', (e) => pressRelease(e));
    
    //handle touch events
    element.addEventListener('touchstart', (e) => pressDown(e));
    
    element.addEventListener('touchend', (e) => pressRelease(e));
  
})