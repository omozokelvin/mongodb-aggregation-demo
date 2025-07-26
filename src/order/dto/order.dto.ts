import { PaginationMeta } from '@/_lib/dtos/pagination.dto';
import { Order, ProductCategory } from '@/order/entities/order.entity';

export class SingleGroup {
  _id: ProductCategory;
  totalSales: number;
  numberOfOrders: number;
}

export class GroupResponseDto {
  items: SingleGroup[];
  meta: PaginationMeta;
}

export class SingleProject {
  customerName: string;
  orderIdentifier: string;
  formattedTotal: string;
}

export class ProjectResponseDto {
  items: SingleProject[];
  meta: PaginationMeta;
}

export class SortResponseDto {
  items: Order[];
  meta: PaginationMeta;
}
