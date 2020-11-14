/**
 * Comfey #764 (Japanese: キュワワー Cuwawa) is a Fairy-type Pokémon introduced in Generation VII.
 * It is not known to evolve into or from any other Pokémon.
 * Height
 * 0'04"	0.1 m
 * Weight
 * 0.7 lbs.	0.3 kg
 **/
class Comfey {
  constructor(root = document) {
    this.root = root;
  }
  /**
   *
   * @param {string} state name of the state
   * @param {any} initialVal initial value
   * @param {function} watcher watcher function that will be called everytime the value of the state changes
   *
   * @returns {Array<[function, function]>} getterFunction and SetterFunction
   */
  useState(state, initialVal, watcher) {
    const stateName = state;
    let value = initialVal;
    const setter = (newVal) => {
      if (watcher) watcher(newVal, value);
      value = newVal;
      this.updateView(stateName, value);
    };
    this.updateView(stateName, value);
    return [() => value, setter];
  }

  updateView(stateName, value) {
    const boundElems = this.root.querySelectorAll(`[data-bind="${stateName}"]`);
    for (const boundEl of boundElems) {
      boundEl.innerHTML = value;
    }
    const boundVisibleElems = this.root.querySelectorAll(
      `[data-bind-visible="${stateName}"]`
    );
    for (const boundEl of boundVisibleElems) {
      if (value) boundEl.classList.add('visible');
      else boundEl.classList.remove('visible');
    }
    const boundHiddenElems = this.root.querySelectorAll(
      `[data-bind-hidden="${stateName}"]`
    );
    for (const boundEl of boundHiddenElems) {
      if (value) boundEl.classList.add('hidden');
      else boundEl.classList.remove('hidden');
    }
  }
}

export default Comfey;
