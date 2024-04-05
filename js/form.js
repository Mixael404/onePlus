const form = document.querySelector("form");
const errorsWrapper = form.querySelector(".errors");
const button = form.querySelector("button");

let errors = [];

function validateBtn() {
  const inputs = Array.from(form.querySelectorAll("input"));
  if (inputs.some((el) => el.value === "") || errors.length) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function createError(className, text) {
  const error = document.createElement("p");
  error.classList.add(className);
  error.textContent = text;
  errors.push(error);
}

function resetCurrentErrors(currentErrors) {
  errorsWrapper.innerHTML = "";
  const resetErrors = errors.map((error) => {
    if (currentErrors.includes(error.className)) {
      error = null;
    }
    return error;
  });
  return (filteredErrors = resetErrors.filter((error) => error !== null));
}

function renderErrors() {
  errors.forEach((error) => {
    errorsWrapper.append(error);
  });
}


(function validateName() {
  // Только латиница и кириллица. От 4 до 20 символов
  const validMask = /^[а-яёА-ЯЁa-zA-Z]{4,20}$/;
  const name = form.querySelector('[name="name"]');
  const isNumber = /.*[0-9].*/;
  const isSymbol = /(?=.*[^а-яёА-ЯЁa-zA-Z0-9].*)/;

  name.addEventListener("blur", (e) => {
    const value = e.target.value;

    errors = resetCurrentErrors(["numbersName", "shortName", "longName", 'symbolsName']);
    if (!value.match(validMask)) {
      if (value.length < 4) {
        createError("shortName", "Слишком короткое имя");
      }

      if (value.length > 20) {
        createError("longName", "Слишком длинное имя");
      }

      if (value.match(isNumber)) {
        createError("numbersName", "Имя содержит цифры");
      }

      if (value.match(isSymbol)) {
        createError("symbolsName", "Имя содержит символы");
      }
    }
    renderErrors();

    validateBtn();
  });
})();

(function validateSurname() {
  // Только латиница и кириллица. От 4 до 20 символов
  const validMask = /^[а-яёА-ЯЁa-zA-Z]{4,20}$/;
  const surname = form.querySelector('[name="surname"]');
  const isNumber = /.*[0-9].*/;
  const isSymbol = /(?=.*[^а-яёА-ЯЁa-zA-Z0-9].*)/;

  surname.addEventListener("blur", (e) => {
    const value = e.target.value;
    errors = resetCurrentErrors([
      "digitsSurName",
      "shortSurName",
      "longSurName",
      "symbolsSurName",
    ]);

    if (!value.match(validMask)) {
      if (value.length < 4) {
        createError("shortSurName", "Слишком короткая фамилия");
      }
      if (value.length > 20) {
        createError("longSurName", "Слишком длинная фамилия");
      }
      if (value.match(isNumber)) {
        createError("digitsSurName", "Фамилия содержит цифры");
      }
      if (value.match(isSymbol)) {
        createError("symbolsSurName", "Фамилия содержит символы");
      }
    }
    renderErrors();
    validateBtn();
  });
})();

(function validateEmail() {
  // email адрес. Символы, знак @, символы, точка и маленькие латинские буквы
  const validMask =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z]*[a-z])?/;
  const emailInput = form.querySelector('[name="email"]');

  emailInput.addEventListener("blur", (e) => {
    const value = e.target.value;
    errors = resetCurrentErrors(["illegalEmail"]);

    if (!value.match(validMask)) {
        createError("illegalEmail", "Введите существующий email адрес");
    }
    renderErrors();
    validateBtn();
  });
})();

(function validatePassword() {
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
    const passwordSubmition = form.querySelector('[name="repeat-password"]');
    errors = resetCurrentErrors([
      "shortPassword",
      "noNumber",
      "noUpperCase",
      "noLowerCase",
      "noSymbol",
      "notSamePasswsords"
    ]);

    if (!value.match(validMask)) {
      if (value.length < 8)
        createError("shortPassword", "Слишком короткий пароль");
      if (!value.match(isNumber))
        createError("noNumber", "Пароль должен содержать хотя бы одну цифру");
      if (!value.match(isUppercase))
        createError(
          "noUpperCase",
          "Пароль должен содержать хотя бы одну заглавную букву"
        );
      if (!value.match(isLowercase))
        createError(
          "noLowerCase",
          "Пароль должен содержать хотя бы одну строчную букву"
        );
      if (!value.match(isSymbol))
        createError("noSymbol", "Пароль должен содержать хотя бы один символ");
        if (e.target.value !== passwordSubmition.value) {
          createError("notSamePasswsords", "Пароли не совпадают");
        }
    }
    renderErrors();
    validateBtn();
  });
})();

(function validateRepetition() {
  const passwordSubmition = form.querySelector('[name="repeat-password"]');
  const passwordInput = form.querySelector('[name="password"]');

  passwordSubmition.addEventListener("blur", (e) => {
    errors = resetCurrentErrors(["notSamePasswsords"]);

    if (e.target.value !== passwordInput.value) {
      createError("notSamePasswsords", "Пароли не совпадают");
    }
    renderErrors();
    validateBtn();
  });
})();

(function validateBirthday() {
  const birthdayInput = form.querySelector('[name="birthday"]');

  birthdayInput.addEventListener("blur", (e) => {
    errors = resetCurrentErrors(["lessAge"]);

    const birthDay = new Date(e.target.value);
    const now = new Date();

    const eighteenYearsAgo = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate() + 1);
    if (eighteenYearsAgo < birthDay ) {
      createError("lessAge", "Доступно только с 18-ти лет");
    }

    renderErrors();
    validateBtn();
  });
})();

