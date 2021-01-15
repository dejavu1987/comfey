export default function fsm(app, state, config, watcher) {
  const [getState, setState] = app.useState(state, config.start, watcher);

  const _transitions = () => {
    return config[getState()];
  };

  const getTransitions = () => {
    return Object.keys(_transitions());
  };

  const transition = (key) => {
    if (!_transitions().hasOwnProperty(key))
      throw new Error("Invalid transition key");
    setState(_transitions()[key]);
  };

  return { getState, getTransitions, transition };
}
