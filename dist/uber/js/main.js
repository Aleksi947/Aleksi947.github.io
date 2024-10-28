document.addEventListener("DOMContentLoaded", function () {
  // Hamburger

  const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu_item"),
    hamburger = document.querySelector(".hamburger");

  // Открытие/закрытие меню по клику на гамбургер
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("menu_active");
  });

  // Закрытие меню при клике на пункт меню
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("hamburger_active");
      menu.classList.remove("menu_active");
    });
  });

  // Закрытие меню при клике вне его и гамбургера
  document.addEventListener("click", (e) => {
    // Проверяем, что клик был не по меню и не по гамбургеру
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("hamburger_active");
      menu.classList.remove("menu_active");
    }
  });

  // Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]"),
    modalForm = document.getElementById("modalForm"),
    errorMessage = modalForm.querySelector(".error-message");

  function openModal() {
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
      modal.classList.remove("hide");
    }, 10);
    document.body.style.overflow = "hidden";
  }

  const openModalAfterDelay = () => {
    setTimeout(() => {
      openModal();
    }, 2000); // Задержка в миллисекундах (здесь 2 секунды)
  };

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";

    setTimeout(() => {
      modal.style.display = "none";
    }, 500);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  openModalAfterDelay();

  // Проверка правильности заполнения email и номера телефона
  function validateForm() {
    let isValid = true;
    let userName = modalForm.querySelector('input[name="user_name"]');
    let userPhone = modalForm.querySelector('input[name="user_phone"]');
    let userEmail = modalForm.querySelector('input[name="user_email"]');

    // Очистка предыдущих ошибок
    userName.style.border = "";
    userPhone.style.border = "";
    userEmail.style.border = "";
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";

    // Проверка имени
    if (userName.value.trim() === "") {
      userName.style.border = "2px solid red";
      errorMessage.innerHTML += "Поле имени не может быть пустым.<br>";
      isValid = false;
    }

    // Проверка телефона (должен содержать только цифры и быть не меньше 10 символов)
    const phonePattern = /^[0-9]{10,}$/;
    if (!phonePattern.test(userPhone.value)) {
      userPhone.style.border = "2px solid red";
      errorMessage.innerHTML +=
        "Введите корректный номер телефона (минимум 10 цифр).<br>";
      isValid = false;
    }

    // Проверка email (правильный формат)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userEmail.value)) {
      userEmail.style.border = "2px solid red";
      errorMessage.innerHTML += "Введите корректный email.<br>";
      isValid = false;
    }

    // Показ ошибки если что-то не так
    if (!isValid) {
      errorMessage.style.display = "block";
    }

    return isValid;
  }

  // Отключаем отправку на сервер и показываем окно "Спасибо за заявку"
  modalForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    if (validateForm()) {
      const userName = modalForm.querySelector('input[name="user_name"]').value;

      // Показываем модальное окно благодарности
      showThankYouModal(userName);
      modalForm.reset(); // Очищаем форму
      closeModal();
    }
  });

  // Функция показа модального окна благодарности
  function showThankYouModal(userName) {
    const thankYouModal = document.createElement("div");
    thankYouModal.classList.add("modal", "show");
    thankYouModal.innerHTML = `
            <div class="modal__dialog">
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">Спасибо за заявку, ${userName}!</div>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                </div>
            </div>
        `;
    document.body.append(thankYouModal);

    document.body.style.overflow = "hidden";

    // Закрытие модального окна благодарности
    const closeBtn = thankYouModal.querySelector("[data-close]");
    closeBtn.addEventListener("click", function () {
      thankYouModal.remove();
      document.body.style.overflow = "";
    });

    thankYouModal.addEventListener("click", (e) => {
      if (e.target === thankYouModal) {
        thankYouModal.remove();
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        thankYouModal.remove();
        document.body.style.overflow = "";
      }
    });
  }
});
