#!/usr/bin/env python3
"""
Simple File Encryptor - Encrypt only specified files
"""

import os
import getpass
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
import base64

# ============ আপনি যেসব ফাইল এনক্রিপ্ট করতে চান সেগুলোর নাম লিখুন ============
FILES_TO_ENCRYPT = [
    "index.html",
    "test.html", 
    "database.yml",
    "api_keys.txt",
    "password.txt"
]
# ============================================================================

class SimpleEncrypt:
    def __init__(self):
        self.password = self._get_password()
        self.key = self._make_key()
        self.cipher = Fernet(self.key)
    
    def _get_password(self):
        pwd = os.environ.get('ENCRYPT_PWD')
        if not pwd:
            pwd = getpass.getpass("Enter password: 1234")
        return pwd
    
    def _make_key(self):
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=b'my_salt_123',
            iterations=100000,
        )
        return base64.urlsafe_b64encode(kdf.derive(self.password.encode()))
    
    def encrypt(self, file):
        if os.path.exists(file):
            with open(file, 'rb') as f:
                data = f.read()
            enc = self.cipher.encrypt(data)
            with open(file + '.enc', 'wb') as f:
                f.write(enc)
            os.remove(file)
            print(f"✅ Encrypted: {file}")
            return True
        return False
    
    def decrypt(self, file):
        if file.endswith('.enc') and os.path.exists(file):
            with open(file, 'rb') as f:
                data = f.read()
            dec = self.cipher.decrypt(data)
            orig = file.replace('.enc', '')
            with open(orig, 'wb') as f:
                f.write(dec)
            os.remove(file)
            print(f"✅ Decrypted: {orig}")
            return True
        return False
    
    def encrypt_all(self):
        for file in FILES_TO_ENCRYPT:
            self.encrypt(file)
    
    def decrypt_all(self):
        for file in os.listdir('.'):
            if file.endswith('.enc'):
                self.decrypt(file)

# ============ ব্যবহার ============
if __name__ == "__main__":
    import sys
    
    e = SimpleEncrypt()
    
    if len(sys.argv) > 1:
        if sys.argv[1] == 'enc':
            e.encrypt_all()
        elif sys.argv[1] == 'dec':
            e.decrypt_all()
        elif sys.argv[1] == 'encfile' and len(sys.argv) > 2:
            e.encrypt(sys.argv[2])
        elif sys.argv[1] == 'decfile' and len(sys.argv) > 2:
            e.decrypt(sys.argv[2])
    else:
        print(""使用方法:
  python encrypt.py enc              # সব ফাইল এনক্রিপ্ট
  python encrypt.py dec              # সব ফাইল ডিক্রিপ্ট
  python encrypt.py encfile file.py  # নির্দিষ্ট ফাইল এনক্রিপ্ট
  python encrypt.py decfile file.enc # নির্দিষ্ট ফাইল ডিক্রিপ্ট
        """)