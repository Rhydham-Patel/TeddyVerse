import Image from "next/image";

interface BadgeProps {
  size?: number; // Allow custom size
  className?: string; // Allow additional styling
}

export default function Badge({ size = 24, className = "" }: BadgeProps) {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <Image src="/admin.png" alt="Admin Badge" width={size} height={size} className="object-contain" />
    </div>
  );
}
