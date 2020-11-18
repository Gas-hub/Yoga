window.addEventListener('DOMContentLoaded', function () {
  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }
  info.addEventListener('click', function (event) {
    let target = event.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (i = 0; i < tab.length; i++) {
        if (target === tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
      9;
    }
  });

  // timer

  let deadLine = '2020-11-22';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / (1000 * 60 * 60));

    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds');

    timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      if (t.hours < 10) {
        hours.textContent = '0' + t.hours;
      } else {
        hours.textContent = t.hours;
      }
      if (t.minutes < 10) {
        minutes.textContent = '0' + t.minutes;
      } else {
        minutes.textContent = t.minutes;
      }
      if (t.seconds < 10) {
        seconds.textContent = '0' + t.seconds;
      } else {
        seconds.textContent = t.seconds;
      }

      if (t.total < 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('timer', deadLine);

  // popup

  let popup = document.querySelector('.popup'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    more = document.querySelector('.more');

  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    }
  });

  // slider
  let slider = document.querySelector('.slider'),
    sliderItem = slider.querySelectorAll('.slider-item'),
    arrowLeft = slider.querySelector('.arrow-left'),
    arrowRight = slider.querySelector('.arrow-right'),
    sliderDots = slider.querySelector('.slider-dots'),
    dot = slider.querySelectorAll('.dot');

  function hideSliderItem() {
    sliderItem.forEach((item) => {
      item.style.display = 'none';
    });
    dot.forEach((item) => {
      item.classList.remove('dot-active');
    });
  }

  hideSliderItem();

  function showSliderItem(index) {
    if (sliderItem[index].style.display === 'none') {
      hideSliderItem();
      sliderItem[index].style.display = 'block';
      dot[index].classList.add('dot-active');
    }
  }
  showSliderItem(0);
  arrowLeft.addEventListener('click', function (e) {
    let index = 0;
    for (let i = 0; i < sliderItem.length; i++) {
      if (sliderItem[i].style.display === 'block') {
        index = --i;
        break;
      }
    }
    if (index < 0) {
      index = sliderItem.length - 1;
    }
    showSliderItem(index);
  });

  arrowRight.addEventListener('click', function (e) {
    let index = 0;
    for (let i = 0; i < sliderItem.length; i++) {
      if (sliderItem[i].style.display === 'block') {
        index = ++i;
        break;
      }
    }
    if (index > sliderItem.length - 1) {
      index = 0;
    }
    showSliderItem(index);
  });

  sliderDots.addEventListener('click', function (e) {
    for (let i = 0; i < dot.length; i++) {
      if (dot[i] === e.target && !e.target.classList.contains('dot-active')) {
        showSliderItem(i);
      }
    }
  });

  // form

  const message = {
    loading: 'loading...',
    succes: 'Thank you, Soon we will contact you',
    failure: 'Error',
  };

  let form = document.querySelector('.main-form'),
    input = form.querySelectorAll('input'),
    statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Conten-Type', 'application/json; charset=utf-8');

    const obj = {};
    let formData = new FormData(form);

    formData.forEach(function (value, key) {
      obj[key] = value;
    });

    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function () {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status === 200) {
        statusMessage.innerHTML = message.succes;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    input.forEach((item) => (item.value = ''));
  });

  //calculator

  let person = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = '0';

  person.addEventListener('change', function () {
    personSum = +this.value;
    total = (personSum + daysSum) * 4000;

    if (restDays.value == '' || person.value == '') {
      totalValue.innerHTML = '0';
    } else {
      totalValue.innerHTML = total;
    }
  });

  restDays.addEventListener('change', function () {
    daysSum = +this.value;
    total = (personSum + daysSum) * 4000;

    if (person.value == '' || restDays.value == '') {
      totalValue.innerHTML = '0';
    } else {
      totalValue.innerHTML = total;
    }
  });

  place.addEventListener('change', function () {
    if (restDays.value == '' || person.value == '') {
      totalValue.innerHTML = '0';
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
});
