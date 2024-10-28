$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    dots: false,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Функция валидации форм
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите не менее {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // Маска для ввода телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Обработка отправки формы
    $('form').submit(function(e) {
        e.preventDefault(); // Останавливаем стандартное поведение формы

        // Проверяем, прошла ли форма валидацию
        if (!$(this).valid()) {
            return; // Если форма не прошла валидацию, отправка не происходит
        }

        // Получаем имя пользователя из текущей формы
        var userName = $(this).find('input[name="name"]').val();

        // Закрываем текущие модальные окна
        $('#consultation, #order').fadeOut();

        // Очищаем поля формы
        $(this).find("input").val("");

        // Вставляем имя пользователя в модальное окно благодарности
        $('#thanks .modal__subtitle').text('Спасибо, ' + userName + ', за вашу заявку!');

        // Открываем модальное окно с благодарностью
        $('.overlay, #thanks').fadeIn('slow');

        // Сбрасываем форму
        $(this).trigger('reset');
    });

    // Закрытие модальных окон при клике вне формы
    $('.overlay').on('click', function(e) {
        if ($(e.target).is('.overlay')) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        }
    });

    // Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});



