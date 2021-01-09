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
   * @param {Node} [root=document] Root DOM node of your application, defaults to document
   * @param {boolean} [debug=false] Flag to enable debug mode
   * @memberof Comfey
   */
  constructor(root = document, debug = false) {
    this.root = root;
    this.debug = debug;

    if (debug) {
      const rootIdentifier =
        root.tagName + (root.id != '' ? '#' + root.id : '');
      const debugUI = document.createElement('div');
      debugUI.addEventListener('dragend', (e) => {
        e.preventDefault();
        e.target.style.top = `${e.pageY}px`;
        e.target.style.left = `${e.pageX}px`;
      });
      debugUI.setAttribute('class', 'comfey-debug');
      debugUI.setAttribute('draggable', true);
      debugUI.innerHTML = `<h2>Comfey Debug (${rootIdentifier})</h2>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          </tbody>`;
      this.root.appendChild(debugUI);
    }
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
    this.updateView(stateName, value);
    if (this.debug) {
      const debugRow = document.createElement('tr');
      debugRow.innerHTML = `
              <th>${state}</th>
              <td>
                <span data-bind="${state}"></span>
              </td>
            `;
      this.root.querySelector('.comfey-debug tbody').appendChild(debugRow);
    }
    return [() => value, setter];
  }

  /**
   * Update DOM, gets triggered by State updates
   * @private
   * @param {string} stateName
   * @param {*} value
   * @return {void}
   * @memberof Comfey
   */
  updateView(stateName, value) {
    const boundElems = this.root.querySelectorAll(`[data-bind="${stateName}"]`);
    for (const boundEl of boundElems) {
      boundEl.innerHTML = value;
    }

    // Visible
    const boundVisibleElems = this.root.querySelectorAll(
      `[data-bind-visible^="${stateName}"]`
    );

    for (const boundEl of boundVisibleElems) {
      const [, val, comparator] = boundEl.dataset.bindVisible.split('::');
      if (comparator) {
        console.warn(
          'Comfey: Comparators are not yet supported in bind-visible.'
        );
      }
      if (val) {
        if (val === value) {
          boundEl.classList.add('visible');
        } else {
          boundEl.classList.remove('visible');
        }
      } else if (value) boundEl.classList.add('visible');
      else boundEl.classList.remove('visible');
    }

    // Hidden
    const boundHiddenElems = this.root.querySelectorAll(
      `[data-bind-hidden="${stateName}"]`
    );
    for (const boundEl of boundHiddenElems) {
      if (value) boundEl.classList.add('hidden');
      else boundEl.classList.remove('hidden');
    }

    // Classes
    const boundClassElems = this.root.querySelectorAll(
      `[data-bind-class^="${stateName}:"]`
    );
    for (const boundEl of boundClassElems) {
      const [, val, comparator] = boundEl.dataset.bindClass.split('::');
      const className = val;
      if (!className) return;

      if (
        (value && !comparator) ||
        (value && comparator && value == comparator)
      )
        boundEl.classList.add(className);
      else boundEl.classList.remove(className);
    }

    // Attr
    const boundAttrElems = this.root.querySelectorAll(
      `[data-bind-attr^="${stateName}:"]`
    );
    for (const boundEl of boundAttrElems) {
      const [, attr, val] = boundEl.dataset.bindAttr.split('::');
      if (value) boundEl.setAttribute(attr, val.replaceAll('$', value));
      else boundEl.removeAttribute(attr);
    }
  }
}

export default Comfey;
