document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger"),
    menu = document.querySelector(".menu"),
    closeElem = document.querySelector(".menu__close");
  overlay = document.querySelector(".menu__overlay");

  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
    menu.classList.remove("closing");
  });

  // Закрытие меню с плавной анимацией
  function closeMenu() {
    menu.classList.add("closing"); // Добавляем класс закрытия
    // Удаляем классы после завершения анимации
    setTimeout(() => {
      menu.classList.remove("active", "closing");
    }, 900); // Таймаут соответствует длительности transition (0.6s)
  }
  // Закрытие меню по клику на кнопку "закрыть" или на оверлей
  closeElem.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  /* closeElem.addEventListener("click", () => {
    menu.classList.remove("active");
  }); */

  // Закрытие меню по клику на оверлей
  /* overlay.addEventListener("click", () => {
    menu.classList.remove("active");
  }); */

 /*  const counters = document.querySelectorAll(".skills__ratings-counter"),
    lines = document.querySelectorAll(".skills__ratings-line span");

  counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
  });
 */
  

  // Slider
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slide.length;

  function showSlide(index) {
    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = index;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

   setInterval(() => {
    showSlide(currentIndex + 1);
  }, 7000);

  // Animation

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("slide-in-right")) {
            entry.target.classList.add("in-view-right"); // Для появления справа
          } else {
            entry.target.classList.add("in-view"); // Для стандартной анимации
          }
        } else {
          entry.target.classList.remove("in-view", "in-view-right"); // Убираем все классы
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Наблюдаем за всеми элементами с классом fade-in
  document.querySelectorAll(".fade-in, .slide-in-right").forEach((el) => {
    observer.observe(el);
  });
  
  // Validation


  const form = document.querySelector(".contacts__form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#text");
  const policyCheckbox = document.querySelector(".contacts__policy input");
  const modal = document.querySelector("#thankYouModal");
  const closeModal = document.querySelector(".modal__close");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Сброс предыдущих ошибок
    clearErrors();

    let isValid = true;

    // Проверка имени
    if (nameInput.value.trim() === "") {
      isValid = false;
      showError(nameInput, "Please enter your name.");
    }

    // Проверка email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (emailInput.value.trim() === "") {
      isValid = false;
      showError(emailInput, "Please enter your email.");
    } else if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      showError(emailInput, "Please enter a valid email address.");
    }

    // Проверка согласия с политикой конфиденциальности
    if (!policyCheckbox.checked) {
      isValid = false;
      showError(policyCheckbox, "Please agree to the privacy policy.");
    }

    if (isValid) {
      // Показываем модальное окно при успешной отправке
      modal.style.display = "flex";

      // Очистка формы после отправки
      form.reset();
    }
  });

  // Закрытие модального окна при нажатии на крестик
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Закрытие модального окна при клике вне его содержимого
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function showError(input, message) {
    const parent = input.parentElement;
    parent.classList.add("error");

    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    parent.appendChild(errorElement);
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());

    const errorInputs = document.querySelectorAll(".error");
    errorInputs.forEach((input) => input.classList.remove("error"));
  }

  // slide

  const carousel = document.querySelector("#carouselExampleCaptions");
  let touchStartX = 0;
  let touchEndX = 0;

  // Функции для обработки смахивания
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Смахивание влево - следующий слайд
      const nextButton = carousel.querySelector(".carousel-control-next");
      if (nextButton) nextButton.click();
    }
    if (touchEndX > touchStartX + 50) {
      // Смахивание вправо - предыдущий слайд
      const prevButton = carousel.querySelector(".carousel-control-prev");
      if (prevButton) prevButton.click();
    }
  }

  // Обработчики для начала и окончания касания
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });
});
