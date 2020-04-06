const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const siteBody = document.getElementsByTagName('body');
const themeControl = document.getElementById('theme-switch-control');

const dark = Theme.DARK;
const light = Theme.LIGHT;

firstTheme();

themeControl.addEventListener('change', changeTheme);

function firstTheme() {
  if (localStorage.getItem('theme') === dark) {
    siteBody[0].classList.add(dark);
    themeControl.checked = true;
  } else {
    siteBody[0].classList.add(light);
    localStorage.setItem('theme', `${light}`);
  }
}

function changeTheme() {
  if (themeControl.checked) {
    actualTheme(light, dark);
    localStorage.setItem('theme', `${dark}`);
  } else {
    actualTheme(dark, light);
    localStorage.setItem('theme', `${light}`);
  }
}

function actualTheme(oldName, newName) {
  siteBody[0].classList.remove(oldName);
  siteBody[0].classList.add(newName);
}
