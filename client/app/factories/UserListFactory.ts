export interface UserListFactory {
  isToggled: boolean
}

export function UserListFactory() {
  let isToggled = false;
  return {
    isToggled
  }

}