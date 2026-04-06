// ==============================================
// ইউজার ডাটাবেস ফাইল (userdatabase.js)
// ==============================================

console.log("✅ userdatabase.js লোড হয়েছে!");

// এনক্রিপশন ফাংশন
function encrypt(pwd) {
    return btoa(pwd.split('').reverse().join('') + 'fix2026');
}

// ইউজার ডাটাবেস
const USERS_DATABASE = {
    "admin": encrypt("1234"),
    "user1": encrypt("1111"),
    "user2": encrypt("2222")
};

// লগইন চেক ফাংশন
function checkLogin(username, password) {
    console.log("checkLogin called for:", username);
    
    if (USERS_DATABASE[username]) {
        try {
            let decrypted = atob(USERS_DATABASE[username]);
            let originalPwd = decrypted.slice(0, -7).split('').reverse().join('');
            console.log("Stored password:", originalPwd);
            console.log("Entered password:", password);
            return originalPwd === password;
        } catch(e) {
            console.error("Decrypt error:", e);
            return false;
        }
    }
    console.log("User not found:", username);
    return false;
}

// টেস্ট করার জন্য (কনসোলে দেখাবে)
console.log("Available users:", Object.keys(USERS_DATABASE));