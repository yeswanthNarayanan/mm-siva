/**
 * Converts a Google Drive share URL to a direct viewable image URL.
 * Share URL: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://lh3.googleusercontent.com/d/FILE_ID
 */
export function convertGDriveLink(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`
  }
  // Fallback: try uc?id= format
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idMatch) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`
  }
  return url
}

export function isGDriveLink(url: string): boolean {
  return url.includes('drive.google.com') || url.includes('docs.google.com')
}

export function getImageUrl(url: string, source: string): string {
  if (source === 'gdrive' || isGDriveLink(url)) {
    return convertGDriveLink(url)
  }
  return url
}
