class EncryptPassword {
  public password: string;

  public constructor(password: string) {
    this.password = this.encryptIt(password);
  }

  private encryptIt(password: string): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto');
    const secret = 'alphaGame02';
    const hash = crypto
      .createHmac('sha256', secret)
      .update(password)
      .digest('hex');

    return hash;
  }
}

export { EncryptPassword };
