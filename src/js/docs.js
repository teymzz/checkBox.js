/* This script file is used for documentation purpose only */

  function pass(checker){
    input = document.getElementById('pass')
    if(checker.checked){
        input.setAttribute('type','text')
    }else{
        input.setAttribute('type','password')
    }
  }
  
    let checkbox = new CheckBox(true);
  
    checkbox.check({
        assign: {
            attr: ['data-anime', 'class'],
            alter: function(dataAnime){
                dataAnime.unshift('animated')
                return dataAnime.map(el => 'animate__' + el);
            }
        },
        toggle: function(checkbox) {
            let anime = [], value, animation;
  
            value     = checkbox.value;
  
            if(checkbox.checked){
                console.log(`checkbox ${value} is: checked`)
            }else{
                console.log(`checkbox ${value} is: unchecked`)
            }
        },
        flip: true, 
    })
  
  // #2 checker................................ 
  checkbox.check({
      target: '[checker]', 
      assign: {
          attr: ['data-anime', 'class', 'unchecked'],
          alter: (dataAnime) => {
              dataAnime.unshift('animated');      
              return dataAnime.map(el => 'animate__' + el);
          }
      },
      toggle: function(checkbox) {
  
          let value = checkbox.value;
          
          if( checkbox.checked ) {
              console.log(`checkbox ${value} is: checked`)
          } else {
              console.log(`checkbox ${value} is: unchecked`)
          }
  
      },
      flip: true,
  });
  
  
  function onCopy(btn) {  
  
    field = btn.parentNode.closest('.code').querySelector('pre');
  
    function copied(response){
        if(response){
            btn.innerText = 'Copied!'
  
            setTimeout(() => btn.innerText = 'Copy' , 500)
        }
    }
    
    function nativeCopy(field) {
      const range = document.createRange();
        range.selectNode(field);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        let response = document.execCommand('copy');
        window.getSelection().removeAllRanges();
        copied(response);
    }
  
    if (!navigator.clipboard) {
        // fallback for browsers that don't support clipboard API
        nativeCopy(field)
    } else { 
        navigator.clipboard.writeText(field.textContent)
            .then(() => copied(true))
            .catch(err => nativeCopy(field))
    }
  
  }
  
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function(event){
        onCopy(event.target);
    })
  })
  
  let tags = document.querySelectorAll('.tag');
  
  tags.forEach(tag => {
  
    let attributes = tag.children;
    attributes = {...attributes}
    for( let attribute in attributes) {
        
  
        attributes[attribute].classList.add('func');
  
        let attrvals = {...attributes[attribute].children};
  
        for(let attrval in attrvals) {
  
            attrvals[attrval].classList.add('var');
  
        }
  
  
    }
  
  });