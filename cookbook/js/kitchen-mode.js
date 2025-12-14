// kitchen-mode.js
let wakeLock = null;

// Function to toggle wake lock on/off
export async function toggleWakeLock(button) {
    try {
        if (!wakeLock) {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                wakeLock = null;
                updateButtonText(button, false);
                console.log('Wake Lock released');
            });
            updateButtonText(button, true);
            console.log('Wake Lock acquired');
        } else {
            wakeLock.release();
        }
    } catch (err) {
        console.error('Wake Lock failed:', err);
        alert("Screen wake lock not supported. iOS users: set Auto-Lock → Never in Settings → Display & Brightness.");
    }
}

// Update button text dynamically
function updateButtonText(button, active) {
    if (button) button.textContent = active ? "Release wake lock" : "Keep screen on";
}

// Detect iOS and show advisory automatically
export function initKitchenMode() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    // Attach click handler to all buttons
    document.querySelectorAll('.wake-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleWakeLock(btn));
    });

    // Show advisory for iOS
    if (isIOS) {
        document.querySelectorAll('.ios-warning').forEach(el => el.style.display = 'block');
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', initKitchenMode);
