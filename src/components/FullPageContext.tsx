"use client";

import { createContext, useContext } from "react";

export interface FullPageState {
  /** 当前整屏下标 0..n-1 */
  active: number;
  /** 跳转到指定屏 */
  moveTo: (index: number) => void;
}

export const FullPageContext = createContext<FullPageState>({
  active: 0,
  moveTo: () => {},
});

export function useFullPage(): FullPageState {
  return useContext(FullPageContext);
}
