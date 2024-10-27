window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
    
    
    //modal


    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
<<<<<<< HEAD

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            // Либо вариант с toggle - но тогда назначить класс в верстке
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // Либо вариант с toggle - но тогда назначить класс в верстке
        document.body.style.overflow = '';
=======
        modalForm = document.getElementById('modalForm');

    
    
    function openModal() {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
            modal.classList.remove('hide');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    const openModalAfterDelay = () => {
         
        setTimeout(() => {
            openModal(); 
                
        }, 2000); // Задержка в миллисекундах (здесь 5 секунд)
        
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

   

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        
        document.body.style.overflow = '';

        setTimeout(() => {
            modal.style.display = 'none'; // Убираем модальное окно после завершения анимации
        }, 500); 
>>>>>>> 96876d6 (New)
    }


    modalCloseBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

<<<<<<< HEAD
=======
modalForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение (перезагрузка страницы)
    closeModal();
    modalForm.reset();
        
});

openModalAfterDelay();
>>>>>>> 96876d6 (New)




<<<<<<< HEAD

})
=======
});
>>>>>>> 96876d6 (New)
