import { showToast } from "./toast";

export async function copyToClipboard(text, successMessage = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch {
    showToast("Couldn't copy. Please copy it manually.", "error");
  }
}
