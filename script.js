let B7validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send=true

        let inputs=form.querySelectorAll('input')

        B7validator.clearErrors()

        for(let i=0; i<inputs.length; i++){
            let input = inputs[i]
            let check = B7validator.checkInput(input)
            if(check !== true){
                send=false
                // exibir o erro
                B7validator.showError(input, check);
            }
        }

        if(send){
            form.submit()
        }
    },
    checkInput:(input)=>{
        let rules=input.getAttribute('data-rules')
        if(rules != null){
            rules=rules.split('|')
            for(let k in rules){
                let rDetails=rules[k].split('=')
                switch(rDetails[0]){
                    case 'required':
                        if(input.value==''){
                            return 'Campo nao pode ser vazio'
                        }
                    break;
                    case 'min':
                        if(input.value.length<rDetails[1]){
                            return 'Campo precisa ter pelo menos '+rDetails[1]+' caracteres'
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(!regex.test(input.value.toLowerCase())) {
                                    return 'E-mail digitado não é válido!';
                                }
                        }
                    break;
                }
            }
        }

        return true
    },
    showError:(input, error)=>{
        input.style.borderColor='#ff0000'

        let errorElement=document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML=error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors:()=>{
        let inputs=form.querySelectorAll('input')
        for(let i=0; i<inputs.length;i++){
            inputs[i].style=''
        }

        let errorElements = document.querySelectorAll('.error')
        for(let i=0; i<errorElements.length; i++){
            errorElements[i].remove()
        }
    }
}

let form = document.querySelector('.b7validator')
form.addEventListener('submit', B7validator.handleSubmit )













