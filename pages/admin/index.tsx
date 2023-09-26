import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { AdminLayout } from '@/components';
import { SummaryTile } from '@/components/admin';
import { DashboardSummaryResponse } from '@/interfaces';

const DashBoardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000,
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Erro while charging information</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data;

  return (
    <AdminLayout title='Dashboard' subTitle='General stats' icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle='Total Orders'
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={paidOrders}
          subTitle='Payed Orders'
          icon={<AttachMoneyOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={notPaidOrders}
          subTitle='Pending Orders'
          icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle='Clients'
          icon={<GroupOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle='Products'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle='Out of Stock'
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={lowInventory}
          subTitle='Low Stock'
          icon={<ProductionQuantityLimitsOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={refreshIn}
          subTitle='Auto-refresh in:'
          icon={<AccessTimeOutlined color='error' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashBoardPage;
