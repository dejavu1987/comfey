//  Custom data binding framework v0.1
/**
 *
 * @param {string} state name of the state
 * @param {any} initialVal initial value
 * @param {function} watcher watcher function that will be called everytime the value of the state changes
 *
 * @returns {Array<[function, function]>} getterFunction and SetterFunction
 */
function useState(state, initialVal, watcher) {
  const stateName = state;
  let value = initialVal;
  const setter = (newVal) => {
    if (watcher) watcher(newVal, value);
    value = newVal;
    updateView(stateName, value);
  };
  updateView(stateName, value);
  return [() => value, setter];
}

function updateView(stateName, value) {
  const boundElems = document.querySelectorAll(`[data-bind="${stateName}"]`);
  for (const boundEl of boundElems) {
    boundEl.innerHTML = value;
  }
  const boundVisibleElems = document.querySelectorAll(
    `[data-bind-visible="${stateName}"]`
  );
  for (const boundEl of boundVisibleElems) {
    if (value) boundEl.classList.add('visible');
    else boundEl.classList.remove('visible');
  }
  const boundHiddenElems = document.querySelectorAll(
    `[data-bind-hidden="${stateName}"]`
  );
  for (const boundEl of boundHiddenElems) {
    if (value) boundEl.classList.add('hidden');
    else boundEl.classList.remove('hidden');
  }
}

export { useState };
