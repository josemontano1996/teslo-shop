import { FC } from 'react';
import { ISize } from '@/interfaces';
import { Box, Button } from '@mui/material';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

export const ProductSizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size='small'>
          {size}
        </Button>
      ))}
    </Box>
  );
};
