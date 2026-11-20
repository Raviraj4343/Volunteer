import { LogoMark } from "./Logo";

export function FullScreenLoader() {
  return (
    <div className="flex min-h-dvh items-center justify-center" role="status" aria-label="Loading">
      <LogoMark className="size-10 animate-pulse" />
    </div>
  );
}
