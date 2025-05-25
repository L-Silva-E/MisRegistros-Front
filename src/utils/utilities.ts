export function refreshWindow() {
  window.location.reload();
}

export function setTimeText(time: number) {
  if (time < 60) {
    return `${time} minutos`;
  } else {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if (minutes === 0) return `${hours} hora`;
    return `${hours} hr ${minutes} min`;
  }
}
