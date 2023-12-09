let pressTimer;
let link = document.querySelectorAll('.nav-btn-lt');

// Common function for handling long press logic
function handleLongPress(e) {
    
    let ul = document.querySelector('.nav-pane ul');
    ul.classList.add('open');
    
    document.addEventListener('touchend', function() {
      let ul = document.querySelector('.nav-pane ul');
      setTimeout(() => { ul.classList.remove('open');  }, 5000);
    });

}

link.forEach(element => {
   
   let counter = 0, interval;
  
    // For touchscreen and mouse left button long press
    element.addEventListener('mousedown', function() {
        pressTimer = setTimeout(handleLongPress); // Adjust the duration as needed
    });
    
    element.addEventListener('touchstart', function(e) {
        counter = 0;
        e.preventDefault();
        interval = setInterval(() => {
          counter++
          if(counter > 100){
            clearInterval(interval);
            pressTimer = setTimeout(handleLongPress);
          }
        } );
    });
    
    // Clear the timer on mouse/touch release
    element.addEventListener('mouseup', function(e) {
        clearTimeout(pressTimer);
    });
    
    element.addEventListener('touchend', function(e) {
        if(counter < 100) {

          clearInterval(interval)
          window.location.href = element.getAttribute('href')

          counter = 0;
        }
        clearTimeout(pressTimer);
    });
  
})