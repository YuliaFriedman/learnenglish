import { AppDispatch, AppState, useAppDispatch } from "./Store";
import { useDispatch, useSelector } from "react-redux";
import { setScrollToEnd, resetScroll } from "./ViewReducer";
import { Logger } from "../logger/Logger";

export const ViewProducer = {
    dispatch: useAppDispatch(),

    scrollToEnd: () => {
      Logger.log("viewProducer", "IN scrollToEnd");
      //@ts-ignore
      ViewProducer.dispatch(setScrollToEnd());
    },
    resetScroll: () => {
      Logger.log("viewProducer", "IN resetScroll");
      //@ts-ignore
      ViewProducer.dispatch(resetScroll());
    },
    getScrollToEndValue: () => {
      Logger.log("viewProducer", "IN getScrollToBottom");
      return useSelector((state: AppState) => state.view.shouldScrollToEnd);
    }
}


// export function ViewProducer() {
//   const dispatch = useAppDispatch();
//
//   return {
//     scrollToEnd: () => {
//       console.log("IN scrollToEnd");
//       //@ts-ignore
//       dispatch(setScrollToEnd());
//     },
//     resetScroll: () => {
//       console.log("IN resetScroll");
//       //@ts-ignore
//       dispatch(resetScroll());
//     },
//     getScrollToAndValue: () => {
//       console.log("IN getScrollToBottom");
//       return useSelector((state: AppState) => state.view.shouldScrollToEnd);
//     },
//     getaaaValue: () => {
//       console.log("IN getScrollToBottom");
//       return useSelector((state: AppState) => state.view.aaa);
//     }
//   }
// }

