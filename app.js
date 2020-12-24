let currentTab = 0;
let tabs = document.querySelectorAll('.tab');
const stepsSection = document.querySelector('.steps');
const steps = document.querySelectorAll('.step');
const buttonsSection = document.querySelector('.buttons');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const message = document.querySelector('.message');

showTab(currentTab);

prevBtn.addEventListener('click', () => {
    nextPrev(-1)
});
nextBtn.addEventListener('click', () => {
    nextPrev(1)
});

function showTab(n) {

    tabs[n].style.display = "block";
    console.log(n)

  if (n === -1) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === (tabs.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Відправити";
  } else {
    document.getElementById("nextBtn").innerHTML = "Далі";
  }
  
  fixStepIndicator(n)
}

function nextPrev(n) {

  if (n === 1 && !validateForm()) return false;
  tabs[currentTab].style.display = "none";
 
  currentTab = currentTab + n;
 
  if (currentTab >= tabs.length) {
      submitForm();
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
        if (inputs[i].value === '') {
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

  for (i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  steps[n].className += " active";
}

function submitForm() {
    stepsSection.style.display = 'none';
    buttonsSection.style.display = 'none';
    message.classList.add('show');
}