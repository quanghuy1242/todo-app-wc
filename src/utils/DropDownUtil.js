export function setMenuPosition(menu, data) {
  const menuSize = {
    width: menu.offsetWidth,
    height: menu.offsetHeight
  };
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  if ((windowSize.width - data.event.x) < menuSize.width) {
    menu.style.left = `${data.event.x - menuSize.width}px`;
  } else {
    menu.style.left = `${data.event.x}px`;
  }
  if ((windowSize.height - data.event.y) < menuSize.height) {
    menu.style.top = `${data.event.y - menuSize.height}px`;
  } else {
    menu.style.top = `${data.event.y}px`;
  }
};