export class ResponseMessage<T> {
  constructor(
    private _code: number,
    private _message: string,
    private _payload: T
  ) {}

  set code(value: number) {
    this._code = value;
  }

  set message(value: string) {
    this._message = value;
  }

  set payload(value: T) {
    this._payload = value;
  }

  get code(): number {
    return this._code;
  }

  get message(): string {
    return this._message;
  }

  get payload(): T {
    return this._payload;
  }
}
