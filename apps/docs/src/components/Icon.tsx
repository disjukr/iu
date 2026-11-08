type IconData = { body: string; width?: number; height?: number };

/** Render trusted icon data imported from an icon package. */
export function Icon(props: { icon: IconData }) {
  return <svg xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${props.icon.width ?? 24} ${props.icon.height ?? 24}`}
    width="1em" height="1em" aria-hidden="true" innerHTML={props.icon.body} />;
}
