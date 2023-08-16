import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addToCart,
  removeFromCart,
  removeOneFromCart,
} from '@/redux/features/cart/cartSlice';

export default function Cart() {
  //! Dummy data
  const { carts, total } = useAppSelector((state) => state.cart);
  // const carts: Icart[] = [];
  // let total = 0;
  // carts?.map((cart) => (total += cart.price));
  // console.log('total:', total);
  const dispatch = useAppDispatch();

  //! **

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <h1>Total: {total.toFixed(2)}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {carts.map((cart) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={cart.name}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={cart?.image} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{cart?.name}</h1>
                <p>Quantity: {cart.quantity}</p>
                <p className="text-xl">
                  Total Price: {(cart.price * cart.quantity!).toFixed(2)} $
                </p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button
                  onClick={() => {
                    dispatch(addToCart(cart));
                  }}
                >
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => dispatch(removeOneFromCart(cart))}>
                  <HiMinus size="20" />
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => dispatch(removeFromCart(cart))}
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}