import React from 'react';
import css from './FormControl.module.css';

const formControl = (props) => {
  let controlElement = null;
  let elementClasses = [css.InputElement];

  if (props.hasValidation && props.touched && props.error) {
    elementClasses.push(css.Invalid);
  }

  switch (props.tag) {
    case 'textarea':
      controlElement = <textarea />;
      break;
    case 'select':
      controlElement = (<select>
        {props.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.display}</option>
        ))}
      </select>);
      break;
    case 'input':
    default:
      controlElement = <input />;
      break;
  }

  if (controlElement) {
    controlElement = React.cloneElement(controlElement, {
      name: props.id,
      ...props.config,
      value: props.value,
      title: props.error || null,
      className: elementClasses.join(' '),
      onChange: props.onChange,
      readOnly: typeof props.onChange !== 'function',
    });
  }

  return (
    <div className={css.FormControl}>
      {props.label && <label>{props.label}</label>}
      {controlElement}
      {props.error && <div className={css.Error}>{props.error}</div>}
    </div>
  );
};

export default formControl;
