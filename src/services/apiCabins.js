import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('cabins cound not be loaded');
  }
  return data;
}

export async function createCabin(newCabin) {
  // create imageName

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  // https://mhuakitottmdslslzrjc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const imageUrl

  // create a new Cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  // upload the photo

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // if there is an error uploading the photo then delete the created cabin
  await supabase.from('cabins').delete().eq('id', data.id);
  if (error) {
    console.log(storageError);
    throw new Error('image could not be uploaded');
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('cabins cound not be loaded');
  }
  return data;
}
