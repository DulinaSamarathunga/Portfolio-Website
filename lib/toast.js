// Fire-and-forget toast notifications, rendered by <Toaster />.
export function showToast(message, type = "success") {
  window.dispatchEvent(new CustomEvent("toast", { detail: { message, type } }));
}
