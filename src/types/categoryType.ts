export interface CategoryItem {
  _id: string;
  name: string;
  isActive: boolean;
  images: string;
}

export interface CategoryResponse {
  [key: string]: CategoryItem[];
}

export interface ApiResponse {
  success: boolean;
  isLoading:boolean;
  error:any;
  data: CategoryResponse;
}