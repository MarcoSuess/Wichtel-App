export class Channel {
  public name: any;
  public password: any;
  public ID: any;
  public joinedUser: any;
  public admin: any;
  public allUsers: any = [];
  public open: boolean = true;

  public toJson() {
    return {
      name: this.name,
      password: this.password,
      ID: this.ID,
      joinedUser: this.joinedUser,
      admin: this.admin,
      allUsers: this.allUsers,
      open: this.open
    };
  }
}
