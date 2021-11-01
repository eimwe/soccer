import '../styles/index.scss';

function changeClub() {
  let filterButtons = document.querySelectorAll('.teams__option');

  filterButtons?.forEach(button => {

    button.addEventListener('click', event => {
      let clickedButton = event.target;
      let activeButton = document.querySelector('.teams__option--active');

      if (clickedButton !== activeButton) {
        clickedButton.classList.add('teams__option--active');
        activeButton?.classList.remove('teams__option--active');
      }
    });

  });
}

changeClub();