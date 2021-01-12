import React from 'react';
import { useSelector } from 'react-redux'

import DialogWithConfirm from './DialogWithConfirm';
import ProductAmountDialog from './ProductAmountDialog';
import SupplierDialog from './SupplierDialog';
import PersonalInfoDialog from "./PersonalInfoDialog";
import CenterDialog from './CenterDialog';
import DatePickerDialog from './DatePickerDialog'

export default function () {
    const { type = '' } = useSelector((state: any) => state.notifications)
    switch (type) {
        case 'confirm':
            return <DialogWithConfirm />;
        case 'productQty':
            return <ProductAmountDialog />;
        case 'supplier':
            return <SupplierDialog />;
        case 'personal':
            return <PersonalInfoDialog />;
        case 'center':
            return <CenterDialog />;
        case 'datepicker':
            return <DatePickerDialog />;

    }
};
