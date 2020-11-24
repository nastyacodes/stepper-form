let fsm = new StateMachine({
    init: 'solid',
    transitions: [
      { name: 'check',   from: 'nameInput',       to: 'nameValidation' },
      { name: 'error',   from: 'nameValidation',  to: 'nameInput'  },
      { name: 'success', from: 'nameValidation',  to: 'roleInput'},
      { name: 'check',   from: 'roleInput',       to: 'roleValidation' },
      { name: 'error',   from: 'roleValidation',  to: 'roleInput'  },
      { name: 'success', from: 'roleValidation',  to: 'agreeInput'},
      { name: 'check',   from: 'agreeInput',      to: 'agreeValidation' },
      { name: 'error',   from: 'agreeValidation', to: 'agreeInput'  },
      { name: 'success', from: 'agreeValidation', to: 'formSubmit'}
    ],
    methods: {
      onNameInputCheck:    function() { console.log('Перевірка введеного імені') },
      onNameInputError:    function() { console.log('Помилка при введені імені') },
      onNameInputSuccess:  function() { console.log('Введення імені успішно перевірено') },
      onRoleInputCheck:    function() { console.log('Перевірка введеної ролі') },
      onRoleInputError:    function() { console.log('Помилка при введені ролі') },
      onRoleInputSuccess:  function() { console.log('Введення ролі успішно перевірено') },
      onAgreeInputCheck:   function() { console.log('Перевірка погодження з умовами') },
      onAgreeInputError:   function() { console.log('Помилка при погодженні з умовами') },
      onAgreeInputSuccess: function() { console.log('Погодження з умовами успішно перевірено') }
    }
});

let currentTab = 0; // ПОТОЧНИЙ СТАН
let tabs = document.getElementsByClassName("tab");
showTab(currentTab); // показуємо перший крок

function showTab(n) {

    tabs[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (tabs.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Відправити";
  } else {
    document.getElementById("nextBtn").innerHTML = "Далі";
  }
  
  fixStepIndicator(n)
}

function nextPrev(n) {

  if (n == 1 && !validateForm()) return false;
  tabs[currentTab].style.display = "none";
 
  currentTab = currentTab + n;
 
  if (currentTab >= tabs.length) {
    document.getElementById("regForm").submit();
    return false;
  }

  showTab(currentTab);
}

function validateForm() {

  let valid = false;
  const label = tabs[currentTab].querySelector("label");

  if (currentTab === 0) {
    const inputs = tabs[currentTab].getElementsByTagName("input");
    valid = true;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            label.classList.add('invalid');
            valid = false;
            break;
        }
        label.classList.remove('invalid');
    }
    
  } else if (currentTab === 1) {
    const radios = tabs[currentTab].querySelectorAll("#role");

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          valid = true;
          label.classList.remove('invalid');
          break;
        }
    }
    if (valid === false) {
        label.classList.add('invalid');
    }
  } else {
        const checkbox = tabs[currentTab].querySelector("#agreeCheck");
        if (checkbox.checked) {
            alert('checked')
            valid = true;
            label.classList.remove('invalid');
        } else {
            alert('unchecked')
            valid = false;
            label.classList.add('invalid');
        }
  }
  
  if (valid) {
    document.getElementsByClassName("step")[currentTab].classList.add('finish');
  }
  return valid; 
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  const steps = document.getElementsByClassName("step");
  for (i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  steps[n].className += " active";
}