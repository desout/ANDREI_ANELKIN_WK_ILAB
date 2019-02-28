export interface AdminFactory {
  showEdit: boolean
}

export function AdminFactory() {
  let showEdit = false;
  return {
    showEdit
  }

}