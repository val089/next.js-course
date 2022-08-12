// import { FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { cardExpirationDateValidator } from '../utils/formValidators';
import { FormInput } from './FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const errorMessage = 'Uzupełnij pole';

const CheckoutFormScheme = yup
  .object({
    firstName: yup.string().required(errorMessage),
    lastName: yup.string().required(errorMessage),
    email: yup.string().email().required(errorMessage),
    phone: yup.string().required(errorMessage),
    cardNumber: yup.string().required(errorMessage),
    cardExpirationDate: yup.string().required(errorMessage),
    cardCVC: yup.string().required(errorMessage),
    country: yup.string().required(errorMessage),
    postalCode: yup.string().required(errorMessage),
  })
  .required();

export type CheckoutFormData = yup.InferType<typeof CheckoutFormScheme>;

export const CheckoutForm = () => {
  const { register, handleSubmit, formState } = useForm<CheckoutFormData>({
    resolver: yupResolver(CheckoutFormScheme),
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  // const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  // };

  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-12 bg-gray-50 md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <div className="flex items-center">
                <span className="w-10 h-10 bg-blue-900 rounded-full"></span>

                <h2 className="ml-4 font-medium">BambooYou</h2>
              </div>

              <div className="mt-8">
                <p className="text-2xl font-medium tracking-tight">$99.99</p>
                <p className="mt-1 text-sm text-gray-500">
                  For the purchase of
                </p>
              </div>

              <div className="mt-12">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    <li className="flex items-center justify-between py-4">
                      <div className="flex items-start">
                        <img
                          className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                          src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                          alt=""
                        />

                        <div className="ml-4">
                          <p className="text-sm">Vibrant Trainers</p>

                          <dl className="mt-1 space-y-1 text-xs text-gray-500">
                            <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">Blue</dd>
                            </div>

                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline">UK 10</dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm">
                          $49.99
                          <small className="text-gray-500">x1</small>
                        </p>
                      </div>
                    </li>

                    <li className="flex items-center justify-between py-4">
                      <div className="flex items-start">
                        <img
                          className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                          src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                          alt=""
                        />

                        <div className="ml-4">
                          <p className="text-sm">Vibrant Trainers</p>

                          <dl className="mt-1 space-y-1 text-xs text-gray-500">
                            <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">Blue</dd>
                            </div>

                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline">UK 10</dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm">
                          $25
                          <small className="text-gray-500">x2</small>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="py-12 bg-white md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <form onSubmit={onSubmit} className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <FormInput
                    id="first_name"
                    label="First Name"
                    name="firstName"
                    useForm={{ register, formState }}
                  />
                </div>

                <div className="col-span-3">
                  <FormInput
                    id="last_name"
                    label="Last Name"
                    name="lastName"
                    useForm={{ register, formState }}
                  />
                </div>

                <div className="col-span-6">
                  <FormInput
                    id="email"
                    label="Email"
                    name="email"
                    useForm={{ register, formState }}
                  />
                </div>

                <div className="col-span-6">
                  <FormInput
                    id="phone"
                    label="Phone"
                    name="phone"
                    useForm={{ register, formState }}
                  />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block mb-1 text-sm text-gray-600">
                    Card Details
                  </legend>

                  <div className="-space-y-px bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="sr-only" htmlFor="card-number">
                        Card Number
                      </label>

                      <input
                        className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        id="card-number"
                        placeholder="Card number"
                        {...register('cardNumber')}
                      />
                    </div>

                    <div className="flex -space-x-px">
                      <div className="flex-1">
                        <label
                          className="sr-only"
                          htmlFor="card-expiration-date"
                        >
                          Expiration Date
                        </label>

                        <input
                          className="border-gray-200 relative rounded-bl-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                          type="text"
                          id="card-expiration-date"
                          placeholder="MM/YY"
                          {...register('cardExpirationDate', {
                            required: true,
                            // pattern: /^\d\d\/\d\d$/,
                            validate: cardExpirationDateValidator,
                          })}
                        />
                      </div>

                      <div className="flex-1">
                        <label className="sr-only" htmlFor="card-cvc">
                          CVC
                        </label>

                        <input
                          className="border-gray-200 relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                          type="text"
                          id="card-cvc"
                          placeholder="CVC"
                          {...register('cardCVC')}
                        />
                      </div>
                    </div>
                  </div>
                  <span role="alert" className="text-red-500">
                    {formState.errors.cardExpirationDate?.message}
                  </span>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block mb-1 text-sm text-gray-600">
                    Billing Address
                  </legend>

                  <div className="-space-y-px bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="sr-only" htmlFor="country">
                        Country
                      </label>

                      <select
                        className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5"
                        id="country"
                        autoComplete="country-name"
                        {...register('country')}
                      >
                        <option>England</option>
                        <option>Wales</option>
                        <option>Scotland</option>
                        <option>France</option>
                        <option>Belgium</option>
                        <option>Japan</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="postal-code">
                        ZIP/Post Code
                      </label>

                      <input
                        className="border-gray-200 relative rounded-b-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        id="postal-code"
                        autoComplete="postal-code"
                        placeholder="ZIP/Post Code"
                        {...register('postalCode')}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <button
                    className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
