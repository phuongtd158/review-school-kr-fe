export class Storage {
  private prefix: string;

  constructor(prefix: string = 'app_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  // Set data
  set<T>(key: string, value: T): boolean {
    try {
      const finalKey = this.getKey(key);
      localStorage.setItem(finalKey, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  // Get data
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const finalKey = this.getKey(key);
      const item = localStorage.getItem(finalKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  // Remove data
  remove(key: string): boolean {
    try {
      const finalKey = this.getKey(key);
      localStorage.removeItem(finalKey);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  // Check if exists
  has(key: string): boolean {
    const finalKey = this.getKey(key);
    return localStorage.getItem(finalKey) !== null;
  }

  // Clear all with prefix
  clear(): boolean {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
      keys.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
}

export const storage = new Storage('rsk_');
