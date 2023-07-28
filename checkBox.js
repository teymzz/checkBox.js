class CheckBox {

    constructor(controls) {

        let checkbox = this;
        
        let defaults, itemSelector, selectors, init, toggle, size, checkEvent;

        defaults = {
            control: '[checkbox]',
            marker: '[marker]',
            init:   function(){},
            toggle: function(){},
            flip: false,
            size: null,
        };

        controls = {...defaults, ...controls};

        checkbox.control = controls.control;
        checkbox.marker = controls.marker;
        checkbox.flip = controls.flip;

        init = controls.init;
        toggle = controls.toggle;
        size = controls.size;

        if(typeof Selector === 'function'){
            itemSelector = new Selector;
            selectors = itemSelector.select(checkbox.control);
        }else{
            selectors = document.querySelectorAll(checkbox.control)
        }
        
        checkEvent = function(input){
            let selector, controls = {};
                    
            //get input element 
            selector = input.previousElementSibling;

            if(input.tagName === 'INPUT'){

                //get marker 
                controls.selector = selector;
                controls.marker  = selector.querySelectorAll(checkbox.marker);
                controls.control = input;

                let marker1, marker2;

                if(checkbox.flip && (checkbox.marker.length > 1)){
                    marker1 = controls.marker[0];
                    marker2 = controls.marker[1];
                }

                if(input.checked) {
                    //run for check
                    controls.checked = true;
                    input.setAttribute('checked', 'checked');
                    selector.setAttribute('checkbox', 'checked');
                    if(marker2){
                        marker1.setAttribute('hidden','');
                        marker2.removeAttribute('hidden');
                    }
                }else{
                    //run for uncheck 
                    controls.checked = false;
                    input.removeAttribute('checked');
                    selector.setAttribute('checkbox', 'unchecked'); 
                    if(marker2){
                        marker1.removeAttribute('hidden');
                        marker2.setAttribute('hidden','');
                    }
                }

                controls.init = init;

                if(typeof toggle === 'function') toggle(controls);

            }else{

                console.error('next element of custom checkbox must be an input checkbox')

            }
        }
        
        selectors.forEach(selector => {

            //set custom checkbox sibling
            let checker = selector.nextElementSibling;
            let inputType = checker.getAttribute('type');

            if(
                (checker.tagName === 'INPUT') && inputType &&
                (inputType.toLowerCase() === 'checkbox')
            ){

                checker.setAttribute('hidden', '');

                let marker  = selector.querySelectorAll(checkbox.marker);

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
                if(checker.checked){
                    selector.setAttribute('checkbox', 'checked'); 
                    if(marker2){
                        marker1.setAttribute('hidden','');
                        marker2.removeAttribute('hidden');
                    }
                }else{
                    selector.setAttribute('checkbox', 'unchecked');
                    if(marker2){
                        marker1.removeAttribute('hidden');
                        marker2.setAttribute('hidden','');
                    }  
                }

                if(typeof init === 'function'){
                    init({selector: selector, control:checker, checked: (checker.checked)});
                }

                selector.addEventListener('click', function(){
                    checker.click();
                })

                checker.addEventListener('click', function(){
                    
                    checkEvent(this)

                });          

            }

        })
        
    }

}