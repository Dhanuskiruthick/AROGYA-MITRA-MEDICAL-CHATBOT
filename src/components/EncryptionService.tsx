// End-to-End Encryption Service for Medical Data Privacy
class EncryptionService {
  private static instance: EncryptionService;
  private encryptionKey: CryptoKey | null = null;

  private constructor() {}

  public static getInstance(): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService();
    }
    return EncryptionService.instance;
  }

  // Generate a new encryption key for each session
  public async generateSessionKey(): Promise<void> {
    try {
      if (!window.isSecureContext) {
        console.warn('Not in secure context - encryption features may be limited');
        throw new Error('Secure context (HTTPS) required for encryption');
      }

      if (!window.crypto || !window.crypto.subtle) {
        throw new Error('Web Crypto API not available');
      }

      this.encryptionKey = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to generate encryption key:', {
        error: errorMessage,
        cryptoAvailable: !!window.crypto,
        subtleAvailable: !!(window.crypto && window.crypto.subtle),
        isSecureContext: window.isSecureContext,
        protocol: window.location.protocol,
        hostname: window.location.hostname
      });
      throw new Error(`Encryption initialization failed: ${errorMessage}`);
    }
  }

  // Encrypt sensitive medical data
  public async encryptData(data: string): Promise<string> {
    if (!this.encryptionKey) {
      await this.generateSessionKey();
    }

    try {
      if (!window.crypto || !window.crypto.subtle) {
        throw new Error('Web Crypto API not available');
      }

      const encoder = new TextEncoder();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        this.encryptionKey!,
        encoder.encode(data)
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedBuffer), iv.length);

      // Convert to base64 for transmission
      return btoa(String.fromCharCode.apply(null, Array.from(combined)));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Encryption failed:', {
        error: errorMessage,
        hasKey: !!this.encryptionKey,
        cryptoAvailable: !!window.crypto,
        subtleAvailable: !!(window.crypto && window.crypto.subtle)
      });
      throw new Error(`Data encryption failed: ${errorMessage}`);
    }
  }

  // Decrypt medical data
  public async decryptData(encryptedData: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('No encryption key available');
    }

    try {
      if (!window.crypto || !window.crypto.subtle) {
        throw new Error('Web Crypto API not available');
      }

      // Convert from base64
      const combined = new Uint8Array(
        [...atob(encryptedData)].map(char => char.charCodeAt(0))
      );

      // Extract IV and encrypted data
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        this.encryptionKey!,
        encrypted
      );

      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Decryption failed:', {
        error: errorMessage,
        hasKey: !!this.encryptionKey,
        dataLength: encryptedData.length,
        cryptoAvailable: !!window.crypto,
        subtleAvailable: !!(window.crypto && window.crypto.subtle)
      });
      throw new Error(`Data decryption failed: ${errorMessage}`);
    }
  }

  // Clear session key for privacy
  public clearSession(): void {
    this.encryptionKey = null;
    // Clear any cached data
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      // Clear any medical data from memory
      if (window.gc) {
        window.gc();
      }
    }
  }

  // Generate anonymous session ID
  public generateAnonymousId(): string {
    try {
      if (!window.crypto || !window.crypto.getRandomValues) {
        // Fallback to Math.random if crypto not available
        console.warn('Crypto.getRandomValues not available, using fallback');
        return Math.random().toString(36).substring(2, 18);
      }
      
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Failed to generate anonymous ID:', error);
      // Fallback to timestamp-based ID
      return `fallback_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
  }

  // Hash sensitive data for privacy
  public async hashData(data: string): Promise<string> {
    try {
      if (!window.crypto || !window.crypto.subtle) {
        throw new Error('Web Crypto API not available');
      }

      const encoder = new TextEncoder();
      const hash = await window.crypto.subtle.digest('SHA-256', encoder.encode(data));
      return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Hashing failed:', {
        error: errorMessage,
        cryptoAvailable: !!window.crypto,
        subtleAvailable: !!(window.crypto && window.crypto.subtle)
      });
      throw new Error(`Data hashing failed: ${errorMessage}`);
    }
  }
}

export { EncryptionService };