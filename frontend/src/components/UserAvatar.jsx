import { UserCircle2 } from 'lucide-react'
import { useState } from 'react'

const SIZE_TO_ICON = {
  xs: 14,
  sm: 18,
  md: 22,
}

function UserAvatar({ user, size = 'sm' }) {
  const [failedUrl, setFailedUrl] = useState('')
  const avatarUrl = String(user?.avatarUrl ?? '').trim()
  const iconSize = SIZE_TO_ICON[size] ?? SIZE_TO_ICON.sm
  const hasImage = Boolean(avatarUrl) && failedUrl !== avatarUrl

  return (
    <span className={`user-avatar user-avatar-${size}`}>
      {hasImage ? (
        <img
          alt={`${user?.name ?? 'User'} avatar`}
          loading="lazy"
          onError={() => setFailedUrl(avatarUrl)}
          src={avatarUrl}
        />
      ) : (
        <UserCircle2 size={iconSize} />
      )}
    </span>
  )
}

export default UserAvatar
