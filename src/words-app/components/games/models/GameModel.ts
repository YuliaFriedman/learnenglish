export interface GameModel<T> {
  model: T;
  onCompleted: () => void;
}
