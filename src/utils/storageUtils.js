function checkStorageQuota() {
  try {
    localStorage.setItem('test', 'a'.repeat(1024 * 1024 * 4)); // 4MB test
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

function saveWithQuotaCheck(key, value) {
  if (checkStorageQuota()) {
    localStorage.setItem(key, value);
  } else {
    // Implement fallback strategy
    console.warn('Storage quota exceeded, implementing fallback');
    sessionStorage.setItem(key, value);
  }
} 