/**
 * Comfey
 *
 * Lightweight framework for keeping state for your vanilla Js and simple data binding for HTML
 *
 * Comfey #764 (Japanese: キュワワー Cuwawa) is a Fairy-type Pokémon introduced in Generation VII.
 * It is not known to evolve into or from any other Pokémon.
 *
 * @author Anil Maharjan <anilmaharjan.com.np>
 **/

class Comfey {
  /**
   * Creates an instance of Comfey.
   * @param {View} [view] View updater, implements IView Interface
   * @param {boolean} [debug=false] Flag to enable debug mode
   * @memberof Comfey
   */
  constructor(view, debug = false) {
    this.view = view;
    this.debug = debug;
  }
  /**
   *
   * Initializes a new state and returns getter and setter for the state
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
      if (watcher) watcher(newVal, value, stateName);
      value = newVal;
      this.updateView(stateName, value);
    };
    this.updateView(stateName, value, true);

    return [() => value, setter];
  }

  updateView(stateName, value, firstUpdate) {
    if (this.view) this.view.update(stateName, value, firstUpdate);
  }
}

export default Comfey;
