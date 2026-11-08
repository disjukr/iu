import { createEffect, createSignal, omit, onCleanup } from 'solid-js';
import type { JSX } from '@solidjs/web';
import contentCopy from '@iconify-icons/material-symbols/content-copy';
import check from '@iconify-icons/material-symbols/check';
import { Button } from './Button.js';
import type { ButtonProps } from './Button.js';
import { Tooltip } from './Tooltip.js';
import type { TooltipProps } from './Tooltip.js';
import { Icon } from './Icon.js';
import * as styles from './copyButton.css.js';

export type CopyButtonState = 'idle' | 'copying' | 'copied' | 'error';
export type CopyButtonMessages = Record<Exclude<CopyButtonState, 'idle'>, string>;
export type CopyButtonProps = Omit<ButtonProps, 'onCopy' | 'children'> & {
  /** Resolve the source only when activated, optionally asynchronously. */
  text: string | (() => string | Promise<string>);
  children?: JSX.Element | ((state: CopyButtonState) => JSX.Element);
  /** Milliseconds until feedback resets. Zero keeps feedback until the next action. */
  resetAfter?: number;
  /** Idle tooltip text; false disables the tooltip. */
  tooltip?: string | false;
  tooltipPlacement?: TooltipProps['placement'];
  /** Live announcements, independent of the visible button content. */
  messages?: Partial<CopyButtonMessages>;
  onCopy?: (text: string) => void;
  onCopyError?: (error: unknown) => void;
};
const defaults: CopyButtonMessages = { copying: 'Copying', copied: 'Copied', error: 'Copy failed' };

export function CopyButton(props: CopyButtonProps) {
  const rest = omit(props, 'text', 'resetAfter', 'tooltip', 'tooltipPlacement', 'messages', 'onCopy', 'onCopyError', 'onClick', 'children', 'aria-label', 'aria-busy', 'aria-disabled', 'aria-describedby', 'ref', 'onFocus', 'onBlur', 'onPointerEnter', 'onPointerLeave', 'onKeyDown');
  const [status, setStatus] = createSignal<CopyButtonState>('idle');
  let inFlight = false;
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let revision = 0;
  function clearTimer() { clearTimeout(timer); timer = undefined; }
  function feedback(next: 'copied' | 'error') {
    setStatus(next);
    if ((props.resetAfter ?? 2000) > 0) timer = setTimeout(() => setStatus('idle'), props.resetAfter ?? 2000);
  }
  createEffect(() => props.text, () => { revision++; clearTimer(); if (!inFlight) setStatus('idle'); });
  onCleanup(() => { disposed = true; clearTimer(); });
  const copy: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async event => {
    if (inFlight || props.disabled || props['aria-disabled'] === 'true') { event.preventDefault(); return; }
    const onClick = props.onClick;
    if (typeof onClick === 'function') onClick(event);
    else onClick?.[0](onClick[1], event);
    if (event.defaultPrevented) return;
    clearTimer();
    let text: string;
    const requestRevision = revision;
    inFlight = true;
    setStatus('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard writing requires a secure context and browser support.');
      const source = props.text;
      const result = typeof source === 'function' ? source() : source;
      text = typeof result === 'string' ? result : await result;
      if (disposed) return;
      if (typeof text !== 'string') throw new TypeError('CopyButton text must resolve to a string.');
      await navigator.clipboard.writeText(text);
    } catch (error) {
      if (!disposed) {
        if (requestRevision === revision) feedback('error');
        else setStatus('idle');
        props.onCopyError?.(error);
      }
      return;
    } finally {
      inFlight = false;
    }
    if (disposed) return;
    if (requestRevision === revision) feedback('copied');
    else setStatus('idle');
    props.onCopy?.(text);
  };
  const announcement = () => { const current = status(); return current === 'idle' ? '' : props.messages?.[current] ?? defaults[current]; };
  const idleTooltip = () => {
    const text = props.tooltip;
    const name = props['aria-label'];
    const children = props.children;
    return typeof text === 'string' ? text : typeof name === 'string' ? name : typeof children === 'string' ? children : 'Copy';
  };
  const tooltipText = () => status() === 'idle' ? idleTooltip() : announcement();
  function callHandler<E extends Event>(handler: JSX.EventHandlerUnion<HTMLButtonElement, E> | undefined, event: E & { currentTarget: HTMLButtonElement; target: Element }) {
    if (typeof handler === 'function') handler(event);
    else handler?.[0](handler[1], event);
  }
  return <><Tooltip content={tooltipText()} color={props.color} placement={props.tooltipPlacement} disabled={props.disabled || props.tooltip === false}
    describedBy={typeof props['aria-describedby'] === 'string' ? props['aria-describedby'] : undefined}>
    {trigger => <Button
      {...rest} onClick={copy}
      ref={element => { trigger.ref(element); if (typeof props.ref === 'function') props.ref(element); }}
      aria-describedby={trigger['aria-describedby']}
      onFocus={event => { trigger.onFocus(); callHandler(props.onFocus, event); }}
      onBlur={event => { trigger.onBlur(); callHandler(props.onBlur, event); }}
      onPointerEnter={event => { trigger.onPointerEnter(event); callHandler(props.onPointerEnter, event); }}
      onPointerLeave={event => { trigger.onPointerLeave(); callHandler(props.onPointerLeave, event); }}
      onKeyDown={event => { trigger.onKeyDown(event); callHandler(props.onKeyDown, event); }}
      aria-label={props['aria-label'] ?? (props.children == null ? 'Copy' : undefined)}
      aria-busy={status() === 'copying' ? 'true' : props['aria-busy']}
      aria-disabled={status() === 'copying' ? 'true' : props['aria-disabled']}
    ><Icon icon={status() === 'copied' ? check : contentCopy} />{typeof props.children === 'function' ? props.children(status()) : props.children}</Button>}
  </Tooltip>
    <span class={styles.status} role="status" aria-atomic="true">{announcement()}</span>
  </>;
}
