import '../styles/index.scss';
import { DINAMO_STARTERS, DINAMO_BACKUP, DINAMO_MENTORS } from './dinamo';
import { TVER_STARTERS, TVER_BACKUP, TVER_MENTORS } from './tver';

const DINAMO_REGULARS = DINAMO_STARTERS;
const DINAMO_RESERVE = DINAMO_BACKUP;
const DINAMO_COACHES = DINAMO_MENTORS;
const TVER_REGULARS = TVER_STARTERS;
const TVER_RESERVE = TVER_BACKUP;
const TVER_COACHES = TVER_MENTORS;

/**
 * @function
 * @name customizePlayerTemplate
 * @description Клонирует темплейт,
 * добавляет нодам классы и принимает
 * деструктурированный массив объектов
 * @param {string} id - порядковый номер в списке игроков
 * @param {string} name - имя игрока
 * @param {string} country - страна игрока
 * @param {Boolean} isCaptain - капитан команды (true|false)
 * @param {Boolean} isMidField - midfielder (true|false)
 * @param {Boolean} isCoach - тренер (true|false)
 * @param {string} role - аббревиатура роли игрока в команде
 * @param {string} roleDesc - расшифровка аббревиатуры роли игрока в команде
 * @param {Object[]} moments - Массив объектов, где зафиксированы время и события матча
 * @returns {HTMLElement} player - Клон, готовый для рендеринга
 */
const customizePlayerTemplate = (id, 
                                name, 
                                country, 
                                isCaptain, 
                                isMidField, 
                                isCoach, 
                                role, 
                                roleDesc, 
                                moments) => {

  let playerTemplate = document.getElementById('player'),
      player = playerTemplate?.content.firstElementChild.cloneNode(true),
      playerOrigin = player?.querySelector('.teams__country'),
      playerName = player?.querySelector('.teams__name'),
      playerRole = player?.querySelector('.teams__role'),
      playerMomentsContainer = player?.querySelector('.teams__moments');

  player.querySelector('.teams__number').textContent = id;
  playerOrigin.textContent = country;

  switch (country) {
    case 'Армения':
      playerOrigin?.classList.add('teams__country--armenia');
      break;
    case 'Швеция':
      playerOrigin?.classList.add('teams__country--sweden');
      break;
    default:
      playerOrigin?.classList.add('teams__country--russia');
  }

  playerName.textContent = name;

  if (isCaptain) {
    playerName?.classList.add('teams__name--captain');
  }

  if (isMidField) {
    playerName?.classList.add('teams__name--midfielder');
  }

  return player;
};

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