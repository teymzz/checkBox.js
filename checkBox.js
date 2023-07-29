class CheckBox {

    constructor(config) {

        let checkbox = this;
        
        let defaults, customBoxes, init, toggle, size, checkEvent;

        defaults = {
            target: '[checkbox]',
            marker: '[marker]',
            init:   function(){},
            toggle: function(){},
            flip: false,
            size: null,
        };

        config = {...defaults, ...config};

        checkbox.target = config.target;
        checkbox.marker = config.marker;
        checkbox.flip = config.flip;

        init = config.init;
        toggle = config.toggle;
        size = config.size;

        if(typeof Selector === 'function'){
            let selector = new Selector;
            customBoxes = selector.select(checkbox.target);
        }else{
            customBoxes = document.querySelectorAll(checkbox.target)
        }
        
        checkEvent = function(input){
            let customBox, checker = {};
                    
            //get input element 
            customBox = input.previousElementSibling;

            if(input.tagName === 'INPUT'){

                checker.native = input;
                checker.custom = customBox;
                checker.marker = customBox.querySelectorAll(checkbox.marker);
                checker.value = input.value;

                let marker1, marker2;

                if(checkbox.flip && (checkbox.marker.length > 1)){
                    marker1 = checker.marker[0];
                    marker2 = checker.marker[1];
                }

                if(input.checked) {
                    //run for check
                    checker.checked = true;
                    input.setAttribute('checked', 'checked');
                    customBox.setAttribute('checkbox', 'checked');
                    if(marker2){
                        marker1.setAttribute('hidden','');
                        marker2.removeAttribute('hidden');
                    }
                }else{
                    //run for uncheck 
                    checker.checked = false;
                    input.removeAttribute('checked');
                    customBox.setAttribute('checkbox', 'unchecked'); 
                    if(marker2){
                        marker1.removeAttribute('hidden');
                        marker2.setAttribute('hidden','');
                    }
                }

                checker.init = init;

                if(typeof toggle === 'function') toggle(checker);

            }else{

                console.error('next element of custom checkbox must be an input checkbox')

            }
        }
        
        customBoxes.forEach(customBox => {

            //set custom checkbox sibling
            let input = customBox.nextElementSibling;
            let inputType = input.getAttribute('type');

            if(
                (input.tagName === 'INPUT') && inputType &&
                (inputType.toLowerCase() === 'checkbox')
            ){

                input.setAttribute('hidden', '');

                let marker  = customBox.querySelectorAll(checkbox.marker);

                let marker1, marker2;

                if(checkbox.flip && (marker.length > 1)){
                    marker1 = marker[0];
                    marker2 = marker[1];
                    if(size){
                        marker1.style.width = size;
                        marker1.style.height = size;
                        marker2.style.width = size;
                        marker2.style.height = size;
                    }
                }

                //set default behaviour
                if(input.checked){
                    customBox.setAttribute('checkbox', 'checked'); 
                    if(marker2){
                        marker1.setAttribute('hidden','');
                        marker2.removeAttribute('hidden');
                    }
                }else{
                    customBox.setAttribute('checkbox', 'unchecked');
                    if(marker2){
                        marker1.removeAttribute('hidden');
                        marker2.setAttribute('hidden','');
                    }  
                }

                if(typeof init === 'function'){
                    init({native:input, custom: customBox, marker: marker, checked: (input.checked), value: (input.value)});
                }

                customBox.addEventListener('click', function(){
                    input.click();
                })

                input.addEventListener('click', function(){
                    
                    checkEvent(this)

                });          

            }

        })
        
    }

}