import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const FormRow1 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState, getValues } = useForm();

  const { mutate, isLoading } = useMutation({
    // this is also correct   mutationFn: (newCabin) => createCabin(newCabin)
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin has been created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const { errors } = formState;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow1>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow1>

      <FormRow1>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
          })}
        />{' '}
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow1>

      <FormRow1>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />{' '}
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow1>

      <FormRow1>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().discount ||
              'discount should be less than price',
          })}
        />{' '}
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow1>

      <FormRow1>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />{' '}
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow1>

      <FormRow1>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow1>

      <FormRow1>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow1>
    </Form>
  );
}

export default CreateCabinForm;
