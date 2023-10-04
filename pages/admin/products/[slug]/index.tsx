import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { AdminLayout } from '@/components';
import { dbProducts } from '@/database';
import { IProduct, ISize, IType } from '@/interfaces';
import { tesloApi } from '@/api';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log({ value, name, type });
      if (name === 'title') {
        const newSlug =
          value.title?.trim().replaceAll(' ', '-').replaceAll("'", '').toLocaleLowerCase() || '';

        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  /*   //This was my way to implement the label submision when spacebar was pressed
  useEffect(() => {
    if (newTag.trimStart().toLocaleLowerCase().includes(' ')) {
      const tags = getValues('tags');
      setValue('tags', [...tags, newTag]);
      setNewTag('');
    }
  }, [newTag, getValues, setValue]); */

  const onNewTag = () => {
    const newTagValue = newTag.trim().toLocaleLowerCase();
    const tags = getValues('tags');

    if (tags.includes(newTagValue)) {
      setNewTag('');
      return;
    }

    setValue('tags', [...tags, newTagValue], { shouldValidate: true });
    setNewTag('');
  };

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues('sizes');

    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }

    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onDeleteTag = (tag: string) => {
    const currentTags = getValues('tags');
    setValue(
      'tags',
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (formData: FormData) => {
    if (formData.images.length < 2) return alert('Minimum 2 images required');
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: '/admin/products',
        method: 'PUT',
        data: formData,
      });
      if (!formData._id) {
        //TODO: recargar navegador
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);

      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={'Product'}
      subTitle={`Editing: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            color='secondary'
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type='submit'
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Title'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label='Description'
              variant='filled'
              fullWidth
              rows='5'
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label='Stock'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label='Price'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />
            <Box display='flex' flexDirection='column'>
              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  row
                  value={getValues('type')}
                  onChange={({ target }) =>
                    setValue('type', target.value as IType, { shouldValidate: true })
                  }
                >
                  {validTypes.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color='secondary' />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  {...register('gender')}
                  value={getValues('gender')}
                  onChange={({ target }) =>
                    setValue('gender', target.value as any, { shouldValidate: true })
                  }
                >
                  {validGender.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color='secondary' />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <FormGroup>
                <FormLabel>Sizes</FormLabel>
                <Box display='flex'>
                  {validSizes.map((size) => (
                    <FormControlLabel
                      key={size}
                      control={<Checkbox checked={getValues('sizes').includes(size as ISize)} />}
                      label={size}
                      onChange={() => onChangeSize(size as ISize)}
                    />
                  ))}
                </Box>
              </FormGroup>
            </Box>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Slug - URL'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
                validate: (val) =>
                  val.trim().includes(' ') ? 'Can not have blank spaces' : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label='Search labels'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              helperText='Press [spacebar] to add'
              value={newTag}
              onChange={({ target }) => setNewTag(target.value)}
              onKeyUp={({ code }) => (code === 'Space' ? onNewTag() : undefined)}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component='ul'
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color='primary'
                    size='small'
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection='column'>
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button color='secondary' fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
                Upload Image
              </Button>

              <Chip label='Minimum 2 images required' color='error' variant='outlined' />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component='img'
                        className='fadeIn'
                        image={`/products/${img}`}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color='error'>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  const product = await dbProducts.getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;