import { CartItem } from './cart-item-modal';

export class Order{
    deliveryCharge : number;
    deliverySlot    :   string;
    itemAmount      :   number;
    items           :   CartItem[];
    orderAddress    :   string;
    orderAmount     :   number;
    orderType       :   string;
    status          :    1;
    taxAmount       :   number;
    totalAmount     :   number;
    userId          :   string;
}