import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useGetProductsQuery } from '@/redux/api/apiSlice';
import {
  setPriceRange,
  setToggle,
} from '@/redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';

export default function Products() {
  const { price, rating, status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  // const [data, setData] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   fetch('./data.json')
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);
  const { data, isLoading } = useGetProductsQuery(undefined);
  console.log('data:', data.data);

  const { toast } = useToast();

  const handleSlider = (value: number[]) => {
    console.log(value);
    dispatch(setPriceRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = data?.data?.filter(
      (item) => item.status === true && item.price < price
    );
  } else if (price > 0) {
    productsData = data.?data?.filter((item) => item.price < price);
  } else {
    productsData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            onClick={() => dispatch(setToggle())}
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">{status}</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {price}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
