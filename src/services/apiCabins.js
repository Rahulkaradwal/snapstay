import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('cabins cound not be loaded');
  }
  return data;
}

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
//   // create imageName
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     '/',
//     ''
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // const imageUrl
//   let query = supabase.from('cabins');

//   // create a new Cabin
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // edit a cabin
//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.log(error);
//     throw new Error('Cabin could not be created');
//   }

//   // upload the photo

//   const { error: storageError } = await supabase.storage
//     .from('cabin-images')
//     .upload(imageName, newCabin.image);

//   // if there is an error uploading the photo then delete the created cabin
//   await supabase.from('cabins').delete().eq('id', data.id);
//   if (error) {
//     console.log(storageError);
//     throw new Error('image could not be uploaded');
//   }

//   return data;
// }

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  if (!hasImagePath && newCabin.image) {
    // Only process image upload if there's a new image that's not already uploaded
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      '/',
      ''
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Attempt to upload the photo first
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (storageError) {
      console.log(storageError);
      throw new Error('Image could not be uploaded');
    }

    newCabin.image = imagePath; // Update the image path only after successful upload
  }

  let query = supabase.from('cabins');
  if (!id) {
    // Create a new cabin
    query = query.insert([newCabin]);
  } else {
    // Edit an existing cabin
    query = query.update(newCabin).eq('id', id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created/updated');
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
