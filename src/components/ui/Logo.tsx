import Image from "next/image";

export function Logo({
  priority = false,
  className = "",
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/brand/kubetee-logo.svg"
      alt="KubeTEE"
      width={200}
      height={43}
      unoptimized
      priority={priority}
      className={className}
    />
  );
}
