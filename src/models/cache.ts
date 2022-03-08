
class Cache<T> {
  private _values: any = {}

  public get(key: string): T {
    return this._values[key]
  }

  public set(key: string, value: T) {
    this._values[key] = value
    return value
  }
}

export default Cache