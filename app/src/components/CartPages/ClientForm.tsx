import { FieldErrors, UseFormRegister } from 'react-hook-form';

import TextInputFields from '../TextInputFields';
import * as FoodApi from '../../hooks/foodShop.api';

import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

interface IClientFormProps {
  myregister: UseFormRegister<FoodApi.ICustomerInput>;
  errors: FieldErrors<FoodApi.ICustomerInput>;
}
const ClientForm = ({ myregister, errors }: IClientFormProps) => {
  const [showError, SetShowError] = useState<String | null>(null);

  useEffect(() => {
    SetShowError(null);
  }, [myregister]);

  return (
    <>
      {showError && <Alert variant="danger">{showError}</Alert>}
      {errors.phone && <Alert variant="danger">{errors.phone?.message}</Alert>}
      <TextInputFields
        name="name"
        label="Name"
        type="text"
        register={myregister}
        placeholder="Name"
        required
        error={errors.name}
      />
      <TextInputFields
        name="email"
        label="E-mail"
        type="email"
        required
        register={myregister}
        placeholder="Email"
        error={errors.email}
      />
      <TextInputFields
        name="phone"
        label="Phone"
        type="tel"
        pattern="^[0-9]+"
        title="only digits are valid for this field"
        required
        register={myregister}
        placeholder="Phone"
        error={errors.phone}
      />
      <TextInputFields
        name="address"
        label="Address"
        type="text"
        required
        register={myregister}
        placeholder="Address"
        registerOptions={{
          required: {
            value: true,
            message: 'Fill the adress',
          },
        }}
        error={errors.address}
        className="mb-5"
      />
    </>
  );
};

export default ClientForm;
