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
 * @name getPlayerRole
 * @description Создает ноду abbreviationNode,
 * добавляет в эту ноду текстовый узел с аббревиатурой
 * и расшифровкой роли игрока.
 * @see {@link customizePlayerTemplate} для вызова описываемой функции
 * @param {HTMLElement} container - playerRole -->
 * контейнер, куда прикрепляется созданная этой функцией нода
 * @param {string} role - аббревиатура роли игрока в команде
 * @param {string} roleDesc - расшифровка аббревиатуры роли игрока в команде 
 * @param {Boolean} isCoach - тренер (true|false)
 * @returns {undefined}
 */
const getPlayerRole = (container, role, roleDesc, isCoach) => {
  let abbreviationNode = document.createElement('ABBR'),
      abbreviationText = document.createTextNode(role);    
  
  if (isCoach) {
    container.classList.add('teams__role--coach');
    container.appendChild(abbreviationText);
  } else {
    abbreviationNode.appendChild(abbreviationText);
    abbreviationNode.setAttribute('title', roleDesc);
    container.appendChild(abbreviationNode);
  }
}

/**
 * @function
 * @name convertTimestamp
 * @description Преобразует минуты в формат Ч:M
 * для корректного отображения в атрибуте datetime
 * элемента <time>
 * @see {@link getPlayerMoments} для вызова описываемой функции
 * @param {string} mins 
 * @returns {string}
 */
const convertTimestamp = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;

    return `PT${h}H${m}M`;
}

/**
 * @function
 * @name getPlayerMoments
 * @description Создает ноды с событиями матча для каждого игрока.
 * Если событий не было, создает специальную ноду messageNode
 * @see {@link customizePlayerTemplate} для вызова описываемой функции
 * @param {HTMLElement} container - playerMomentsContainer -->
 * контейнер, куда прикрепляются созданные этой функцией ноды
 * @param {Object[]} moments - Массив объектов, где зафиксированы время и события матча
 * @returns {undefined}
 */
const getPlayerMoments = (container, moments) => {

  if (moments.length < 1) {
    let messageNode = document.createElement('SPAN');
    let textNode = document.createTextNode('Не отличился');
    messageNode.classList.add('visually-hidden');
    messageNode.appendChild(textNode);
    container.appendChild(messageNode);
    return;
  }
  
  moments.forEach(moment => {

    let divNode = document.createElement('DIV');
    divNode.classList.add('teams__timestamp', 'flex-container');
  
    for (const [key, value] of Object.entries(moment)) {
        
      if (key === 'timestamp') {
        let timeNode = document.createElement('TIME');
        let textNode = document.createTextNode(`${value}'`);
        /**
         * Данная функция описана в @see {@link convertTimestamp}
         */
        timeNode.setAttribute('datetime', convertTimestamp(value) );
        timeNode.appendChild(textNode);
        divNode.appendChild(timeNode);
      }

      if (key === 'result') {
        let spanNode = document.createElement('SPAN');
        spanNode.classList.add('teams__outcome');

        switch (value) {
          case 'Предупреждение':
            spanNode.classList.add('teams__outcome--yellow-card');
              break;
          case 'Удаление с поля':
            spanNode.classList.add('teams__outcome--red-card');
              break;
          case 'Замена':
            spanNode.classList.add('teams__outcome--replacement');
              break;
        }
  
        let textNode = document.createTextNode(value);
        spanNode.appendChild(textNode);
        divNode.appendChild(spanNode);
      }

    }

    container.appendChild(divNode);
  });

}

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

  /**
   * Данная функция описана в @see {@link getPlayerRole}
   */
  getPlayerRole(playerRole, role, roleDesc, isCoach);

  /**
   * Данная функция описана в @see {@link getPlayerMoments}
   */
  getPlayerMoments(playerMomentsContainer, moments);

  return player;
};

/**
 * @function
 * @name renderPlayers
 * @description Отрисовывает строки с игроками на основе
 * переданного клона темплейта и деструктурированных данных массива игроков.
 * Созданные строки добавляет в элемент списка, передаваемый в виде параметра
 * playerList
 * @param {Object[]} team - массив объектов для отрисовки
 * @param {HTMLElement} playerList - контейнер для прикрепления
 * отрисованного списка
 * @returns {undefined}
 */

const renderPlayers = (team, playerList) => {
  const {
    id = '1',
    name = 'Игрок',
    country = 'oops!',
    isCaptain = false,
    isMidField = false,
    isCoach = false,
    role = Нап,
    roleDesc = Нападающий,
    moments = [],
  } = team;
  
  /**
   * Данная функция описана в @see {@link customizePlayerTemplate}
   */
  let customizedPlayer = customizePlayerTemplate(
      id, 
      name, 
      country, 
      isCaptain, 
      isMidField, 
      isCoach, 
      role, 
      roleDesc, 
      moments);

  playerList.appendChild(customizedPlayer);
}

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