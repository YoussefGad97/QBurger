import React, { useState } from 'react';
import { Button } from '@mui/material';
import OrderDialog from './OrderDialog';

const BurgerCard = ({ burger }) => {
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  return (
    <>
      {/* Your existing card content */}
      <Button 
        variant="contained" 
        onClick={() => setOrderDialogOpen(true)}
      >
        Order Now
      </Button>

      <OrderDialog
        open={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        burger={burger}
      />
    </>
  );
};

export default BurgerCard; 