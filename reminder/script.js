// Register service worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

// Ask for notification permission
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

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

function showNotification(message) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(reg => {
      reg.showNotification("🔔 Reminder", {
        body: message,
        icon: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png",
        vibrate: [200, 100, 200],
        sound: true
      });
    });
  } else {
    alert("Reminder: " + message);
  }
}
