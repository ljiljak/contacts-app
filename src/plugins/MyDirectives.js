import validator from 'validator'


const RULES = {
          REQUIRED: 'required',
          NUMBER: 'number',
          EMAIL: 'email'
        }

const MESSAGES_CLASSNAME = 'validator-messages'




const removeMessageErrorElements = (element) => {
  //remove old messege
  let oldMessageElements = 
    element.querySelectorAll(`#${MESSAGES_CLASSNAME}`)
    oldMessageElements.forEach((oldMessageElement) => {
      oldMessageElement.remove()
    })
}

const showMessageErrorElement = (element, message) => {
  let messageElement = document.createElement ('div')
  messageElement.id = MESSAGES_CLASSNAME
  messageElement.innerHTML = message
  element.appendChild(messageElement)
}

const MyDirectives = {
  install: function(Vue) {
    
    Vue.directive('focus', {
      inserted: function(element) {
        element.focus()
        console.log(element)
      }
    })

    // v-validate:required.email
    Vue.directive('validate', {
      inserted: function(element, binding) {
        let validationConfig = binding.value
        let validationRules = validationConfig.validationRules

        element.addEventListener ('submit', (event) => {
          let errorCounter = 0
          event.preventDefault()
          Object.keys(validationRules).forEach(key => {
            let input = element.querySelector(`#${key}`)
            if (!input) {
              throw new Error('Element for validation rule ${key} not found!')
            }

            removeMessageErrorElements(element)

            if (validationRules[key].indexOf(RULES.EMAIL) > -1
              && !validator.isEmail(input.value)) {
                errorCounter++
                showMessageErrorElement(element, 'This field must be email')
              }
            

            if (validationRules[key].indexOf(RULES.REQUIRED) > -1 && !input.value.length) {
              errorCounter++
              showMessageErrorElement(element, `${key.toUpperCase()} is required`)

            } 
          });
          if (errorCounter === 0) {
            validationConfig.submitCallback()
          }
          
          event.preventDefault()
        })
       
      }

    })
  }
}

export default MyDirectives