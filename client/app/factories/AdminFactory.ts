export interface AdminFactory {
  showEdit: boolean;
}

export const AdminFactory = () => {
  let showEdit = false;
  return {
    showEdit
  };
};
