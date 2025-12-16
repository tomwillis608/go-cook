// kitchen-mode.js
let wakeLock = null;

async function toggleWakeLock(button) {
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
        alert(
            "Screen wake lock not supported. iOS users: set Auto-Lock → Never in Settings → Display & Brightness."
        );
    }
}

function updateButtonText(button, active) {
    if (button) {
        button.textContent = active
            ? "Release wake lock"
            : "Keep screen on";
    }
}

function initKitchenMode() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    document.querySelectorAll('.wake-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleWakeLock(btn));
    });

    if (isIOS) {
        document.querySelectorAll('.ios-warning').forEach(el => {
            el.style.display = 'block';
        });
    }
}

document.addEventListener('DOMContentLoaded', initKitchenMode);
