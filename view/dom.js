export default class ComfeyDom {
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
   * Update DOM, gets triggered by State updates
   * @param {string} stateName
   * @param {*} value
   * @return {void}
   * @memberof Comfey
   */
  update(stateName, value, firstUpdate) {
    if (firstUpdate) {
      if (this.debug) {
        const debugRow = document.createElement('tr');
        debugRow.innerHTML = `
              <th>${stateName}</th>
              <td>
                <span data-bind="${stateName}"></span>
              </td>
            `;
        this.root.querySelector('.comfey-debug tbody').appendChild(debugRow);
      }
    }
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
