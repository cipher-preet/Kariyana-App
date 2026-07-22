export type OrderDeliveryStatus =
  | 'Recieved'
  | 'packing'
  | 'packed'
  | 'outForDelivery'
  | 'Delivered'
  | 'cancelled'
  | 'Rated';

export const normalizeOrderStatus = (
  status?: string | null,
): OrderDeliveryStatus => {
  const value = String(status || '').trim().toLowerCase();

  switch (value) {
    case 'received':
    case 'recieved':
    case 'order':
    case 'placed':
    case 'created':
      return 'Recieved';
    case 'packing':
    case 'processing':
    case 'inprogress':
    case 'in_progress':
      return 'packing';
    case 'packed':
    case 'confirmed':
      return 'packed';
    case 'outfordelivery':
    case 'out_for_delivery':
    case 'out for delivery':
    case 'dispatched':
      return 'outForDelivery';
    case 'delivered':
    case 'complete':
    case 'completed':
    case 'done':
    case 'orders':
      return 'Delivered';
    case 'cancelled':
    case 'canceled':
      return 'cancelled';
    case 'rated':
      return 'Rated';
    default:
      return 'Recieved';
  }
};

export const getOrderStatusLabel = (status?: string | null) => {
  const normalizedStatus = normalizeOrderStatus(status);

  const labels: Record<OrderDeliveryStatus, string> = {
    Recieved: 'Received',
    packing: 'Packing',
    packed: 'Packed',
    outForDelivery: 'Out for Delivery',
    Delivered: 'Delivered',
    cancelled: 'Cancelled',
    Rated: 'Rated',
  };

  return labels[normalizedStatus];
};

export const getOrderProgressStep = (status?: string | null) => {
  const normalizedStatus = normalizeOrderStatus(status);

  const statusMap: Record<OrderDeliveryStatus, number> = {
    Recieved: 0,
    packing: 0,
    packed: 1,
    outForDelivery: 2,
    Delivered: 3,
    cancelled: 1,
    Rated: 3,
  };

  return statusMap[normalizedStatus];
};
