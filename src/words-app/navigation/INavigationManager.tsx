export interface INavigationManager {
  navigateHome(): void;
  goToNextStep(): boolean;
  navigateToStep(id: number): void;
}
