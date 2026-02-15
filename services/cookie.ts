/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

class CookieService {
  cookie = Cookies;

  set(key: string, value: any) {
    value = JSON.stringify(value);
    this.cookie.set(key, value);
    return true;
  }

  get(key: string) {
    const value = this.cookie.get(key) as string;
    try {
      return JSON.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  }

  delete(name: string) {
    this.cookie.remove(name);
  }

  deleteAll() {
    const cookies = this.cookie.get();
    for (const name in cookies) {
      this.delete(name);
    }
  }
}

const cookie = new CookieService();
export default cookie;
