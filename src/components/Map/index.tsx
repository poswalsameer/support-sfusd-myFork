import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import MapBase from "./MapBase";
import ZoomControls from "./ZoomControls";

const MapComponent = () => {
  const [hoveredSchool, setHoveredSchool] = useState<string | null>(null);
  const [viewBoxDimensions, setViewBoxDimensions] = useState({
    x: 0,
    y: 0,
    width: 390,
    height: 844,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const viewBoxRef = useRef(viewBoxDimensions);

  React.useEffect(() => {
    viewBoxRef.current = viewBoxDimensions;
  }, [viewBoxDimensions]);

  const handleZoomIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bbox = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - bbox.left;
    const mouseY = e.clientY - bbox.top;

    const svgX =
      (mouseX / bbox.width) * viewBoxDimensions.width + viewBoxDimensions.x;
    const svgY =
      (mouseY / bbox.height) * viewBoxDimensions.height + viewBoxDimensions.y;

    const newWidth = viewBoxDimensions.width / 1.1;
    const newHeight = viewBoxDimensions.height / 1.1;

    const newX = svgX - (mouseX / bbox.width) * newWidth;
    const newY = svgY - (mouseY / bbox.height) * newHeight;

    setViewBoxDimensions({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleZoomOut = () => {
    setViewBoxDimensions((prevDimensions) => {
      const newWidth = Math.min(prevDimensions.width * 1.1, 390);
      const newHeight = Math.min(prevDimensions.height * 1.1, 844);

      const dWidth = newWidth - prevDimensions.width;
      const dHeight = newHeight - prevDimensions.height;

      let newX = prevDimensions.x - dWidth / 2;
      let newY = prevDimensions.y - dHeight / 2;

      newX = Math.min(Math.max(newX, 0), 390 - newWidth);
      newY = Math.min(Math.max(newY, 0), 844 - newHeight);

      return {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  const handleMouseDown = (e: ReactMouseEvent<SVGSVGElement>) => {
    console.log("Mouse Move Event Triggered");

    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;

    const dx = (e.clientX - startX) / (viewBoxDimensions.width / 390);
    const dy = (e.clientY - startY) / (viewBoxDimensions.height / 844);

    setStartX(e.clientX);
    setStartY(e.clientY);

    setViewBoxDimensions((prev) => {
      const newX = Math.min(Math.max(prev.x - dx, 0), 390 - prev.width);
      const newY = Math.min(Math.max(prev.y - dy, 0), 844 - prev.height);

      return {
        x: newX,
        y: newY,
        width: prev.width,
        height: prev.height,
      };
    });
  };

  const handleMouseUp = (e: ReactMouseEvent<SVGSVGElement>) => {
    console.log("Mouse Up Event Triggered - handleMouseUp");

    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    console.log("Touch Start Event Triggered");

    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const dx = (touch.clientX - startX) / (viewBoxDimensions.width / 390);
    const dy = (touch.clientY - startY) / (viewBoxDimensions.height / 844);

    setStartX(touch.clientX);
    setStartY(touch.clientY);

    setViewBoxDimensions((prev) => {
      const newX = Math.min(Math.max(prev.x - dx, 0), 390 - prev.width);
      const newY = Math.min(Math.max(prev.y - dy, 0), 844 - prev.height);

      return {
        x: newX,
        y: newY,
        width: prev.width,
        height: prev.height,
      };
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>) => {
    console.log("Touch End Event Triggered - handleTouchEnd");

    setIsDragging(false);
  };

  const disableZoomOut =
    viewBoxDimensions.width >= 390 && viewBoxDimensions.height >= 844;

  return (
    <div className="block md:hidden">
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        disableZoomOut={disableZoomOut}
      />
      <svg
        ref={svgRef}
        className="w-auto h-full"
        viewBox={`${viewBoxDimensions.x} ${viewBoxDimensions.y} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <g clip-path="url(#clip0_2046_3404)">
          <MapBase />
          <path
            d="M82.6379 471.887C79.7879 469.337 76.0379 467.987 72.1379 468.437C66.1379 468.887 61.1879 473.237 60.1379 478.787C59.3879 482.387 60.1379 485.987 62.3879 488.987L70.0379 499.637C70.6379 500.687 71.9879 501.287 73.3379 501.287C74.6879 501.287 76.0379 500.687 76.7879 499.487L84.4379 488.837C86.0879 486.587 86.8379 484.037 86.8379 481.337C86.8379 477.737 85.3379 474.287 82.6379 471.887Z"
            fill="#3A86FF"
          />
          <path
            d="M73.3379 486.437C76.1545 486.437 78.4379 484.154 78.4379 481.337C78.4379 478.521 76.1545 476.237 73.3379 476.237C70.5212 476.237 68.2379 478.521 68.2379 481.337C68.2379 484.154 70.5212 486.437 73.3379 486.437Z"
            fill="white"
          />
          <path
            d="M164.734 501.843C161.884 499.293 158.134 497.943 154.234 498.393C148.234 498.843 143.284 503.193 142.234 508.743C141.484 512.343 142.234 515.943 144.484 518.943L152.134 529.593C152.734 530.643 154.084 531.243 155.434 531.243C156.784 531.243 158.134 530.643 158.884 529.443L166.534 518.793C168.184 516.543 168.934 513.993 168.934 511.293C168.934 507.693 167.434 504.243 164.734 501.843Z"
            fill="#3A86FF"
          />
          <path
            d="M155.434 516.393C158.25 516.393 160.534 514.11 160.534 511.293C160.534 508.477 158.25 506.193 155.434 506.193C152.617 506.193 150.334 508.477 150.334 511.293C150.334 514.11 152.617 516.393 155.434 516.393Z"
            fill="white"
          />
          <path
            d="M134.29 479.887C131.44 477.337 127.69 475.987 123.79 476.437C117.79 476.887 112.84 481.237 111.79 486.787C111.04 490.387 111.79 493.987 114.04 496.987L121.69 507.637C122.29 508.687 123.64 509.287 124.99 509.287C126.34 509.287 127.69 508.687 128.44 507.487L136.09 496.837C137.74 494.587 138.49 492.037 138.49 489.337C138.49 485.737 136.99 482.287 134.29 479.887Z"
            fill="#3A86FF"
          />
          <path
            d="M124.99 494.437C127.807 494.437 130.09 492.154 130.09 489.337C130.09 486.521 127.807 484.237 124.99 484.237C122.174 484.237 119.89 486.521 119.89 489.337C119.89 492.154 122.174 494.437 124.99 494.437Z"
            fill="white"
          />
          <path
            d="M67.3 365.247C64.45 362.697 60.7 361.347 56.8 361.797C50.8 362.247 45.85 366.597 44.8 372.147C44.05 375.746 44.8 379.346 47.05 382.346L54.7 392.996C55.3 394.046 56.65 394.646 58 394.646C59.35 394.646 60.7 394.046 61.45 392.846L69.1 382.196C70.75 379.946 71.5 377.396 71.5 374.697C71.5 371.097 70 367.647 67.3 365.247Z"
            fill="#FF7700"
          />
          <path
            d="M58.0001 379.797C60.8166 379.797 63.1001 377.513 63.1001 374.697C63.1001 371.88 60.8166 369.597 58.0001 369.597C55.1834 369.597 52.9 371.88 52.9 374.697C52.9 377.513 55.1834 379.797 58.0001 379.797Z"
            fill="white"
          />
          <path
            d="M119.784 412.208C116.934 409.658 113.184 408.308 109.284 408.758C103.284 409.208 98.3344 413.558 97.2844 419.108C96.5344 422.708 97.2844 426.308 99.5344 429.308L107.184 439.958C107.784 441.008 109.134 441.608 110.484 441.608C111.834 441.608 113.184 441.008 113.934 439.808L121.584 429.158C123.234 426.908 123.984 424.358 123.984 421.658C123.984 418.058 122.484 414.608 119.784 412.208Z"
            fill="#3A86FF"
          />
          <path
            d="M110.484 426.758C113.301 426.758 115.584 424.475 115.584 421.658C115.584 418.841 113.301 416.558 110.484 416.558C107.668 416.558 105.384 418.841 105.384 421.658C105.384 424.475 107.668 426.758 110.484 426.758Z"
            fill="white"
          />
          <path
            d="M166.402 573.752C163.552 571.202 159.802 569.852 155.902 570.302C149.902 570.752 144.952 575.102 143.902 580.652C143.152 584.252 143.902 587.852 146.152 590.852L153.802 601.502C154.402 602.552 155.752 603.152 157.102 603.152C158.452 603.152 159.802 602.552 160.552 601.352L168.202 590.702C169.852 588.452 170.602 585.902 170.602 583.202C170.602 579.602 169.102 576.152 166.402 573.752Z"
            fill="#FF7700"
          />
          <path
            d="M157.102 588.302C159.918 588.302 162.202 586.019 162.202 583.202C162.202 580.385 159.918 578.102 157.102 578.102C154.285 578.102 152.002 580.385 152.002 583.202C152.002 586.019 154.285 588.302 157.102 588.302Z"
            fill="white"
          />
          <path
            d="M82.4934 531.768C79.6434 529.218 75.8934 527.868 71.9934 528.318C65.9934 528.768 61.0434 533.118 59.9934 538.668C59.2434 542.268 59.9934 545.868 62.2434 548.868L69.8934 559.518C70.4934 560.568 71.8434 561.168 73.1934 561.168C74.5434 561.168 75.8934 560.568 76.6434 559.368L84.2934 548.718C85.9434 546.468 86.6934 543.918 86.6934 541.218C86.6934 537.618 85.1934 534.168 82.4934 531.768Z"
            fill="#3A86FF"
          />
          <path
            d="M73.1934 546.319C76.01 546.319 78.2934 544.035 78.2934 541.219C78.2934 538.402 76.01 536.119 73.1934 536.119C70.3767 536.119 68.0934 538.402 68.0934 541.219C68.0934 544.035 70.3767 546.319 73.1934 546.319Z"
            fill="white"
          />
          <path
            d="M213.909 600.398C211.059 597.848 207.309 596.498 203.409 596.948C197.409 597.398 192.459 601.748 191.409 607.298C190.659 610.898 191.409 614.498 193.659 617.498L201.309 628.148C201.909 629.198 203.259 629.798 204.609 629.798C205.959 629.798 207.309 629.198 208.059 627.998L215.709 617.348C217.359 615.098 218.109 612.548 218.109 609.848C218.109 606.248 216.609 602.798 213.909 600.398Z"
            fill="#EA4335"
          />
          <path
            d="M204.609 614.949C207.426 614.949 209.709 612.665 209.709 609.849C209.709 607.032 207.426 604.749 204.609 604.749C201.793 604.749 199.509 607.032 199.509 609.849C199.509 612.665 201.793 614.949 204.609 614.949Z"
            fill="white"
          />
          <path
            d="M255.146 587.967C252.296 585.417 248.546 584.067 244.646 584.517C238.646 584.967 233.696 589.317 232.646 594.867C231.896 598.467 232.646 602.067 234.896 605.067L242.546 615.717C243.146 616.767 244.496 617.367 245.846 617.367C247.196 617.367 248.546 616.767 249.296 615.567L256.946 604.917C258.596 602.667 259.346 600.117 259.346 597.417C259.346 593.817 257.846 590.367 255.146 587.967Z"
            fill="#EA4335"
          />
          <path
            d="M245.846 602.517C248.662 602.517 250.946 600.234 250.946 597.417C250.946 594.601 248.662 592.317 245.846 592.317C243.029 592.317 240.746 594.601 240.746 597.417C240.746 600.234 243.029 602.517 245.846 602.517Z"
            fill="white"
          />
          <path
            d="M298.222 522.907C295.372 520.357 291.622 519.007 287.722 519.457C281.722 519.907 276.772 524.257 275.722 529.807C274.972 533.407 275.722 537.007 277.972 540.007L285.622 550.657C286.222 551.707 287.572 552.307 288.922 552.307C290.272 552.307 291.622 551.707 292.372 550.507L300.022 539.857C301.672 537.607 302.422 535.057 302.422 532.357C302.422 528.757 300.922 525.307 298.222 522.907Z"
            fill="#EA4335"
          />
          <path
            d="M288.922 537.457C291.739 537.457 294.022 535.174 294.022 532.357C294.022 529.54 291.739 527.257 288.922 527.257C286.105 527.257 283.822 529.54 283.822 532.357C283.822 535.174 286.105 537.457 288.922 537.457Z"
            fill="white"
          />
          <path
            d="M267.577 461.241C264.727 458.691 260.977 457.341 257.077 457.791C251.077 458.241 246.127 462.591 245.077 468.141C244.327 471.741 245.077 475.341 247.327 478.341L254.977 488.991C255.577 490.041 256.927 490.641 258.277 490.641C259.627 490.641 260.977 490.041 261.727 488.841L269.377 478.191C271.027 475.941 271.777 473.391 271.777 470.691C271.777 467.091 270.277 463.641 267.577 461.241Z"
            fill="#EA4335"
          />
          <path
            d="M258.277 475.791C261.094 475.791 263.377 473.508 263.377 470.691C263.377 467.875 261.094 465.591 258.277 465.591C255.461 465.591 253.177 467.875 253.177 470.691C253.177 473.508 255.461 475.791 258.277 475.791Z"
            fill="white"
          />
          <path
            d="M292.437 427.025C289.587 424.475 285.837 423.125 281.937 423.575C275.937 424.025 270.987 428.375 269.937 433.925C269.187 437.525 269.937 441.125 272.187 444.125L279.837 454.775C280.437 455.825 281.787 456.425 283.137 456.425C284.487 456.425 285.837 455.825 286.587 454.625L294.237 443.975C295.887 441.725 296.637 439.175 296.637 436.475C296.637 432.875 295.137 429.425 292.437 427.025Z"
            fill="#FF7700"
          />
          <path
            d="M283.137 441.576C285.953 441.576 288.237 439.292 288.237 436.475C288.237 433.659 285.953 431.375 283.137 431.375C280.32 431.375 278.037 433.659 278.037 436.475C278.037 439.292 280.32 441.576 283.137 441.576Z"
            fill="white"
          />
          <path
            d="M239.866 476.981C237.016 474.431 233.266 473.081 229.366 473.531C223.366 473.981 218.416 478.331 217.366 483.881C216.616 487.481 217.366 491.081 219.616 494.081L227.266 504.731C227.866 505.781 229.216 506.381 230.566 506.381C231.916 506.381 233.266 505.781 234.016 504.581L241.666 493.931C243.316 491.681 244.066 489.131 244.066 486.431C244.066 482.831 242.566 479.381 239.866 476.981Z"
            fill="#FF7700"
          />
          <path
            d="M230.566 491.532C233.383 491.532 235.666 489.248 235.666 486.432C235.666 483.615 233.383 481.332 230.566 481.332C227.75 481.332 225.466 483.615 225.466 486.432C225.466 489.248 227.75 491.532 230.566 491.532Z"
            fill="white"
          />
          <path
            d="M197.681 451.025C194.831 448.475 191.081 447.125 187.181 447.575C181.181 448.025 176.231 452.375 175.181 457.925C174.431 461.525 175.181 465.125 177.431 468.125L185.081 478.775C185.681 479.825 187.031 480.425 188.381 480.425C189.731 480.425 191.081 479.825 191.831 478.625L199.481 467.975C201.131 465.725 201.881 463.175 201.881 460.475C201.881 456.875 200.381 453.425 197.681 451.025Z"
            fill="#EA4335"
          />
          <path
            d="M188.381 465.576C191.197 465.576 193.481 463.292 193.481 460.475C193.481 457.659 191.197 455.375 188.381 455.375C185.564 455.375 183.281 457.659 183.281 460.475C183.281 463.292 185.564 465.576 188.381 465.576Z"
            fill="white"
          />
          <path
            d="M191.265 384.583C188.415 382.033 184.665 380.683 180.765 381.133C174.765 381.583 169.815 385.933 168.765 391.483C168.015 395.083 168.765 398.683 171.015 401.683L178.665 412.333C179.265 413.383 180.615 413.983 181.965 413.983C183.315 413.983 184.665 413.383 185.415 412.183L193.065 401.533C194.715 399.283 195.465 396.733 195.465 394.033C195.465 390.433 193.965 386.983 191.265 384.583Z"
            fill="#FF7700"
          />
          <path
            d="M181.965 399.134C184.781 399.134 187.065 396.85 187.065 394.034C187.065 391.217 184.781 388.934 181.965 388.934C179.148 388.934 176.865 391.217 176.865 394.034C176.865 396.85 179.148 399.134 181.965 399.134Z"
            fill="white"
          />
          <path
            d="M156.388 359.722C153.538 357.172 149.788 355.822 145.888 356.272C139.888 356.722 134.938 361.072 133.888 366.622C133.138 370.222 133.888 373.822 136.138 376.822L143.788 387.472C144.388 388.522 145.738 389.122 147.088 389.122C148.438 389.122 149.788 388.522 150.538 387.322L158.188 376.672C159.838 374.422 160.588 371.872 160.588 369.172C160.588 365.572 159.088 362.122 156.388 359.722Z"
            fill="#FF7700"
          />
          <path
            d="M147.088 374.272C149.904 374.272 152.188 371.988 152.188 369.172C152.188 366.355 149.904 364.072 147.088 364.072C144.271 364.072 141.988 366.355 141.988 369.172C141.988 371.988 144.271 374.272 147.088 374.272Z"
            fill="white"
          />
          <>
            <path
              d="M218.542 284.1C215.692 281.55 211.942 280.2 208.042 280.65C202.042 281.1 197.092 285.45 196.042 291C195.292 294.6 196.042 298.2 198.292 301.2L205.942 311.85C206.542 312.9 207.892 313.5 209.242 313.5C210.592 313.5 211.942 312.9 212.692 311.7L220.342 301.05C221.992 298.8 222.742 296.25 222.742 293.55C222.742 289.95 221.242 286.5 218.542 284.1Z"
              fill={hoveredSchool === "School1" ? "black" : "#FF7700"}
              onMouseEnter={() => setHoveredSchool("School1")}
              onMouseLeave={() => setHoveredSchool(null)}
            />
            <path
              d="M209.242 298.65C212.059 298.65 214.342 296.367 214.342 293.55C214.342 290.734 212.059 288.45 209.242 288.45C206.426 288.45 204.142 290.734 204.142 293.55C204.142 296.367 206.426 298.65 209.242 298.65Z"
              fill="white"
              onMouseEnter={() => setHoveredSchool("School1")}
              onMouseLeave={() => setHoveredSchool(null)}
            />
          </>
        </g>
        <defs>
          <clipPath id="clip0_2046_3404">
            <rect width="390" height="844" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {hoveredSchool === "School1" && (
        <div className="small-box absolute bottom-3 left-3 bg-white p-2 shadow-lg rounded z-50 flex flex-col">
          <span>School1 Details School1 Details School1 Details</span>
          <span>School1 Details School1 Details School1 Details</span>
          <span>School1 Details School1 Details School1 Details</span>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
