import { UseFormRegister, Path, FieldValues, FormState } from 'react-hook-form';

interface FormInputProps<FormData extends FieldValues> {
  label: string;
  id: string;
  name: Path<FormData>;
  useForm: {
    register: UseFormRegister<FormData>;
    formState: FormState<FormData>;
  };
}

export const FormInput = <FormData extends FieldValues>({
  name,
  label,
  id,
  useForm: { register, formState },
  ...restProps
}: FormInputProps<FormData>) => {
  const maybeErrorMessage = formState.errors[name]?.message;
  const errorMessage =
    typeof maybeErrorMessage === 'string' ? maybeErrorMessage : null;

  return (
    <>
      <label className="block mb-1 text-sm text-gray-600" htmlFor={id}>
        {label}
      </label>

      <input
        className={`rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5 ${
          errorMessage && 'border-red-500'
        }`}
        type="text"
        id={id}
        {...register(name)}
        {...restProps}
      />

      <span role="alert" className="text-red-500">
        {errorMessage}
      </span>
    </>
  );
};
