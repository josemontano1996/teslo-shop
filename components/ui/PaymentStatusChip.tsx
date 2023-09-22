import { Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { FC } from 'react';

interface Props {
  isPaid: boolean;
}

export const PaymentStatusChip: FC<Props> = ({ isPaid }) => {
  return (
    <>
      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Payment successful'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Payment pending'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
        />
      )}
    </>
  );
};
