import { hash, compare } from 'bcryptjs';


export default class BCryptJSHashProvider {

  async generateHash(source:string):Promise<string>{
    let newHash = hash(source, 8)
    return newHash;
  }  

  async compareHash(source: string, target: string): Promise<boolean> {
    return compare(source, target);
  }
}

