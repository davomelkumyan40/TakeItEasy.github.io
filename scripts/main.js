
let isBusy = false;
let direction = 0;
let slider = { startX: 0, endX: 0, slideTreshold: 50 };
let sliderCards = [
    { "id": "1", "title": "Allarmi per le tue linee preferite", "desc": "Imposta un avviso per ricevere notifiche prima dell'arrivo del tuo autobus. Non perdere mai la tua corsa!" },
    { "id": "2", "title": "Segui il tuo mezzo in tempo reale", "desc": "Monitora gli spostamenti del tuo autobus sulla mappa in tempo reale. Rimani sempre aggiornato sugli orari e sugli eventuali ritardi!" },
    { "id": "3", "title": "Trova le fermate più vicine", "desc": "Sfoglia la lista delle fermate vicine e scegli quella perfetta per il tuo viaggio. Facile e veloce!" }
];

document.querySelectorAll('.btn-slider').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (isBusy) return;
        isBusy = true;
        if (e.target.id === 'next')
            nextSlide();
        else
            prevSlide();
    });
})

document.querySelector('.first-slide').addEventListener('animationend', function () {
    isBusy = false;
});

document.querySelector('#slider').addEventListener('touchstart', (e) => slider.startX = e.touches[0].clientX, { passive: true });
document.querySelector('#slider').addEventListener('touchmove', (e) => slider.endX = e.touches[0].clientX, { passive: true });
document.querySelector('#slider').addEventListener('touchend', (e) => {
    let diff = slider.startX - slider.endX;
    if (Math.abs(diff) > slider.slideTreshold) {
        if (diff > 0) {
            prevSlide();
            return;
        }
        nextSlide();
    }
});

function updateProgress() {
    let activeSlide = document.querySelector('.active-next, .last-slide-prev');
    !activeSlide || document.querySelectorAll('.step').forEach(el => el.id[el.id.length - 1] === activeSlide.id.split('_')[1] ? el.classList.add('active') : el.classList.remove('active'))
}

function updateCards() {
    sliderCards
    let activeSlide = document.querySelector('.active-next, .last-slide-prev');
    !activeSlide || document.querySelectorAll('.content > .title').forEach(title => title.textContent = sliderCards.find(x => x.id === activeSlide.id.split('_')[1]).title);
    !activeSlide || document.querySelectorAll('.content > .sub-title').forEach(title => title.textContent = sliderCards.find(x => x.id === activeSlide.id.split('_')[1]).desc);
}

function clearNext() {
    document.querySelectorAll('.slide')
        .forEach(slide => {
            if (slide.classList.contains('first-slide-next')) {
                slide.classList.remove('first-slide-next');
                slide.classList.add('first-slide-prev');
            }
            else if (slide.classList.contains('active-next')) {
                slide.classList.remove('active-next');
                slide.classList.add('active-prev');
            }
            else if (slide.classList.contains('last-slide-next')) {
                slide.classList.remove('last-slide-next');
                slide.classList.add('last-slide-prev');
            }
        });
    updateProgress();
    updateCards();
}

function clearPrev() {
    document.querySelectorAll('.slide')
        .forEach(slide => {
            if (slide.classList.contains('first-slide-prev')) {
                slide.classList.remove('first-slide-prev');
                slide.classList.add('first-slide-next');
            }
            else if (slide.classList.contains('active-prev')) {
                slide.classList.remove('active-prev');
                slide.classList.add('active-next');
            }
            else if (slide.classList.contains('last-slide-prev')) {
                slide.classList.remove('last-slide-prev');
                slide.classList.add('last-slide-next');
            }
        });
    updateProgress();
    updateCards();
}


function nextSlide() {
    if (direction === -1) {
        direction = 1;
        return clearPrev();
    }
    direction = 1;
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        if (slide.classList.contains('first-slide-next')) {
            slide.classList.remove('first-slide-next');
            slide.classList.add('active-next');
        }
        else if (slide.classList.contains('active-next')) {
            slide.classList.remove('active-next');
            slide.classList.add('last-slide-next');
        }
        else if (slide.classList.contains('last-slide-next')) {
            slide.classList.remove('last-slide-next');
            slide.classList.add('first-slide-next');
        }
        else {
            if (slide.classList.contains('last-slide')) {
                slide.classList.add('first-slide-next');
            }
            else if (slide.classList.contains('first-slide')) {
                slide.classList.add('active-next');
            }
            else if (slide.classList.contains('active')) {
                slide.classList.add('last-slide-next');
            }
        }
    });
    updateProgress();
    updateCards();
}

function prevSlide() {
    if (direction === 1) {
        direction = -1;
        return clearNext();
    }
    direction = -1;
    console.log('PREV 1');
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        if (slide.classList.contains('first-slide-prev')) {
            slide.classList.remove('first-slide-prev');
            slide.classList.add('last-slide-prev');
        }
        else if (slide.classList.contains('active-prev')) {
            slide.classList.remove('active-prev');
            slide.classList.add('first-slide-prev');
        }
        else if (slide.classList.contains('last-slide-prev')) {
            slide.classList.remove('last-slide-prev');
            slide.classList.add('active-prev');
        }
        else {
            if (slide.classList.contains('last-slide')) {
                slide.classList.add('last-slide-prev');
            }
            else if (slide.classList.contains('first-slide')) {
                slide.classList.add('first-slide-prev');
            }
            else if (slide.classList.contains('active')) {
                slide.classList.add('active-prev');
            }
        }
    });
    updateProgress();
    updateCards();
}