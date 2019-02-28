export interface UserListFactory {
  isToggled: boolean;
}

export const UserListFactory = () => {
  let isToggled = false;
  return {
    isToggled
  };
};
