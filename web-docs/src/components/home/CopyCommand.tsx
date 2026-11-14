import {useState, type ReactNode} from 'react';
import {Check, Copy} from 'lucide-react';
import {cn} from '@/lib/utils';

export default function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}): ReactNode {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied; the command stays selectable.
    }
  }

  return (
    <div
      className={cn(
        'flex min-w-0 items-center rounded-[4px] border border-rule bg-panel',
        className,
      )}>
      <code className="min-w-0 truncate px-3 py-2 font-mono text-[13px] text-ink select-all">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy command'}
        className="flex h-9 w-9 shrink-0 items-center justify-center border-l border-rule text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink">
        {copied ? (
          <Check className="size-4 text-fresh" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </div>
  );
}
