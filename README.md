### react-use-zoom

Nearly native image scaling (:iphone:/:computer:), rich in functionality. It is extremely easy to use. It's built on the comparison, like smartphone galleries. It doesn't seem slow, but it doesn't seem fast either. to be honest, I didn't measure performance. This will also boost your mobile app and website user experience.

<p>
  <a href="https://www.npmjs.com/package/react-use-zoom"><img  src="https://img.shields.io/npm/v/react-use-zoom?style=for-the-badge"/></a>

<a href="https://bundlephobia.com/result?p=react-use-zoom@latest">
  <img src="https://img.shields.io/bundlephobia/min/react-use-zoom?style=for-the-badge"/>
</a>
  
<a href="https://bundlephobia.com/result?p=react-use-zoom@latest">
  <img src="https://img.shields.io/bundlephobia/minzip/react-use-zoom?style=for-the-badge"/>
</a>

</p>

###### Note

> The image must be full width and full height

### Features

---

#### Mobile

- Pinch
- Pan
- Touch move

#### Desktop

- Mouse wheel
- Mouse move

#### General

- Maximum scaling value calculated automatically
- The image is limited by its border
- It is lightweight
- It feels "native"

### Installation

###### via NPM

```
npm i react-use-zoom
```

###### via CDN (unpkg)

```
https://unpkg.com/react-use-zoom@latest/build/index.umd.js
```

`UMD` library exposed as `reactUseZoom`

### Usage

```jsx
import { useZoom } from "react-use-zoom";

const MyComponent = () => {
  const { ref, fit, events } = useZoom();
  return <img src={"..."} ref={ref} style={{ objectFit: fit }} {...events} />;
};
```

### Manual zooming

If for some reason you want to zoom in by calling the function manually. You can use the `zoomIn` and `zoomOut` functions. It will scale in the center of the image.

```markdown
import { useZoom } from "react-use-zoom";

const MyComponent = () => {
  const { ref, fit, events, `zoomIn`, `zoomOut` } = useZoom();
  const handleInZoom = () => `zoomIn()`;
  const handleOutZoom = () => `zoomOut()`;
};
```

#### API `useZoom`

| Prop    | Type                                          | Description                                                                                      |
| ------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| events  | `React.TouchEvent`,`React.MouseEvent`,`Event` | events must be assigned to an element to work with it. `onLoad`, `onMouseDown` or `onTouchStart` |
| zoomIn  | `Function`                                    | Call the zoom in manually. The transformation point will be at the center                        |
| zoomOut | `Function`                                    | Call the zoom out manually. The transformation point will be at the center                       |
| fit   | `React.CSSProperties`                         |Decides when the image should be `object-fit: contain;' or 'object-fit: none;'
| ref     | `React.RefObject`                             | Access an image by providing a reference                                                         |