// kitchen-mode.js
let wakeLock = null;

async function toggleWakeLock(button) {
    try {
        if (!wakeLock) {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                wakeLock = null;
                updateButtonText(button, false);
                updateStatus(button, 'Screen wake lock released.');
                console.log('Wake Lock released');
            });
            updateButtonText(button, true);
            updateStatus(button, 'Screen wake lock is active.');
            console.log('Wake Lock acquired');
        } else {
            wakeLock.release();
        }
    } catch (err) {
        console.error('Wake Lock failed:', err);
        updateStatus(
            button,
            'Wake lock is not supported here. On iPhone or iPad, set Auto-Lock to Never in Settings.'
        );
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
        button.setAttribute('aria-pressed', String(active));
    }
}

function updateStatus(button, message) {
    const container = button && button.closest('.admonition');
    const status = container && container.querySelector('.wake-status');

    if (status) {
        status.textContent = message;
    }
}

function initKitchenMode() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    document.querySelectorAll('.wake-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', () => toggleWakeLock(btn));
    });

    if (isIOS) {
        document.querySelectorAll('.ios-warning').forEach(el => {
            el.style.display = 'block';
        });
    }
}

document.addEventListener('DOMContentLoaded', initKitchenMode);
