### react-use-zoom

Nearly native image scaling (:iphone:/:computer:), rich in functionality. It is extremely easy to use. it's built by comparing scaling features existing in 'Gallery' apps for smartphones. It doesn't seem slow, but it doesn't seem ridiculously fast either, to be honest, I didn't measure performance. This will also boost your mobile app and website user experience.

[Preview](https://jsgry.csb.app/)

<p align="center">
<img width="257" src="https://res.cloudinary.com/dxv8p5zck/image/upload/v1599324008/zoom-software.gif"/>
</p>

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

> The image must take up the entire width and height of the page

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

It is also very important that your image contains the following css properties.

```css
.img {
  width: 100%;
  height: 100%;
  will-change: transform;
  backface-visibility: hidden;
  touch-action: none;
  transform-origin: 0 0;
  position: absolute;
  -webkit-user-drag: none;
  user-drag: none;
}

.basic-transition {
  transition: all 0.2s;
}
```

```jsx
import { useZoom } from "react-use-zoom";

const MyComponent = () => {
  const { imgRef, fit, events } = useZoom({
    transitionClassName: "basic-transition",
  });
  return (
    <img
      className="img"
      src={"..."}
      ref={imgRef}
      style={{ objectFit: fit }}
      {...events}
    />
  );
};
```

### Manual zooming

If for some reason you want to zoom in by calling the function manually. You can use the `zoomIn` and `zoomOut` functions. It will scale in the center of the image.

```markdown
import { useZoom } from "react-use-zoom";

const MyComponent = () => {
const { imgRef, fit, events, `zoomIn`, `zoomOut` } = useZoom();
const handleInZoom = () => `zoomIn()`;
const handleOutZoom = () => `zoomOut()`;
};
```

#### API `useZoom`

| Prop                | Type                                          | Description                                                                                      |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| events              | `React.TouchEvent`,`React.MouseEvent`,`Event` | Events must be assigned to an element to work with it. `onLoad`, `onMouseDown` or `onTouchStart` |
| zoomIn              | `Function`                                    | Call the zoom in manually. The transformation point will be at the center                        |
| zoomOut             | `Function`                                    | Call the zoom out manually. The transformation point will be at the center                       |
| fit                 | `React.CSSProperties`                         | Decides when the image should be `object-fit: contain;' or 'object-fit: none;'                   |
| imgRef                 | `React.RefObject`                             | Access an image by providing a reference                                                         |
| transitionClassName | `String`                                      | Class name to provide a smooth transition when scaling                                           |
