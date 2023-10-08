const exploreBtn = document.querySelector('#explore');
const exploreBtn2 = document.querySelector('.explore-btn');
const container = document.querySelector('.container');

function showExploreModal() {
  if (
    document
      .querySelector('.dropdown-menu')
      .classList.contains('dropdown-menu-active')
  ) {
    document
      .querySelector('.dropdown-menu')
      .classList.remove('dropdown-menu-active');
  } else {
    document
      .querySelector('.dropdown-menu')
      .classList.add('dropdown-menu-active');
  }
}

exploreBtn.addEventListener('click', showExploreModal);
exploreBtn2.addEventListener('click', showExploreModal);
