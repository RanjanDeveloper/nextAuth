"use client";
import { increment, decrement, incrementByValue, selectCount, initialState } from "@/lib/store/slices/counterSlice";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/store/hooks";

export default function Buttons() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  console.log("browser");

  return (
    <>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByValue(5))}>Increment by 5</button>
      <div>{count}</div>
    </>
  );
}
