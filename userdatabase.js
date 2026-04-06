// ==============================================
// ইউজার ডাটাবেস ফাইল (database.js)
// ==============================================

// এনক্রিপশন ফাংশন
function encrypt(pwd) {
    return btoa(pwd.split('').reverse().join('') + 'fix2026');
}

// ইউজার ডাটাবেস - এখানে আপনার ইউজার যোগ/রিমুভ করুন
const USERS_DATABASE = {
    "admin": encrypt("1234"),
    "user1": encrypt("1111"),
    "user2": encrypt("2222")
  
};

// ডিক্রিপ্ট ফাংশন (লগইন চেকের জন্য)
function checkLogin(username, password) {
    if (USERS_DATABASE[username]) {
        try {
            let decrypted = atob(USERS_DATABASE[username]);
            let originalPwd = decrypted.slice(0, -7).split('').reverse().join('');
            return originalPwd === password;
        } catch(e) {
            return false;
        }
    }
    return false;
}

// ইউজারনেম ভ্যালিড চেক
function isValidUser(username) {
    return USERS_DATABASE.hasOwnProperty(username);
}

// সব ইউজারনেম পাওয়া (যদি প্রয়োজন হয়)
function getAllUsernames() {
    return Object.keys(USERS_DATABASE);
}