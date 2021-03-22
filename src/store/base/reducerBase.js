import { SET } from './actionsBase';
import objectPath from 'object-path';

const reducerBase = {
    [SET]: (state, action) => {
      objectPath.set(state, action.path, action.value);
    }
};

export default reducerBase;

