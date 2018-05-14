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
        const RULES = {
          REQUIRED: 'required',
          NUMBER: 'number',
          EMAIL: 'email'
        }

        // let isRequired = binding.arg === RULES.REQUIRED

        let validationRules = binding.value

        console.log('event', Object.keys(validationRules))
        element.addEventListener ('submit', (event) => {
          
          
          event.preventDefault()
          Object.keys(validationRules).forEach(key => {
            if (validationRules[key].indexOf(RULES.REQUIRED) > -1) {
              let messageElement = document.createElement ('div')
              messageElement.innerElement = '${key.tuUpperCase()} is required'
              element.appendChild(messageElement)
            }
          });
          event.preventDefault()
        })
       
      }

    })
  }
}

export default MyDirectives