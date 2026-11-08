type IconData = { body: string; width?: number; height?: number; left?: number; top?: number };

/** Internal adapter for trusted icon data imported from icon packages. */
export function Icon(props: { icon: IconData }) {
  return <svg xmlns="http://www.w3.org/2000/svg"
    viewBox={`${props.icon.left ?? 0} ${props.icon.top ?? 0} ${props.icon.width ?? 24} ${props.icon.height ?? 24}`}
    width="1em" height="1em" aria-hidden="true" style={{ display: 'block', 'flex-shrink': 0 }} innerHTML={props.icon.body} />;
}
