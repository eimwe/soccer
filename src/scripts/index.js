import '../styles/index.scss';
import { DINAMO_STARTERS, DINAMO_BACKUP, DINAMO_MENTORS } from './dinamo';
import { TVER_STARTERS, TVER_BACKUP, TVER_MENTORS } from './tver';

const DINAMO_REGULARS = DINAMO_STARTERS;
const DINAMO_RESERVE = DINAMO_BACKUP;
const DINAMO_COACHES = DINAMO_MENTORS;
const TVER_REGULARS = TVER_STARTERS;
const TVER_RESERVE = TVER_BACKUP;
const TVER_COACHES = TVER_MENTORS;

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