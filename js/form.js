const form = document.querySelector("form");
const errorsWrapper = form.querySelector(".errors");
const button = form.querySelector("button");

let errors = [];

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

function createError(className, text) {
  const error = document.createElement("p");
  error.classList.add(className);
  error.textContent = text;
  errors.push(error);
}

function resetCurrentErrors(currentErrors){
    errorsWrapper.innerHTML = ''
    const resetErrors = errors.map((error) => {
        if(currentErrors.includes(error.className)){
            error = null
        }
        return error
    })
    return filteredErrors = resetErrors.filter(error => error !== null)
}

function validateName() {
  // Только латиница и кириллица. От 4 до 20 символов
  const validMask = /^[а-яёА-ЯЁa-zA-Z]{4,20}$/;
  const name = form.querySelector('[name="name"]');
  const isNumber = /.*[0-9].*/;
  const isSymbol = /(?=.*\W.*)/;

  name.addEventListener("blur", (e) => {
    const value = e.target.value;
    
    // const resetErrors = errors.map((error) => {
    //     if(error.classList.contains('illegalName') || error.classList.contains('shortName') || error.classList.contains('longName')){
    //         error = null
    //     }
    //     return error
    // })
    errors = resetCurrentErrors(['illegalName','shortName','longName']) 
    // resetErrors.filter(error => error !== null)
    // errorsWrapper.innerHTML = ''

    if (value.match(validMask)) {
      console.log("Valid");
    } else {
      if (value.length < 4) {
        createError("shortName", "Слишком короткое имя");
      }

      if (value.length > 20) {
        createError("longName", "Слишком длинное имя");
      }

      if(value.match(isNumber)){
        createError("illegalName", "Имя содержит цифры");
      }

      if(value.match(isSymbol)){
        createError("illegalName", "Имя содержит символы");
      }
    }
    errors.forEach(error => {
        errorsWrapper.append(error)
    })

    validateBtn();
  });
}

function validateSurname() {
  // Только латиница и кириллица. От 4 до 20 символов
  const validMask = /^[а-яёА-ЯЁa-zA-Z]{4,20}$/;
  const surname = form.querySelector('[name="surname"]');
  const isNumber = /.*[0-9].*/;
  const isSymbol = /(?=.*\W.*)/;

  surname.addEventListener("blur", (e) => {
    const value = e.target.value;
    const resetErrors = errors.map((error) => {
        if(error.classList.contains('digitsSurName') || error.classList.contains('shortSurName') || error.classList.contains('longSurName') || error.classList.contains('symbolsSurName')){
            error = null
        }
        return error
    })
    errors = resetErrors.filter(error => error !== null)
    
    errorsWrapper.innerHTML = ''

    if (value.match(validMask)) {
      console.log("Valid");
    } else {
      if (value.length < 4) {
        createError("shortSurName", "Слишком короткая фамилия");
      }
      if (value.length > 20) {
        createError("longSurName", "Слишком длинная фамилия");
      }
      if(value.match(isNumber)){
        createError("digitsSurName", "Фамилия содержит цифры");
      }
      if(value.match(isSymbol)){
        createError("symbolsSurName", "Фамилия содержит символы");
      }
    }
    errors.forEach(error => {
        errorsWrapper.append(error)
    })
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
    const resetErrors = errors.map((error) => {
        if(error.classList.contains('illegalEmail')){
            error = null
        }
        return error
    })
    errors = resetErrors.filter(error => error !== null)
    
    errorsWrapper.innerHTML = ''

    if (value.match(validMask)) {
      console.log("Valid");
    } else {
        createError('illegalEmail', 'Введите существующий email адрес')
    }
    errors.forEach(error => {
        errorsWrapper.append(error)
    })
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
    
    const resetErrors = errors.map((error) => {
        const isError = error.classList.contains('shortPassword') || error.classList.contains('noNumber') || error.classList.contains('noUpperCase') || error.classList.contains('noLowerCase') || error.classList.contains('noSymbol')

        if(isError){
            error = null
        }
        return error
    })
    errors = resetErrors.filter(error => error !== null)
    
    errorsWrapper.innerHTML = ''

    if(value.match(validMask)){
        console.log("Valid");
    } else{
        if(value.length < 8) createError('shortPassword', 'Слишком короткий пароль')
        if (!value.match(isNumber)) createError('noNumber', 'Пароль должен содержать хотя бы одну цифру')
        if (!value.match(isUppercase)) createError('noUpperCase', 'Пароль должен содержать хотя бы одну заглавную букву')
        if (!value.match(isLowercase)) createError('noLowerCase', 'Пароль должен содержать хотя бы одну строчную букву')
        if (!value.match(isSymbol)) createError('noSymbol', 'Пароль должен содержать хотя бы один символ')
    }
    errors.forEach(error => {
        errorsWrapper.append(error)
    })
    validateBtn();
  });
}

function validateRepetition() {
  const passwordSubmition = form.querySelector('[name="repeat-password"]');
  const passwordInput = form.querySelector('[name="password"]');

  passwordSubmition.addEventListener("blur", (e) => {

    const resetErrors = errors.map((error) => {
        if(error.classList.contains('notSamePasswsords')){
            error = null
        }
        return error
    })
    errors = resetErrors.filter(error => error !== null)
    
    errorsWrapper.innerHTML = ''

    if (e.target.value === passwordInput.value) {
      console.log("Valid");
    } else {
      createError("notSamePasswsords", 'Пароли не совпадают')
    }
    errors.forEach(error => {
        errorsWrapper.append(error)
    })
    validateBtn();
  });
}

function validateBirthday() {
  const birthdayInput = form.querySelector('[name="birthday"]');

  birthdayInput.addEventListener("blur", (e) => {

    const resetErrors = errors.map((error) => {
        if(error.classList.contains('lessAge')){
            error = null
        }
        return error
    })
    errors = resetErrors.filter(error => error !== null)
    
    errorsWrapper.innerHTML = ''

    const birthDay = new Date(e.target.value);
    const now = Date.now();
    const age = (now - birthDay) / (365 * 24 * 60 * 60 * 1000);
    if (age >= 18) {
      console.log("Valid");
    } else {
    createError("lessAge", "Доступно только с 18-ти лет")
    }
    errors.forEach(error => {
        errorsWrapper.append(error)
    })
    validateBtn();
  });
}

validateName();
validateSurname();
validateEmail();
validatePassword();
validateRepetition();
validateBirthday();
