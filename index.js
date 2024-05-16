//Dark Mode
document.addEventListener("DOMContentLoaded", function() {
  let themeButton = document.getElementById("theme-button");
  
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  }
  themeButton.addEventListener("click", toggleDarkMode);

  // Add your query for the sign now button here
  let signNowButton = document.getElementById("sign-now-button");

  const addSignature = (person) => {
    let newSignature = document.createElement("p");

    newSignature.textContent = `🖊️ ${person.name} from  ${person.hometown} supports this.`;
    let signNow = document.getElementsByClassName("signatures")[0];
    signNow.appendChild(newSignature);
  }

  // Add a click event listener to the sign now button here
  //signNowButton.addEventListener("click", addSignature);

  const validateForm = (person) => {
    let containsErrors = false;

    let petitionInputs = document.getElementById("sign-petition").elements;

    // let person = {
    //   // name: document.getElementById("name").value,
    //   // hometown: document.getElementById("hometown").value

    //   name: petitionInputs[0].value;
    // hometown: petition
    // };
    person.name = petitionInputs[0].value;
    person.hometown = petitionInputs[1].value;
    
    for (let i = 0; i < petitionInputs.length; i++) {
      if (person.name.length < 2) {
        petitionInputs[i].classList.add('error');
        containsErrors = true;
      }
      else {
        petitionInputs[i].classList.remove('error');
      }
    }

    if (containsErrors === false) {
      addSignature(person);
      toggleModal(person);
      for (let i = 0; i < petitionInputs.length; i++) {
        petitionInputs[i].value = "";
        containsErrors = false;
      }
    }

  }

  signNowButton.removeEventListener('click', addSignature);
  signNowButton.addEventListener('click', validateForm);
});

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

//Animation
let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
};

window.addEventListener('scroll', reveal);
reveal();

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

scaleImage = () => {
  if (scaleFactor === 1.0) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1.0;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}


toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-content-modal");
  modal.classList.toggle("active");
  modal.style.display = "flex";
  modalContent.innerHTML = `Thank you so much ${person.name} for the support!`;

  let intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
}

let modalButton = document.getElementById("close-modal");

const closeModal = () => {
  let modal = document.getElementById("thanks-modal");
  modal.classList.remove("active");
  modal.style.display = "none";
}
modalButton.addEventListener("click", closeModal);
