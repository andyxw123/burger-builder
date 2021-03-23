import React from 'react';
import css from './FormControl.module.css';

export const checkValidity = (value, rules) => {
  if (!rules) {
    return true;
  }

  let error = null;

  if (rules.required && !value.trim()) {
    error = 'Required';
  }

  if (!error && rules.minLength && value.length < rules.minLength) {
    error = `Min length is ${rules.minLength}`;
  }

  if (!error && rules.maxLength && value.length > rules.maxLength) {
    error = `Max length is ${rules.maxLength}`;
  }

  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    !error &&
    rules.isEmail &&
    !emailPattern.test(String(value).toLowerCase())
  ) {
    error = 'Email address not valid';
  }

  return error;
}

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
      controlElement = <input required />;
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
