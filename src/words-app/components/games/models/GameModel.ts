export interface GameComponentProps<T> {
  // route: {
  //   params: {
  //     model: T
  //     onCompleted: () => void;
  //   }
  // },
  // navigation: any;

  model: T
  onCompleted: () => void;
}
