import { useRef, useEffect, useState } from "react";

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio, ratio };
}

const getDistance = (touchA, touchB) => {
  return Math.hypot(touchA.pageX - touchB.pageX, touchA.pageY - touchB.pageY);
};

function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

import Matrix from "./matrix";
import MultiTouchVelocity from "./velocity";

const isTouch = isTouchDevice();

function useZoom({ transitionClassName }) {
  const xY = useRef({
    initX: 0,
    initY: 0,
    newX: 0,
    newY: 0,
  });
  const ratio = useRef();
  const img = useRef();
  const matrix = useRef(new Matrix());

  const _velocity = useRef(new MultiTouchVelocity());

  const lastTap = useRef({
    time: 0,
    x: 0,
  });

  const scale = useRef({
    scaling: false,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,

    lastHypo: 0,

    originX: 0,
    originY: 0,
    value: 1,
    max: 1,
  });

  const [fit, setFit] = useState(false);

  const onWheel = e => {
    e.preventDefault();
    const dir = e.deltaY < 0 ? 1 : -1;

    const xFactor = 1 + 0.1 * dir;
    const yFactor = (xFactor * window.innerHeight) / window.innerWidth;

    let in_x = (window.innerWidth - ratio.current.width * matrix.current.vtm.a) / 2;
    let in_y = (window.innerHeight - ratio.current.height * matrix.current.vtm.a) / 2;

    const origin = {
      x: in_x > 0 ? window.innerWidth / 2 : e.pageX,
      y: in_y > 0 ? window.innerHeight / 2 : e.pageY,
    };

    const mat = matrix.current.scale(
      xFactor,
      yFactor,
      origin,
      in_x,
      in_y,
      ratio.current,
      scale.current.max,
      scale.current.value * xFactor,
      dir,
    );
    img.current.style.transform = `translate(${mat.e}px,${mat.f}px) scale(${mat.d})`;
    scale.current.value = mat.d;
  };

  const onResize = () => {
    onLoad();
    fireDown(0, 0);
    fireMove(0, 0);
    fireUp();
  };

  useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
  }, []);

  const onMouseDown = ({ clientX, clientY }) => {
    fireDown(clientX, clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = ({ clientX, clientY }) => {
    fireMove(clientX, clientY);
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    fireUp();
  };

  const fireDown = (x, y) => {
    xY.current.initX = x;
    xY.current.initY = y;

    matrix.current.x = matrix.current.vtm.e;
    matrix.current.y = matrix.current.vtm.f;
  };

  const fireMove = (x, y) => {
    if (scale.current.scaling) return;
    let in_x = (window.innerWidth - ratio.current.width * matrix.current.vtm.a) / 2;
    let in_y = (window.innerHeight - ratio.current.height * matrix.current.vtm.a) / 2;

    xY.current.newX = xY.current.initX - x;
    xY.current.newY = xY.current.initY - y;
    const mat = matrix.current.move(in_x >= 0 ? 0 : xY.current.newX, in_y >= 0 ? 0 : xY.current.newY, in_x, in_y, ratio.current);

    img.current.style.transform = `matrix(${mat.a},${mat.b},${mat.c},${mat.d},${mat.e}, ${mat.f})`;
  };

  const fireUp = () => {
    matrix.current.x -= xY.current.newX;
    matrix.current.y -= xY.current.newY;

    scale.current.scaling = false;
    scale.current.lastHypo = 0;
  };

  const fireScale = (touchA, touchB) => {
    const xTouch = [Math.min(touchA.pageX, touchB.pageX), Math.max(touchA.pageX, touchB.pageX)];

    const yTouch = [Math.min(touchA.pageY, touchB.pageY), Math.max(touchA.pageY, touchB.pageY)];

    const W = xTouch[1] - xTouch[0];
    const centerX = W / 2 + xTouch[0];

    const H = yTouch[1] - yTouch[0];
    const centerY = H / 2 + yTouch[0];

    scale.current.originX = centerX;
    scale.current.originY = centerY;
    scale.current.lastHypo = Math.trunc(getDistance(touchA, touchB));
  };

  const fireTapScale = (x, y) => {
    let scaleVtm = matrix.current.vtm.a;
    let scale_value = scaleVtm > 1 ? scaleVtm - 1 : scale.current.max / 2.5;
    let scale_factor = scaleVtm > 1 ? -1 : 1;

    const xFactor = 1 + scale_value * scale_factor;
    const yFactor = (xFactor * window.innerHeight) / window.innerWidth;

    let in_x = (window.innerWidth - ratio.current.width * Math.max(xFactor * scaleVtm, 1)) / 2; // maybe vtm.a * xFactor
    let in_y = (window.innerHeight - ratio.current.height * Math.max(xFactor * scaleVtm, 1)) / 2; // maybe vtm.a * yFactor

    const origin = {
      x: in_x > 0 ? window.innerWidth / 2 : x,
      y: in_y > 0 ? window.innerHeight / 2 : y,
    };

    const mat = matrix.current.scale(
      xFactor,
      yFactor,
      origin,
      in_x,
      in_y,
      ratio.current,
      scale.current.max,
      scale.current.value * xFactor,
      scale_factor,
    );

    scale.current.value = mat.d;
    img.current.style.transform = `translate(${mat.e}px, ${mat.f}px) scale(${mat.d})`;
  };

  const onTouchStart = e => {
    const isMultiTouch = e.touches.length === 2;
    const [touchA, touchB] = e.touches;

    scale.current.scaling = isMultiTouch;

    img.current.classList.remove(transitionClassName);
    if (isMultiTouch) {
      fireScale(touchA, touchB);

      _velocity.current.down(touchA, touchB);
    } else {
      // === start ===
      var now = new Date().getTime();
      if (now - lastTap.current.time < 250 && Math.abs(lastTap.current.x - touchA.pageX) <= 20) {
        img.current.classList.add(transitionClassName);
        fireTapScale(touchA.pageX, touchA.pageY);
      }

      lastTap.current.time = new Date().getTime();
      lastTap.current.x = touchA.pageX;

      fireDown(touchA.pageX, touchA.pageY);
    }

    // Clean up
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    //--
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const fireScaleMove = (touchA, touchB, e) => {
    const hypo = getDistance(touchA, touchB);

    let f = hypo / scale.current.lastHypo;

    f = f >= 1 ? 1 : -1;

    const ff = _velocity.current.getVelocity(touchA, touchB);

    const xFactor = 1 + 0.1 * ff * f;

    const yFactor = (xFactor * window.innerHeight) / window.innerWidth;

    let in_x = (window.innerWidth - ratio.current.width * matrix.current.vtm.a) / 2; // maybe * xFactor
    let in_y = (window.innerHeight - ratio.current.height * matrix.current.vtm.a) / 2; // maybe * yFactor

    const origin = {
      x: in_x > 0 ? window.innerWidth / 2 : scale.current.originX,
      y: in_y > 0 ? window.innerHeight / 2 : scale.current.originY,
    };

    const mat = matrix.current.scale(
      xFactor,
      yFactor,
      origin,
      in_x,
      in_y,
      ratio.current,
      scale.current.max,
      scale.current.value * xFactor,
      f,
    );

    img.current.style.transform = `translate(${mat.e}px, ${mat.f}px) scale(${mat.d})`;

    // max value
    scale.current.value = mat.d;

    scale.current.lastHypo = hypo;
    scale.current.scaling = true;
  };
  const onTouchMove = e => {
    if (scale.current.scaling) {
      const [touchA, touchB] = e.touches;
      fireScaleMove(touchA, touchB);
    } else {
      fireMove(e.touches[0].pageX, e.touches[0].pageY);
    }
  };

  const onTouchEnd = e => {
    fireUp();
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
  };

  const onLoad = () => {
    const { naturalWidth, naturalHeight } = img.current;

    if (naturalWidth > window.innerWidth || naturalHeight > window.innerHeight) {
      setFit(true);
    }

    scale.current.max = Math.max(naturalWidth / window.innerWidth, 1);
    ratio.current = calculateAspectRatioFit(
      img.current.naturalWidth,
      img.current.naturalHeight,
      window.innerWidth,
      window.innerHeight,
    );
  };

  const fireManualZoom = dir => {
    const xFactor = 1 + 0.1 * dir;
    const yFactor = (xFactor * window.innerHeight) / window.innerWidth;

    let in_x = (window.innerWidth - ratio.current.width * matrix.current.vtm.a) / 2;
    let in_y = (window.innerHeight - ratio.current.height * matrix.current.vtm.a) / 2;

    const origin = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const mat = matrix.current.scale(
      xFactor,
      yFactor,
      origin,
      in_x,
      in_y,
      ratio.current,
      scale.current.max,
      scale.current.value * xFactor,
      dir,
    );
    img.current.style.transform = `translate(${mat.e}px,${mat.f}px) scale(${mat.d})`;
    scale.current.value = mat.d;
  };

  const zoomIn = () => fireManualZoom(1);

  const zoomOut = () => fireManualZoom(-1);

  return {
    events: {
      onLoad,
      ...(isTouch ? { onTouchStart } : { onMouseDown }),
    },
    fit: fit ? "contain" : "none",
    imgRef: img,
    zoomIn,
    zoomOut,
  };
}

export default useZoom;
