import { createEffect, createSignal, createUniqueId, onCleanup } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import * as styles from './tooltip.css.js';

export type TooltipTriggerProps = {
  ref: (element: HTMLElement) => void;
  'aria-describedby': string | undefined;
  onPointerEnter: (event: PointerEvent) => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
};
export type TooltipProps = {
  content: string;
  color?: string;
  children: (trigger: TooltipTriggerProps) => JSX.Element;
  placement?: Placement;
  delay?: number;
  closeDelay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Existing description IDs to retain alongside the tooltip. */
  describedBy?: string;
  id?: string;
  class?: JSX.ClassValue;
  style?: JSX.IntrinsicElements['div']['style'];
};

const tintProperty = styles.tint.slice(4, -1);
function tooltipStyle(color: TooltipProps['color'], style: TooltipProps['style']) {
  if (!color) return style;
  if (typeof style === 'string') return `${style};${tintProperty}:${color}`;
  return { ...(typeof style === 'object' ? style : {}), [tintProperty]: color };
}

/** Non-interactive description, rendered in the browser's popover top layer. */
export function Tooltip(props: TooltipProps) {
  const generatedId = `iu-tooltip-${createUniqueId()}`;
  const id = () => props.id ?? generatedId;
  const [localOpen, setLocalOpen] = createSignal(props.defaultOpen ?? false);
  const [anchor, setAnchor] = createSignal<HTMLElement>();
  const [surface, setSurface] = createSignal<HTMLDivElement>();
  const [arrowElement, setArrowElement] = createSignal<HTMLSpanElement>();
  const isOpen = () => !props.disabled && !!props.content && (props.open ?? localOpen());
  let hovered = false;
  let focused = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  function clearTimer() { clearTimeout(timer); timer = undefined; }
  function change(next: boolean) {
    clearTimer();
    if (next && (props.disabled || !props.content)) return;
    if ((props.open ?? localOpen()) === next) return;
    if (props.open === undefined) setLocalOpen(next);
    props.onOpenChange?.(next);
  }
  function closeLater() {
    clearTimer();
    if (!hovered && !focused) timer = setTimeout(() => change(false), props.closeDelay ?? 100);
  }
  function escape(event: KeyboardEvent) {
    if (event.key === 'Escape' && (isOpen() || timer !== undefined)) {
      event.stopPropagation();
      change(false);
    }
  }
  onCleanup(clearTimer);
  createEffect(() => ({ open: isOpen(), anchor: anchor(), surface: surface(), arrow: arrowElement(), placement: props.placement ?? 'top', disabled: props.disabled }), state => {
    clearTimer();
    if (state.disabled) { hovered = false; focused = false; change(false); }
    const element = state.surface;
    if (!element || !state.anchor || !state.arrow || !state.open) return;
    // Native popovers retain inherited theme/fonts and escape clipping ancestors.
    element.style.visibility = 'hidden';
    element.showPopover();
    let active = true;
    let revision = 0;
    const update = async () => {
      const current = ++revision;
      const position = await computePosition(state.anchor!, element, {
        strategy: 'fixed', placement: state.placement,
        middleware: [offset(6 + state.arrow!.offsetWidth / Math.SQRT2), flip({ padding: 8 }), shift({ padding: 8 }), arrow({ element: state.arrow!, padding: 8 })],
      });
      if (!active || current !== revision) return;
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
      element.dataset.placement = position.placement;
      const arrowData = position.middlewareData.arrow;
      const tail = state.arrow!;
      tail.dataset.side = position.placement.split('-')[0];
      tail.style.left = arrowData?.x != null ? `${arrowData.x}px` : '';
      tail.style.top = arrowData?.y != null ? `${arrowData.y}px` : '';
      tail.style.visibility = arrowData?.centerOffset ? 'hidden' : 'inherit';
      element.style.visibility = 'visible';
    };
    const cleanup = autoUpdate(state.anchor, element, update);
    element.ownerDocument.addEventListener('keydown', escape);
    return () => {
      active = false;
      cleanup();
      element.ownerDocument.removeEventListener('keydown', escape);
      if (element.matches(':popover-open')) element.hidePopover();
    };
  });
  const trigger: TooltipTriggerProps = {
    ref: setAnchor,
    get 'aria-describedby'() { return [props.describedBy, !props.disabled && props.content ? id() : undefined].filter(Boolean).join(' ') || undefined; },
    onPointerEnter(event) {
      if (event.pointerType === 'touch' || props.disabled) return;
      hovered = true;
      clearTimer();
      if (!isOpen()) timer = setTimeout(() => change(true), props.delay ?? 500);
    },
    onPointerLeave() { hovered = false; closeLater(); },
    onFocus() { focused = true; change(true); },
    onBlur() { focused = false; closeLater(); },
    onKeyDown: escape,
  };
  return <>{props.children(trigger)}<div
    ref={setSurface} id={id()} role="tooltip" popover="manual"
    class={[styles.tooltip, props.color && styles.customColor, props.class]} style={tooltipStyle(props.color, props.style)}
    onPointerEnter={() => { hovered = true; clearTimer(); }}
    onPointerLeave={() => { hovered = false; closeLater(); }}
  >{props.content}<span ref={setArrowElement} class={styles.arrow} aria-hidden="true" /></div></>;
}
