import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // this is also correct   mutationFn: (newCabin) => createCabin(newCabin)
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin has been created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
