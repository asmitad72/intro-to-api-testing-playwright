export class LoginDto {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
  // static createLoginWithCorrectData(): LoginDto {
  //   return new LoginDto(process.env.USERNAME || '', process.env.PASSWORD || '');

  static createLoginWithCorrectData(): LoginDto {
    // console.log('USERNAME', process.env.USERNAME)
    // console.log('PASSWORD', process.env.PASSWORD)
    return new LoginDto(process.env.USERNAME || '', process.env.PASSWORD || '')
  }

  static createLoginWithInorrectData(): LoginDto {
    return new LoginDto('invalid', 'invalid')
  }
}
