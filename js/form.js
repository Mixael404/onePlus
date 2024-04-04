const form = document.querySelector("form");
const errorsWrapper = form.querySelector(".errors");
const button = form.querySelector("button");

const errors = [];

function addListener(element, mask) {
  element.addEventListener("blur", (e) => {
    const value = e.target.value;
    if (value.match(mask)) {
      console.log("Valid");
    } else {
      console.log("Invalid");
    }
  });
}

function validateBtn() {
  const inputs = Array.from(form.querySelectorAll("input"));
  if (inputs.some((el) => el.value === "") || errorsWrapper.children.length) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function createError(className, text, array) {
  const error = document.createElement("p");
  error.classList.add(className);
  error.textContent = text;
  array.push(error);
}

function validateName() {
  // Только латиница и кириллица. От 4 до 20 символов
  const validMask = /^[а-яёА-ЯЁa-zA-Z]{4,20}$/;
  const name = form.querySelector('[name="name"]');

  name.addEventListener("blur", (e) => {
    const value = e.target.value;
    errorsWrapper.querySelector(".illegalName")?.remove();
    errorsWrapper.querySelector(".shortName")?.remove();
    errorsWrapper.querySelector(".longName")?.remove();
    errors.forEach((error) => {
        if(error.classList.contains('illegalName') || error.classList.contains('shortName') || error.classList.contains('longName')){
            error = null
        }
    })
    const filteredErrors = errors.filter(error => error !== null)

    if (value.match(validMask)) {
      console.log("Valid");
    } else if (value.length < 4 || value.length > 20) {
      //   const error = document.createElement("p");
      if (value.length < 4) {
        // error.classList.add("shortName");
        // error.textContent = "Слишком короткое имя";
        // errorsWrapper.append(error);
        createError("shortName", "Слишком короткое имя", filteredErrors);
      }
      if (value.length > 20) {
        // error.classList.add("longName");
        // error.textContent = "Слишком длинное имя";
        // errorsWrapper.append(error);
        createError("longName", "Слишком длинное имя", filteredErrors);
      }
    } else {
      //   const error = document.createElement("p");
      //   error.classList.add("illegalName");
      //   error.textContent = "Имя содержит недопустимые символы";
      //   errorsWrapper.append(error);
      createError("illegalName", "Имя содержит недопустимые символы", filteredErrors);
    }
    // console.log(errors);
    filteredErrors.forEach(error => {
        errorsWrapper.append(error)
        // console.log(error);
    })
    validateBtn();
  });
}

function validateSurname() {
  // Только латиница и кириллица. От 4 до 20 символов
  const validMask = /^[а-яёА-ЯЁa-zA-Z]{4,20}$/;
  const surName = form.querySelector('[name="surname"]');
  surName.addEventListener("blur", (e) => {
    const value = e.target.value;
    errorsWrapper.querySelector(".illegalSurname")?.remove();
    errorsWrapper.querySelector(".shortSurName")?.remove();
    errorsWrapper.querySelector(".longSurName")?.remove();
    const error = document.createElement("p");

    if (value.match(validMask)) {
      console.log("Valid");
    } else if (value.length < 4) {
      error.classList.add("shortSurName");
      error.textContent = "Слишком короткая фамилия";
      errorsWrapper.append(error);
    } else if (value.length > 20) {
      error.classList.add("longSurName");
      error.textContent = "Слишком длинная фамилия";
      errorsWrapper.append(error);
    } else {
      error.classList.add("illegalSurname");
      error.textContent = "Фамилия содержит запрещённые символы";
      errorsWrapper.append(error);
    }
    validateBtn();
  });
}

function validateEmail() {
  // email адрес. Символы, знак @, символы, точка и маленькие латинские буквы
  const validMask =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z]*[a-z])?/;
  const emailInput = form.querySelector('[name="email"]');
  emailInput.addEventListener("blur", (e) => {
    const value = e.target.value;
    const error = document.createElement("p");
    errorsWrapper.querySelector(".illegalEmail")?.remove();
    if (value.match(validMask)) {
      console.log("Valid");
    } else {
      error.classList.add("illegalEmail");
      error.textContent = "Введите существующий email адрес";
      errorsWrapper.append(error);
    }
    validateBtn();
  });
}

function validatePassword() {
  // Латинские буквы, цифры и символы. хотя бы одна цифра, символ, заглавная и строчная буквы.
  const validMask =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{8,}$/;
  const passwordInput = form.querySelector('[name="password"]');
  const isNumber = /.*[0-9].*/;
  const isUppercase = /^(?=.*[A-Z])/;
  const isLowercase = /^(?=.*[a-z])/;
  const isSymbol = /(?=.*\W.)/;

  passwordInput.addEventListener("blur", (e) => {
    const value = e.target.value;
    const error = document.createElement("p");

    errorsWrapper.querySelector(".shortPassword")?.remove();
    errorsWrapper.querySelector(".noNumber")?.remove();
    errorsWrapper.querySelector(".noUpperCase")?.remove();
    errorsWrapper.querySelector(".noSymbol")?.remove();
    errorsWrapper.querySelector(".noLowerCase")?.remove();

    if (value.match(validMask)) {
      console.log("Valid");
    } else if (value.length < 8) {
      error.classList.add("shortPassword");
      error.textContent = "Слишком короткий пароль";
      errorsWrapper.append(error);
    } else if (!value.match(isNumber)) {
      error.classList.add("noNumber");
      error.textContent = "Пароль должен содержать хотя бы одну цифру";
      errorsWrapper.append(error);
    } else if (!value.match(isUppercase)) {
      error.classList.add("noUpperCase");
      error.textContent =
        "Пароль должен содержать хотя бы одну заглавную букву";
      errorsWrapper.append(error);
    } else if (!value.match(isSymbol)) {
      error.classList.add("noSymbol");
      error.textContent = "Пароль должен содержать хотя бы один символ";
      errorsWrapper.append(error);
    } else if (!value.match(isLowercase)) {
      error.classList.add("noLowerCase");
      error.textContent = "Пароль должен содержать хотя бы одну строчную букву";
      errorsWrapper.append(error);
    }
    validateBtn();
  });
}

function validateRepetition() {
  const passwordSubmition = form.querySelector('[name="repeat-password"]');
  const passwordInput = form.querySelector('[name="password"]');

  passwordSubmition.addEventListener("blur", (e) => {
    form.querySelector(".notSamePasswsords")?.remove();
    if (e.target.value === passwordInput.value) {
      console.log("Valid");
    } else {
      const error = document.createElement("p");
      error.classList.add("notSamePasswsords");
      error.textContent = "Пароли не совпадают";
      errorsWrapper.append(error);
    }
    validateBtn();
  });
}

function validateBirthday() {
  const birthdayInput = form.querySelector('[name="birthday"]');
  birthdayInput.addEventListener("blur", (e) => {
    errorsWrapper.querySelector(".lessAge")?.remove();
    const birthDay = new Date(e.target.value);
    const now = Date.now();
    const age = (now - birthDay) / (365 * 24 * 60 * 60 * 1000);
    if (age >= 18) {
      console.log("Valid");
    } else {
      const error = document.createElement("p");
      error.classList.add("lessAge");
      error.textContent = "Доступно только с 18-ти лет";
      errorsWrapper.append(error);
    }
    validateBtn();
  });
}

validateName();
validateSurname();
validateEmail();
validatePassword();
validateRepetition();
validateBirthday();
