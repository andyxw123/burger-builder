import React from 'react';
import FormControl from './FormControl/FormControl';

const buildFormControlsArray = (formConfig, formProps) => {
  const formControlsArray = [];

  for (let key in formConfig) {
    const config = {
      id: key,
      ...formConfig[key],
    };

    config.onChange = formConfig.onChange || formProps.onChange;

    formControlsArray.push(config);
  }

  return formControlsArray;
};

const form = (props) => {
  const formControlsArray = buildFormControlsArray(props.formConfig, props);

  return (
    <form onSubmit={props.onSubmit}>
      {formControlsArray.map((control) => (
        <FormControl
          key={control.id}
          {...control}
          touched={control.touched}
          error={control.error}
          hasValidation={!!control.validation}
        />
      ))}
      {props.children}
    </form>
  );
};

export default form;
