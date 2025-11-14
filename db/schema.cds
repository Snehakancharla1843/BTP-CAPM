namespace ust.sneha.kancharla.db;
using { ust.sneha.kancharla.reuse as T} from './common.cds';
using { cuid ,Currency } from '@sap/cds/common';

entity Employee:cuid{
    nameFirst : String(40);
    nameMiddle:String(40);
    nameLast:String(40);
    nameInitials:String(40);
    Gender:T.Gender;
    Language:String(1);
    phoneNumber:T.phno;
    Email:T.email;
    loginName:String(12);
    currency:Currency;
    salaryAmount:Decimal(10,2);
    accountNumber:String(16);
    bankId:String(8);
    bankName:String(64);




}

