import { getInitials } from '@/utils/helpers';
import Image from 'next/image';

interface AvatarProps {
  className?: string;
  url?: string;
  name: string;
}

const Avatar = ({ url, name, className = '' }: AvatarProps) => {
  return (
    <div className="avatar placeholder">
      <div
        className={`bg-gray-100 text-black-content rounded-full w-12 h-12 ${className}`}
      >
        {url ? (
          <Image src={url} alt={name} />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
