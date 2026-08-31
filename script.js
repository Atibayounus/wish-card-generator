const messageTemplates = {

  proud: [
    "Your hard work truly paid off. So proud of everything you've achieved!",
    "All those late nights and effort finally shine through. Well deserved!",
    "Watching you succeed after all your effort makes this moment even sweeter."
  ],

  funny: [
    "Look at you, being all successful and stuff. Show-off. 😎",
    "Warning: excessive awesomeness detected. Congrats, superstar!",
    "You studied, you struggled, you conquered. Now go celebrate with snacks."
  ],

  motivational: [
    "This is just the beginning. Keep chasing bigger dreams!",
    "Hard work beats talent when talent doesn't work hard — and you proved it.",
    "One milestone down, many more to go. Keep shining!"
  ],

  simple: [
    "Congratulations! You totally earned this. 🎉",
    "So happy for you — great job!",
    "Well done! Here's to your next win too."
  ]

};


/* Input elements */

const nameInput =
  document.getElementById('nameInput');

const achievementInput =
  document.getElementById('achievementInput');

const messageSelect =
  document.getElementById('messageSelect');


/* Buttons */

const generateBtn =
  document.getElementById('generateBtn');

const backBtn =
  document.getElementById('backBtn');

const downloadBtn =
  document.getElementById('downloadBtn');


/* Cards */

const formCard =
  document.getElementById('formCard');

const resultCard =
  document.getElementById('resultCard');


/* Result elements */

const resultName =
  document.getElementById('resultName');

const resultMessage =
  document.getElementById('resultMessage');

const resultAchievement =
  document.getElementById('resultAchievement');


/* Confetti */

const confettiContainer =
  document.getElementById('confetti');


const emojis = [
  '🎉',
  '🎊',
  '✨',
  '⭐',
  '🏆',
  '🎈',
  '💖',
  '🌟'
];


/* Launch confetti */

function launchConfetti() {

  confettiContainer.innerHTML = '';

  const count = 40;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const span =
      document.createElement('span');


    span.textContent =
      emojis[
        Math.floor(
          Math.random()
          *
          emojis.length
        )
      ];


    span.style.left =
      Math.random() * 100 + '%';


    span.style.fontSize =
      (
        0.9
        +
        Math.random()
        * 1
      )
      +
      'rem';


    const duration =
      3
      +
      Math.random()
      * 3;


    const delay =
      Math.random()
      * 1.5;


    span.style.animationDuration =
      duration
      +
      's';


    span.style.animationDelay =
      delay
      +
      's';


    confettiContainer.appendChild(
      span
    );

  }


  /* Remove confetti */

  setTimeout(() => {

    confettiContainer.innerHTML = '';

  }, 8000);

}


/* Generate card */

function generateCard() {

  const name =
    nameInput.value.trim()
    ||
    'Champion';


  const achievement =
    achievementInput.value.trim();


  const style =
    messageSelect.value;


  const options =
    messageTemplates[style];


  const message =
    options[
      Math.floor(
        Math.random()
        *
        options.length
      )
    ];


  resultName.textContent =
    name;


  resultMessage.textContent =
    message;


  resultAchievement.textContent =
    achievement
      ?
      `🎯 ${achievement}`
      :
      '';


  /* Switch screens */

  formCard.classList.add(
    'hide'
  );


  resultCard.classList.add(
    'show'
  );


  /* Celebration */

  launchConfetti();

}


/* Reset form */

function resetForm() {

  resultCard.classList.remove(
    'show'
  );


  formCard.classList.remove(
    'hide'
  );


  confettiContainer.innerHTML =
    '';

}


/* Download card */

async function downloadCard() {

  downloadBtn.textContent =
    'Preparing...';


  downloadBtn.disabled =
    true;


  try {

    /*
      Temporarily hide buttons
      from downloaded image
    */

    const actionButtons =
      resultCard.querySelector(
        '.action-buttons'
      );


    actionButtons.style.display =
      'none';


    const canvas =
      await html2canvas(
        resultCard,
        {

          backgroundColor:
            '#ffffff',

          scale:
            2

        }
      );


    /* Show buttons again */

    actionButtons.style.display =
      'flex';


    /* Create download */

    const link =
      document.createElement(
        'a'
      );


    link.download =
      `congrats-${
        resultName.textContent
          .replace(
            /\s+/g,
            '-'
          )
          .toLowerCase()
      }.png`;


    link.href =
      canvas.toDataURL(
        'image/png'
      );


    link.click();

  }


  catch (err) {

    console.error(err);


    alert(
      'Could not generate the image. Please try again.'
    );

  }


  finally {

    /*
      Make sure buttons
      return even if error occurs
    */

    const actionButtons =
      resultCard.querySelector(
        '.action-buttons'
      );


    actionButtons.style.display =
      'flex';


    downloadBtn.textContent =
      '⬇️ Download Card';


    downloadBtn.disabled =
      false;

  }

}


/* Button events */

generateBtn.addEventListener(
  'click',
  generateCard
);


backBtn.addEventListener(
  'click',
  resetForm
);


downloadBtn.addEventListener(
  'click',
  downloadCard
);


/* Enter key */

nameInput.addEventListener(
  'keydown',
  (e) => {

    if (
      e.key === 'Enter'
    ) {

      generateCard();

    }

  }
);


achievementInput.addEventListener(
  'keydown',
  (e) => {

    if (
      e.key === 'Enter'
    ) {

      generateCard();

    }

  }
);