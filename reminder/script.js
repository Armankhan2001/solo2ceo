// --------------------
// 1️⃣ Register Service Worker
// --------------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log("Service Worker registered"))
    .catch(err => console.error("Service Worker registration failed:", err));
}

// --------------------
// 2️⃣ Ask for notification permission
// --------------------
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// --------------------
// 3️⃣ Set Reminder Logic
// --------------------
const btn = document.getElementById('setReminder');
const status = document.getElementById('status');
const alarm = document.getElementById('alarmSound');

btn.addEventListener('click', () => {
  const msg = document.getElementById('reminderMsg').value.trim();
  const time = document.getElementById('reminderTime').value;

  if (!time) {
    alert("Please select a time!");
    return;
  }

  const now = new Date();
  const [hours, minutes] = time.split(':');
  const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (reminderTime < now) reminderTime.setDate(reminderTime.getDate() + 1);

  const diff = reminderTime - now;

  status.textContent = `⏰ Reminder set for ${reminderTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;

  setTimeout(() => {
    alarm.play();
    showNotification(msg || "Your reminder time!");
  }, diff);
});

// --------------------
// 4️⃣ Show Notification
// --------------------
function showNotification(message) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.showNotification("🔔 Reminder", {
          body: message,
          icon: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png",
          vibrate: [200, 100, 200]
        });
      } else {
        alert("Reminder: " + message);
      }
    });
  } else {
    alert("Reminder: " + message);
  }
}

// --------------------
// 5️⃣ Manual Install Button for PWA
// --------------------
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome from showing default prompt
  e.preventDefault();
  deferredPrompt = e;

  // Create button in your app
  const installBtn = document.createElement('button');
  installBtn.textContent = "Install App";
  installBtn.style.cssText = `
    margin-top:10px;
    padding:8px 12px;
    background:#2563eb;
    color:white;
    border:none;
    border-radius:6px;
    font-weight:bold;
    cursor:pointer;
  `;

  // Append button inside your app container
  document.body.querySelector('div').appendChild(installBtn);

  // Click event triggers install prompt
  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
      installBtn.remove();
    });
  });
});
