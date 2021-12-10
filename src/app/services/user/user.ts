export class User {
  public uid: BigInteger | undefined;
  public email: string | undefined;
  public displayName: string | any;
  public emailVerified: boolean | undefined;
  public online: boolean | undefined;
  public wishes: any = [];

  constructor() {}

  public toJson() {
    return {
      uid: this.uid,
      email: this.email,
      displayName: this.displayName,
      emailVerified: this.emailVerified,
      online: this.online,
      wishes: this.wishes,
    };
  }
}
